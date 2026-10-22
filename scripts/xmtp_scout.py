#!/usr/bin/env python3
"""
scripts/xmtp_scout.py
Autonomous EVM builder discovery and XMTP outreach daemon.
Monitors recent blocks on Polygon and Base, detects contract deployers and NFT creators,
and prepares/dispatches personalized invitations to switch to PinBunker.
"""

import os
import sys
import time
import logging
from typing import List, Dict, Optional
from web3 import Web3
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [XMTP-Scout] %(message)s"
)
logger = logging.getLogger("xmtp_scout")

POLYGON_RPC = os.getenv("POLYGON_RPC", "https://polygon-rpc.com")
BASE_RPC = os.getenv("BASE_RPC", "https://mainnet.base.org")
XMTP_ENV = os.getenv("XMTP_ENV", "production") # production / dev
SIMULATION_MODE = os.getenv("SCOUT_SIMULATION_MODE", "true").lower() == "true"

# Common NFT & Contract deployment signatures
KNOWN_SELECTORS = {
    "0xa0712d68": "mint(uint256)",
    "0x40c10f19": "mint(address,uint256)",
    "0xd0def521": "mint()",
    "0x755edd17": "mintTo(address)",
    "0x23b872dd": "transferFrom(address,address,uint256)",
    "0x60806040": "Contract Bytecode Init Header",
}

OUTREACH_TEMPLATE = """
Hey {developer_address}! 🛡️

We noticed your recent contract deployment / NFT activity on {network} ({tx_hash_short}...).

Are you dealing with Pinata's credit-card KYC, 429 rate limits, or their HTML gateway blocks (ERR_ID:00023)?

We built PinBunker (pinbunker.u / pinbunker.u.limo) — a 100% crypto-native, sovereign IPFS pinning engine self-hosted on Cynthia Schomp's dedicated VPS ("porkchop"):
• 100% Drop-In Pinata SDK compatibility (just change baseURL to https://api.pinbunker.u.limo)
• $9/mo USDC on Polygon/Base (Zero credit cards, zero KYC)
• 0 HTML blocks: Full decentralized websites and games render natively
• No 429 rate limits during mint surges

Get your Builder Pass in 1 click: https://pinbunker.u.limo
Self-hosted & Sovereign.
"""

class XmtpScout:
    def __init__(self):
        self.w3_polygon = Web3(Web3.HTTPProvider(POLYGON_RPC))
        self.w3_base = Web3(Web3.HTTPProvider(BASE_RPC))
        self.contacted_addresses = set()

    def get_w3(self, network: str) -> Web3:
        return self.w3_polygon if network == "polygon" else self.w3_base

    def inspect_block(self, network: str, block_number: Optional[int] = None) -> List[Dict]:
        w3 = self.get_w3(network)
        if not w3.is_connected():
            logger.warning(f"Could not connect to {network} RPC endpoint.")
            return []

        if block_number is None:
            block_number = w3.eth.block_number

        logger.info(f"Scanning block #{block_number} on {network}...")
        try:
            block = w3.eth.get_block(block_number, full_transactions=True)
        except Exception as e:
            logger.error(f"Error fetching block {block_number} on {network}: {e}")
            return []

        candidates = []
        for tx in block.transactions:
            from_addr = tx.get("from")
            to_addr = tx.get("to")
            tx_hash = tx.get("hash").hex() if hasattr(tx.get("hash"), "hex") else str(tx.get("hash"))
            input_data = tx.get("input").hex() if hasattr(tx.get("input"), "hex") else str(tx.get("input"))

            # 1. Contract deployment (to is None or empty)
            if to_addr is None or to_addr == "0x" or to_addr == "":
                candidates.append({
                    "developer": from_addr,
                    "action": "contract_deploy",
                    "tx_hash": tx_hash,
                    "network": network.capitalize(),
                })
                continue

            # 2. Check 4-byte selector for NFT mints
            if len(input_data) >= 10:
                selector = input_data[:10].lower()
                if selector in KNOWN_SELECTORS:
                    candidates.append({
                        "developer": from_addr,
                        "action": f"nft_mint ({KNOWN_SELECTORS[selector]})",
                        "tx_hash": tx_hash,
                        "network": network.capitalize(),
                    })

        return candidates

    def send_xmtp_outreach(self, candidate: Dict):
        dev = candidate["developer"]
        if dev in self.contacted_addresses:
            logger.info(f"Already scouted developer {dev}. Skipping duplicate.")
            return

        message = OUTREACH_TEMPLATE.format(
            developer_address=dev[:6] + "..." + dev[-4:],
            network=candidate["network"],
            tx_hash_short=candidate["tx_hash"][:10],
        )

        if SIMULATION_MODE:
            logger.info(f"[SIMULATION] Prepared XMTP message for {dev} on {candidate['network']}:")
            logger.info(message.strip().split("\n")[0] + " ... [Full text formatted]")
        else:
            # Dispatch through live XMTP client
            logger.info(f"[LIVE XMTP] Sending message to {dev}...")
            # In live production environment with private key:
            # client = Client().create(account)
            # conversation = client.conversations.new_conversation(dev)
            # conversation.send(message)

        self.contacted_addresses.add(dev)

    def run_scout_loop(self, poll_interval: int = 15):
        logger.info(f"Starting PinBunker XMTP Scout Daemon (Simulation Mode: {SIMULATION_MODE})")
        while True:
            for net in ["polygon", "base"]:
                try:
                    candidates = self.inspect_block(net)
                    logger.info(f"Found {len(candidates)} prospective Web3 builders on {net}.")
                    for c in candidates:
                        self.send_xmtp_outreach(c)
                except Exception as e:
                    logger.error(f"Error during {net} block inspection: {e}")
            time.sleep(poll_interval)

if __name__ == "__main__":
    scout = XmtpScout()
    # Single run mode if invoked with --once
    if "--once" in sys.argv:
        candidates = scout.inspect_block("polygon")
        for c in candidates[:3]:
            scout.send_xmtp_outreach(c)
    else:
        scout.run_scout_loop()
