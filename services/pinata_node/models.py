import datetime
from sqlalchemy import Column, String, Integer, DateTime, Boolean, Text, BigInteger
from database import Base

class ApiKey(Base):
    __tablename__ = "api_keys"

    id = Column(Integer, primary_key=True, index=True)
    key_id = Column(String(64), unique=True, index=True)
    api_key = Column(String(128), unique=True, index=True)
    api_secret = Column(String(256))
    jwt_token = Column(Text, nullable=True)
    user_wallet = Column(String(42), index=True)
    tier = Column(String(32), default="builder") # builder, pro, lifetime
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class PinRecord(Base):
    __tablename__ = "pin_records"

    id = Column(Integer, primary_key=True, index=True)
    ipfs_pin_hash = Column(String(128), unique=True, index=True, nullable=False)
    name = Column(String(255), default="")
    size = Column(BigInteger, default=0)
    user_wallet = Column(String(42), index=True, nullable=True)
    status = Column(String(32), default="pinned") # pinned, unpinned, failed
    metadata_json = Column(Text, default="{}") # stores pinataMetadata JSON string
    date_pinned = Column(DateTime, default=datetime.datetime.utcnow)
    date_unpinned = Column(DateTime, nullable=True)

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    wallet_address = Column(String(42), unique=True, index=True)
    tier = Column(String(32)) # builder, pro, lifetime
    expiration_timestamp = Column(BigInteger, default=0)
    tx_hash = Column(String(66), nullable=True)
    network = Column(String(32), default="polygon") # polygon, base
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class InviteCode(Base):
    __tablename__ = "invite_codes"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(64), unique=True, index=True)
    tier = Column(String(32), default="lifetime")
    is_claimed = Column(Boolean, default=False)
    claimed_by_wallet = Column(String(42), nullable=True)
    claimed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
