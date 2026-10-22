import json
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from database import get_db
from models import PinRecord
from auth import require_auth, verify_pinata_auth
from ipfs_client import kubo_client

router = APIRouter(prefix="/data", tags=["Data"])

@router.get("/testAuthentication")
async def test_authentication(auth: dict = Depends(require_auth)):
    """
    Exact drop-in replacement for Pinata GET /data/testAuthentication
    Used by @pinata/sdk pinata.testAuthentication() and pinatapy.
    """
    return {
        "message": "Congratulations! You are communicating with the PinBunker IPFS API!"
    }

@router.get("/pinList")
async def pin_list(
    status: Optional[str] = Query("pinned"),
    name: Optional[str] = Query(None),
    pageLimit: Optional[int] = Query(10, alias="pageLimit"),
    pageOffset: Optional[int] = Query(0, alias="pageOffset"),
    auth: dict = Depends(verify_pinata_auth),
    db: Session = Depends(get_db)
):
    """
    Exact drop-in replacement for Pinata GET /data/pinList
    """
    query = db.query(PinRecord)
    
    if status and status != "all":
        query = query.filter(PinRecord.status == status)
        
    if name:
        query = query.filter(PinRecord.name.ilike(f"%{name}%"))
        
    total_count = query.count()
    records = query.order_by(PinRecord.date_pinned.desc()).offset(pageOffset).limit(pageLimit).all()
    
    rows = []
    for r in records:
        try:
            meta = json.loads(r.metadata_json) if r.metadata_json else {}
        except Exception:
            meta = {}
            
        rows.append({
            "id": str(r.id),
            "ipfs_pin_hash": r.ipfs_pin_hash,
            "size": r.size,
            "user_id": r.user_wallet or "sovereign-user",
            "date_pinned": r.date_pinned.strftime("%Y-%m-%dT%H:%M:%S.000Z") if r.date_pinned else None,
            "date_unpinned": r.date_unpinned.strftime("%Y-%m-%dT%H:%M:%S.000Z") if r.date_unpinned else None,
            "metadata": meta,
            "regions": [
                {
                    "regionId": "FRA1",
                    "currentReplicationCount": 1,
                    "desiredReplicationCount": 1
                }
            ]
        })
        
    return {
        "count": total_count,
        "rows": rows
    }

@router.get("/userPinnedDataTotal")
async def user_pinned_data_total(
    auth: dict = Depends(verify_pinata_auth),
    db: Session = Depends(get_db)
):
    """
    Exact drop-in replacement for Pinata GET /data/userPinnedDataTotal
    """
    records = db.query(PinRecord).filter(PinRecord.status == "pinned").all()
    total_count = len(records)
    total_bytes = sum(r.size for r in records)
    
    return {
        "pin_count": total_count,
        "pin_size_total": total_bytes,
        "pin_size_with_replications_total": total_bytes * 2
    }

@router.get("/nodeStatus")
async def node_status():
    """
    Real-time sovereign status of Cynthia's porkchop Kubo IPFS node.
    Used by frontend status counters.
    """
    status = await kubo_client.get_node_status()
    return status
