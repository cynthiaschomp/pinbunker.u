import secrets
import uuid
import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from eth_account.messages import encode_defunct
from eth_account import Account

from database import get_db
from models import ApiKey, Subscription
from auth import create_access_token

router = APIRouter(prefix="/api/v1/keys", tags=["Keys"])

class GenerateKeyRequest(BaseModel):
    wallet_address: str
    tier: str = "builder" # builder, pro, lifetime
    signature: str = ""
    message: str = ""

class GenerateKeyResponse(BaseModel):
    key_id: str
    pinata_api_key: str
    pinata_secret_api_key: str
    JWT: str
    tier: str
    wallet_address: str
    created_at: str

@router.post("/generate", response_model=GenerateKeyResponse)
async def generate_api_key(
    payload: GenerateKeyRequest,
    db: Session = Depends(get_db)
):
    """
    Issues sovereign PinBunker API keys and JWT token.
    Validates wallet signature if provided, or allows initial onboarding.
    """
    wallet = payload.wallet_address.strip().lower()
    
    # Verify cryptographic signature if provided
    if payload.signature and payload.message:
        try:
            signable_msg = encode_defunct(text=payload.message)
            recovered_addr = Account.recover_message(signable_msg, signature=payload.signature)
            if recovered_addr.lower() != wallet:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Cryptographic signature verification failed for wallet address"
                )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Signature verification error: {str(e)}"
            )

    key_id = f"pb_key_{secrets.token_hex(8)}"
    api_key = f"pb_live_{secrets.token_hex(16)}"
    api_secret = f"pb_sec_{secrets.token_hex(32)}"
    
    jwt_token = create_access_token(wallet=wallet, tier=payload.tier, key_id=key_id)
    
    new_key = ApiKey(
        key_id=key_id,
        api_key=api_key,
        api_secret=api_secret,
        jwt_token=jwt_token,
        user_wallet=wallet,
        tier=payload.tier,
        is_active=True
    )
    
    db.add(new_key)
    db.commit()
    
    now_str = datetime.datetime.utcnow().isoformat() + "Z"
    
    return GenerateKeyResponse(
        key_id=key_id,
        pinata_api_key=api_key,
        pinata_secret_api_key=api_secret,
        JWT=jwt_token,
        tier=payload.tier,
        wallet_address=wallet,
        created_at=now_str
    )

@router.get("/list")
async def list_keys(wallet_address: str, db: Session = Depends(get_db)):
    keys = db.query(ApiKey).filter(
        ApiKey.user_wallet == wallet_address.lower(),
        ApiKey.is_active == True
    ).all()
    
    return [
        {
            "key_id": k.key_id,
            "api_key": k.api_key,
            "tier": k.tier,
            "created_at": k.created_at.isoformat() if k.created_at else None
        }
        for k in keys
    ]
