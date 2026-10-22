import time
import jwt
from fastapi import Header, HTTPException, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from models import ApiKey
from config import settings

def verify_pinata_auth(
    pinata_api_key: str = Header(None, alias="pinata_api_key"),
    pinata_secret_api_key: str = Header(None, alias="pinata_secret_api_key"),
    authorization: str = Header(None, alias="Authorization"),
    db: Session = Depends(get_db)
) -> dict:
    """
    Drop-in authentication compatible with Pinata SDKs:
    1. Header pinata_api_key & pinata_secret_api_key
    2. Header Authorization: Bearer <JWT>
    """
    # 1. Check Master Admin dev credentials
    if pinata_api_key == settings.ADMIN_API_KEY and pinata_secret_api_key == settings.ADMIN_API_SECRET:
        return {
            "authenticated": True,
            "user_wallet": "0x5A8E8913919e952f4625b290cb962eaFfc91a13e", # Sovereign admin
            "tier": "lifetime",
            "key_id": "master-porkchop-admin"
        }

    # 2. Check Database API Key pair
    if pinata_api_key and pinata_secret_api_key:
        key_record = db.query(ApiKey).filter(
            ApiKey.api_key == pinata_api_key,
            ApiKey.api_secret == pinata_secret_api_key,
            ApiKey.is_active == True
        ).first()
        if key_record:
            return {
                "authenticated": True,
                "user_wallet": key_record.user_wallet,
                "tier": key_record.tier,
                "key_id": key_record.key_id
            }

    # 3. Check JWT Bearer token
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        try:
            payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
            return {
                "authenticated": True,
                "user_wallet": payload.get("wallet", "0xAnonymousBuilder"),
                "tier": payload.get("tier", "builder"),
                "key_id": payload.get("key_id", "jwt-user")
            }
        except jwt.PyJWTError:
            pass

    # Allow anonymous demo pinning in local/public trial mode with capped size
    # But raise 401 for authenticated endpoints if missing
    return {
        "authenticated": False,
        "user_wallet": "0xDemoTrialUser",
        "tier": "trial",
        "key_id": "trial-demo"
    }

def require_auth(auth_data: dict = Depends(verify_pinata_auth)) -> dict:
    if not auth_data.get("authenticated"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="UNAUTHORIZED: Invalid Pinata API Key / Secret or Bearer JWT Token"
        )
    return auth_data

def create_access_token(wallet: str, tier: str = "builder", key_id: str = "") -> str:
    payload = {
        "wallet": wallet,
        "tier": tier,
        "key_id": key_id,
        "exp": int(time.time()) + (86400 * 365) # 1 year
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
