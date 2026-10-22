import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "PinBunker Pinata Drop-In API"
    VERSION: str = "1.0.0"
    HOST: str = "0.0.0.0"
    PORT: int = 5050
    
    # Kubo (Go-IPFS) daemon RPC endpoint
    KUBO_API_URL: str = os.getenv("KUBO_API_URL", "http://127.0.0.1:5001")
    KUBO_GATEWAY_URL: str = os.getenv("KUBO_GATEWAY_URL", "https://pinbunker.u.limo/ipfs")
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./pinbunker.db")
    
    # Security
    JWT_SECRET: str = os.getenv("PINBUNKER_JWT_SECRET", "sovereign_pinbunker_secret_key_change_in_production")
    JWT_ALGORITHM: str = "HS256"
    
    # Master Admin / Development bypass key
    ADMIN_API_KEY: str = os.getenv("ADMIN_API_KEY", "pb_master_key_bunker777")
    ADMIN_API_SECRET: str = os.getenv("ADMIN_API_SECRET", "pb_master_secret_porkchop999")
    
    # Unlock Protocol & Web3
    POLYGON_RPC: str = os.getenv("POLYGON_RPC", "https://polygon-rpc.com")
    BASE_RPC: str = os.getenv("BASE_RPC", "https://mainnet.base.org")
    TREASURY_WALLET: str = os.getenv("TREASURY_WALLET", "0x5A8E8913919e952f4625b290cb962eaFfc91a13e")

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
