import json
import datetime
from typing import Optional
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import get_db
from models import PinRecord
from ipfs_client import kubo_client
from auth import verify_pinata_auth

router = APIRouter(prefix="/pinning", tags=["Pinning"])

class PinResponse(BaseModel):
    IpfsHash: str
    PinSize: int
    Timestamp: str
    isDuplicate: Optional[bool] = False

class PinJsonPayload(BaseModel):
    pinataContent: Optional[dict] = None
    pinataMetadata: Optional[dict] = None
    pinataOptions: Optional[dict] = None

@router.post("/pinFileToIPFS", response_model=PinResponse)
async def pin_file_to_ipfs(
    file: UploadFile = File(...),
    pinataMetadata: Optional[str] = Form(None),
    pinataOptions: Optional[str] = Form(None),
    auth: dict = Depends(verify_pinata_auth),
    db: Session = Depends(get_db)
):
    """
    Exact drop-in replacement for Pinata POST /pinning/pinFileToIPFS
    Uploads file/directory to Cynthia's porkchop Kubo node and records CID.
    """
    content = await file.read()
    filename = file.filename or "file.bin"
    
    # Parse pinataMetadata if provided
    metadata = {}
    if pinataMetadata:
        try:
            metadata = json.loads(pinataMetadata)
        except Exception:
            metadata = {"name": pinataMetadata}
            
    custom_name = metadata.get("name") or filename

    # Upload & Pin to Kubo node
    ipfs_result = await kubo_client.add_bytes(content, filename=filename, pin=True)
    cid = ipfs_result["Hash"]
    size = ipfs_result["Size"]
    
    # Check if duplicate in database
    existing = db.query(PinRecord).filter(PinRecord.ipfs_pin_hash == cid).first()
    is_duplicate = False
    
    now_iso = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.000Z")
    
    if existing:
        is_duplicate = True
        existing.status = "pinned"
        db.commit()
    else:
        new_pin = PinRecord(
            ipfs_pin_hash=cid,
            name=custom_name,
            size=size,
            user_wallet=auth.get("user_wallet", "0xPublicUser"),
            status="pinned",
            metadata_json=json.dumps(metadata)
        )
        db.add(new_pin)
        db.commit()

    return PinResponse(
        IpfsHash=cid,
        PinSize=size,
        Timestamp=now_iso,
        isDuplicate=is_duplicate
    )

@router.post("/pinJSONToIPFS", response_model=PinResponse)
async def pin_json_to_ipfs(
    payload: dict,
    auth: dict = Depends(verify_pinata_auth),
    db: Session = Depends(get_db)
):
    """
    Exact drop-in replacement for Pinata POST /pinning/pinJSONToIPFS
    Pins NFT metadata or arbitrary JSON directly to Kubo.
    """
    # Pinata payload can have { "pinataContent": {...}, "pinataMetadata": {...} }
    # Or raw dictionary
    if "pinataContent" in payload:
        content_to_pin = payload["pinataContent"]
        metadata = payload.get("pinataMetadata", {})
    else:
        content_to_pin = payload
        metadata = {}

    name = metadata.get("name", "metadata.json")
    
    ipfs_result = await kubo_client.add_json(content_to_pin, pin=True)
    cid = ipfs_result["Hash"]
    size = ipfs_result["Size"]
    
    existing = db.query(PinRecord).filter(PinRecord.ipfs_pin_hash == cid).first()
    is_duplicate = False
    now_iso = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.000Z")
    
    if existing:
        is_duplicate = True
        existing.status = "pinned"
        db.commit()
    else:
        new_pin = PinRecord(
            ipfs_pin_hash=cid,
            name=name,
            size=size,
            user_wallet=auth.get("user_wallet", "0xPublicUser"),
            status="pinned",
            metadata_json=json.dumps(metadata)
        )
        db.add(new_pin)
        db.commit()

    return PinResponse(
        IpfsHash=cid,
        PinSize=size,
        Timestamp=now_iso,
        isDuplicate=is_duplicate
    )

@router.delete("/unpin/{hash}")
async def unpin(
    hash: str,
    auth: dict = Depends(verify_pinata_auth),
    db: Session = Depends(get_db)
):
    """
    Exact drop-in replacement for Pinata DELETE /pinning/unpin/{hash}
    """
    record = db.query(PinRecord).filter(PinRecord.ipfs_pin_hash == hash).first()
    if not record:
        # Still attempt to unpin from Kubo daemon
        await kubo_client.pin_rm(hash)
        return PlainTextResponse("OK", status_code=200)

    # Remove pin from Kubo node
    await kubo_client.pin_rm(hash)
    record.status = "unpinned"
    record.date_unpinned = datetime.datetime.utcnow()
    db.commit()
    
    return PlainTextResponse("OK", status_code=200)
