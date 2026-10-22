import pytest
from fastapi.testclient import TestClient
from main import app
from config import settings

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "operational"
    assert "drop_in_endpoints" in data

def test_test_authentication_unauthorized():
    # Calling testAuthentication without proper headers should fail with 401
    response = client.get("/data/testAuthentication")
    assert response.status_code == 401

def test_test_authentication_with_master_key():
    headers = {
        "pinata_api_key": settings.ADMIN_API_KEY,
        "pinata_secret_api_key": settings.ADMIN_API_SECRET
    }
    response = client.get("/data/testAuthentication", headers=headers)
    assert response.status_code == 200
    assert "Congratulations!" in response.json()["message"]

def test_pin_json_to_ipfs():
    headers = {
        "pinata_api_key": settings.ADMIN_API_KEY,
        "pinata_secret_api_key": settings.ADMIN_API_SECRET
    }
    payload = {
        "pinataContent": {
            "name": "Bunker Pass #1",
            "description": "Sovereign IPFS pass on porkchop",
            "image": "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"
        },
        "pinataMetadata": {
            "name": "bunker-pass-1.json"
        }
    }
    response = client.post("/pinning/pinJSONToIPFS", json=payload, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "IpfsHash" in data
    assert "PinSize" in data
    assert "Timestamp" in data

def test_pin_list():
    headers = {
        "pinata_api_key": settings.ADMIN_API_KEY,
        "pinata_secret_api_key": settings.ADMIN_API_SECRET
    }
    response = client.get("/data/pinList", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "count" in data
    assert "rows" in data

def test_generate_key():
    payload = {
        "wallet_address": "0x5A8E8913919e952f4625b290cb962eaFfc91a13e",
        "tier": "builder"
    }
    response = client.post("/api/v1/keys/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["pinata_api_key"].startswith("pb_live_")
    assert data["pinata_secret_api_key"].startswith("pb_sec_")
    assert "JWT" in data
