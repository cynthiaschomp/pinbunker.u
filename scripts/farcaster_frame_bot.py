#!/usr/bin/env python3
"""
scripts/farcaster_frame_bot.py
Autonomous social distribution bot utilizing the Neynar API.
Publishes technical breakdowns of PinBunker vs Pinata with interactive Farcaster Frames.
"""

import os
import sys
import logging
import requests
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [Farcaster-Bot] %(message)s"
)
logger = logging.getLogger("farcaster_bot")

NEYNAR_API_KEY = os.getenv("NEYNAR_API_KEY", "NEYNAR_API_DOCS_KEY")
FARCASTER_SIGNER_UUID = os.getenv("FARCASTER_SIGNER_UUID", "mock-signer-uuid")
PINBUNKER_GATEWAY = os.getenv("PINBUNKER_GATEWAY", "https://pinbunker.u.limo")

POSTS = [
    {
        "text": (
            "Why we killed centralized IPFS:\n\n"
            "❌ Pinata: Mandatory Stripe KYC, credit card declines, $20/mo entry fee, HTML blocks (ERR_ID:00023).\n\n"
            "🛡️ PinBunker: 100% crypto-native, $9/mo USDC on Polygon/Base, zero KYC, full decentralized app/game rendering, and direct drop-in Pinata SDK compatibility.\n\n"
            "Self-hosted on porkchop VPS. Test pinning right from the frame 👇"
        ),
        "embeds": [
            {"url": f"{PINBUNKER_GATEWAY}/frame/builder-pass"}
        ]
    },
    {
        "text": (
            "Web3 dev PSA: You don't need to dox your identity to pin NFT metadata or dApp frontends.\n\n"
            "Switching your @pinata/sdk to PinBunker takes 1 line:\n"
            "baseURL: 'https://api.pinbunker.u.limo'\n\n"
            "1-click USDC subscription with Unlock Protocol on @base and @polygon."
        ),
        "embeds": [
            {"url": f"{PINBUNKER_GATEWAY}/frame/drop-in"}
        ]
    }
]

class FarcasterFrameBot:
    def __init__(self, api_key: str = NEYNAR_API_KEY, signer_uuid: str = FARCASTER_SIGNER_UUID):
        self.api_key = api_key
        self.signer_uuid = signer_uuid
        self.base_url = "https://api.neynar.com/v2/farcaster"

    def publish_cast(self, text: str, embeds: list = None):
        if self.signer_uuid == "mock-signer-uuid" or not self.api_key:
            logger.info("[SIMULATION MODE] Would publish Farcaster Cast:")
            logger.info(f"Text:\n{text}")
            logger.info(f"Embeds: {embeds}")
            return {"hash": "0xMockCastHash1234567890abcdef", "status": "simulated"}

        url = f"{self.base_url}/cast"
        headers = {
            "api_key": self.api_key,
            "Content-Type": "application/json"
        }
        payload = {
            "signer_uuid": self.signer_uuid,
            "text": text,
            "embeds": embeds or []
        }

        try:
            resp = requests.post(url, json=payload, headers=headers, timeout=15)
            if resp.status_code in (200, 201):
                data = resp.json()
                logger.info(f"Successfully published cast! Hash: {data.get('cast', {}).get('hash')}")
                return data
            else:
                logger.error(f"Failed to publish cast: {resp.status_code} - {resp.text}")
                return None
        except Exception as e:
            logger.error(f"Exception publishing to Farcaster: {e}")
            return None

    def post_scheduled_threads(self):
        logger.info(f"Running PinBunker Farcaster broadcast queue ({len(POSTS)} items)...")
        for post in POSTS:
            self.publish_cast(post["text"], post["embeds"])

if __name__ == "__main__":
    bot = FarcasterFrameBot()
    bot.post_scheduled_threads()
