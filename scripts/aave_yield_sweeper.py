#!/usr/bin/env python3
"""
scripts/aave_yield_sweeper.py
Autonomous capital efficiency and yield compounding daemon.
Inspects accumulated USDC subscription revenue on Polygon / Base,
checks minimum sweep threshold, and deposits into Aave V3 lending pool to earn passive APY.
"""

import os
import sys
import logging
from web3 import Web3
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [Aave-Sweeper] %(message)s"
)
logger = logging.getLogger("aave_sweeper")

POLYGON_RPC = os.getenv("POLYGON_RPC", "https://polygon-rpc.com")
BASE_RPC = os.getenv("BASE_RPC", "https://mainnet.base.org")
TREASURY_WALLET = os.getenv("TREASURY_WALLET", "0x5A8E8913919e952f4625b290cb962eaFfc91a13e")
PRIVATE_KEY = os.getenv("TREASURY_PRIVATE_KEY", "")
MIN_SWEEP_AMOUNT_USDC = float(os.getenv("MIN_SWEEP_AMOUNT_USDC", "50.0"))

# Addresses for Polygon & Base
CONTRACTS = {
    "polygon": {
        "usdc": "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", # Native USDC on Polygon
        "aave_pool": "0x794a61358D6845594F94dc1DB02A252b5b4814aD", # Aave V3 Polygon Pool
        "decimals": 6,
    },
    "base": {
        "usdc": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", # Native USDC on Base
        "aave_pool": "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5", # Aave V3 Base Pool
        "decimals": 6,
    }
}

# Minimal ERC20 ABI
ERC20_ABI = [
    {
        "constant": True,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function",
    },
    {
        "constant": False,
        "inputs": [
            {"name": "_spender", "type": "address"},
            {"name": "_value", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"name": "success", "type": "bool"}],
        "type": "function",
    }
]

# Minimal Aave V3 Pool ABI
AAVE_POOL_ABI = [
    {
        "inputs": [
            {"name": "asset", "type": "address"},
            {"name": "amount", "type": "uint256"},
            {"name": "onBehalfOf", "type": "address"},
            {"name": "referralCode", "type": "uint16"}
        ],
        "name": "supply",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

class AaveSweeper:
    def __init__(self, network: str = "polygon"):
        self.network = network
        rpc = POLYGON_RPC if network == "polygon" else BASE_RPC
        self.w3 = Web3(Web3.HTTPProvider(rpc))
        self.cfg = CONTRACTS[network]
        self.usdc = self.w3.eth.contract(address=Web3.to_checksum_address(self.cfg["usdc"]), abi=ERC20_ABI)
        self.pool = self.w3.eth.contract(address=Web3.to_checksum_address(self.cfg["aave_pool"]), abi=AAVE_POOL_ABI)

    def check_and_sweep(self):
        if not self.w3.is_connected():
            logger.warning(f"Could not connect to {self.network} RPC.")
            return

        treasury = Web3.to_checksum_address(TREASURY_WALLET)
        raw_balance = self.usdc.functions.balanceOf(treasury).call()
        decimals = self.cfg["decimals"]
        balance_usdc = raw_balance / (10 ** decimals)

        logger.info(f"[{self.network.upper()}] Treasury USDC Balance: {balance_usdc:.2f} USDC (Threshold: {MIN_SWEEP_AMOUNT_USDC} USDC)")

        if balance_usdc < MIN_SWEEP_AMOUNT_USDC:
            logger.info(f"Balance below sweep threshold of {MIN_SWEEP_AMOUNT_USDC} USDC. Holding for next batch.")
            return

        sweep_amount = raw_balance
        logger.info(f"Sweeping {balance_usdc:.2f} USDC into Aave V3 on {self.network}...")

        if not PRIVATE_KEY:
            logger.info(f"[SIMULATION] Simulated supply({balance_usdc:.2f} USDC, pool={self.cfg['aave_pool']}, onBehalfOf={treasury})")
            return

        account = self.w3.eth.account.from_key(PRIVATE_KEY)
        nonce = self.w3.eth.get_transaction_count(account.address)

        # 1. Approve Aave Pool
        approve_tx = self.usdc.functions.approve(
            Web3.to_checksum_address(self.cfg["aave_pool"]),
            sweep_amount
        ).build_transaction({
            "from": account.address,
            "nonce": nonce,
            "gas": 100000,
            "gasPrice": self.w3.eth.gas_price
        })
        signed_approve = self.w3.eth.account.sign_transaction(approve_tx, PRIVATE_KEY)
        tx_hash_approve = self.w3.eth.send_raw_transaction(signed_approve.rawTransaction)
        logger.info(f"Sent approval tx: {tx_hash_approve.hex()}")

        # 2. Deposit into Aave V3 Pool
        supply_tx = self.pool.functions.supply(
            Web3.to_checksum_address(self.cfg["usdc"]),
            sweep_amount,
            treasury,
            0
        ).build_transaction({
            "from": account.address,
            "nonce": nonce + 1,
            "gas": 250000,
            "gasPrice": self.w3.eth.gas_price
        })
        signed_supply = self.w3.eth.account.sign_transaction(supply_tx, PRIVATE_KEY)
        tx_hash_supply = self.w3.eth.send_raw_transaction(signed_supply.rawTransaction)
        logger.info(f"Successfully supplied to Aave V3! Tx: {tx_hash_supply.hex()}")

def run_all_sweeps():
    for net in ["polygon", "base"]:
        try:
            sweeper = AaveSweeper(network=net)
            sweeper.check_and_sweep()
        except Exception as e:
            logger.error(f"Error sweeping on {net}: {e}")

if __name__ == "__main__":
    run_all_sweeps()
