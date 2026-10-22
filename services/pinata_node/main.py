import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import pinning, data, keys
from config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("pinbunker.api")

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Crypto-native sovereign IPFS pinning engine. 100% drop-in Pinata Cloud SDK replacement."
)

# Enable permissive CORS for decentralized dApps, gateways, and frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Drop-In Pinata Routers
app.include_router(pinning.router)
app.include_router(data.router)
app.include_router(keys.router)

@app.get("/")
async def root():
    return {
        "service": "PinBunker Sovereign IPFS Gateway & Pinata Drop-In Node",
        "status": "operational",
        "node": "porkchop.sovereign.vps",
        "version": settings.VERSION,
        "docs": "/docs",
        "drop_in_endpoints": [
            "POST /pinning/pinFileToIPFS",
            "POST /pinning/pinJSONToIPFS",
            "DELETE /pinning/unpin/{hash}",
            "GET /data/testAuthentication",
            "GET /data/pinList",
            "GET /data/userPinnedDataTotal",
            "POST /api/v1/keys/generate"
        ]
    }

@app.get("/healthz")
async def healthz():
    return {"status": "ok", "timestamp": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)
