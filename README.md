# 🛡️ PinBunker (`pinbunker.u` / `pinbunker.com`)

> **A crypto-native, sovereign IPFS pinning engine and high-speed gateway engineered as a direct drop-in replacement for Pinata Cloud.**  
> Self-hosted on Cynthia Schomp's dedicated VPS (**"porkchop"**).

---

## ⚡ The Problems We Solve vs Pinata Cloud

| Feature / Issue | Pinata Cloud (Centralized SaaS) | PinBunker (Sovereign Web3) |
| :--- | :--- | :--- |
| **Identity & Billing** | ❌ Mandatory Credit Cards & Stripe KYC (doxxing, frequent international declines) | ✅ **100% Crypto-Native**: 1-click checkout with USDC/POL on Polygon & Base via Unlock Protocol. |
| **HTML / dApp Rendering** | ❌ **Infamous Gateway HTML Block (`ERR_ID:00023`)** blocks decentralized frontends & canvas games | ✅ **Zero Restrictions**: Decentralized HTML/JS websites, Web3 games, and canvas dApps render natively. |
| **Rate Limiting** | ❌ Frequent `429 Too Many Requests` during peak NFT mint spikes | ✅ **Sovereign Throughput**: Directly peered with the global IPFS DHT; no artificial SaaS throttles. |
| **Pricing** | ❌ Expensive **$20/mo** ($240/yr) entry toll after killing the free tier | ✅ Accessible **$9/mo USDC Builder Pass** or **$99 Lifetime Founder Pass**. |
| **SDK Compatibility** | ❌ Proprietary vendor lock-in | ✅ **100% Drop-In Parity**: Keep `@pinata/sdk` or `pinatapy` by only changing the `baseURL`. |

---

## 🏛️ System Architecture

```
pinbunker.u/
├── docker-compose.yml          # Multi-container orchestration (Kubo, API, Daemons)
├── .env.example                # RPCs, Treasury Wallet, Unlock Contracts
├── frontend/                   # React + Vite (base: './') + Tailwind + RainbowKit
│   ├── vite.config.ts          # Strict relative asset resolution for .limo gateway
│   └── src/
│       ├── components/         # Live uploader, comparison table, pricing, SDK modal
│       ├── config/             # Wagmi (Polygon + Base) & Unlock Protocol tiers
│       └── utils/              # IPFS CID and gateway formatting
├── services/
│   └── pinata_node/            # FastAPI drop-in Pinata microservice
│       ├── main.py             # App entrypoint with CORS
│       ├── ipfs_client.py      # Kubo RPC client (/api/v0)
│       ├── auth.py             # Pinata headers + JWT + Web3 signature auth
│       ├── models.py           # ApiKey, PinRecord, Subscription database models
│       └── routers/            # /pinning/*, /data/*, /api/v1/keys/*
└── scripts/
    ├── sovereign_pin.py        # Automated build & pin of frontend/dist to porkchop
    ├── unstoppable_manager.py  # Unstoppable Domains MCP automation utility
    ├── xmtp_scout.py           # Autonomous EVM block listener & builder outreach
    ├── farcaster_frame_bot.py  # Neynar API broadcast with interactive frames
    └── aave_yield_sweeper.py   # Sweeps USDC revenue into Aave V3 lending pools
```

---

## 🚀 30-Second Drop-In Pinata Migration

### Node.js (`@pinata/sdk`)
```javascript
const pinataSDK = require('@pinata/sdk');

// Simply swap your credentials & point to PinBunker:
const pinata = new pinataSDK({
  pinataApiKey: 'YOUR_PINBUNKER_API_KEY',
  pinataSecretApiKey: 'YOUR_PINBUNKER_SECRET_KEY',
  pinataApiUrl: 'https://api.pinbunker.u.limo' // Direct drop-in endpoint
});

// Everything works out-of-the-box:
const auth = await pinata.testAuthentication();
const pin = await pinata.pinJSONToIPFS({ name: "NFT Metadata" });
```

### Python (`pinatapy`)
```python
from pinatapy import PinataPy

pinata = PinataPy(
    pinata_api_key="YOUR_PINBUNKER_API_KEY",
    pinata_secret_api_key="YOUR_PINBUNKER_SECRET_KEY",
    api_url="https://api.pinbunker.u.limo"
)

res = pinata.pin_file_to_ipfs("metadata.json")
print("Pinned CID:", res["IpfsHash"])
```

### cURL
```bash
# Pin file to IPFS
curl -X POST "https://api.pinbunker.u.limo/pinning/pinFileToIPFS" \
  -H "pinata_api_key: YOUR_KEY" \
  -H "pinata_secret_api_key: YOUR_SECRET" \
  -F "file=@./image.png"
```

---

## 🌐 Unstoppable Domains Setup Guide (`pinbunker.u`)

To link the decentralized frontend to your Unstoppable Domain:

1. **Build and pin frontend to porkchop VPS**:
   ```bash
   python3 scripts/sovereign_pin.py
   ```
   This will output the root Directory CID (e.g., `bafybeig...`).

2. **Configure Unstoppable Domains**:
   - Log into [Unstoppable Domains](https://unstoppabledomains.com/) (or manage via Polygon contract).
   - Navigate to **Domains** -> Select **`pinbunker.u`**.
   - Go to **Manage Website** -> **Link IPFS Website**.
   - Enter your CID: `bafybeig...` and click **Confirm Changes** (sign on Polygon).

3. **Global Resolution**:
   - Resolves instantly across all browsers via [pinbunker.u.limo](https://pinbunker.u.limo)
   - Resolves natively in Brave, Opera, and IPFS companion extensions via `ipfs://pinbunker.u`

---

## 🐳 Production VPS Deployment ("porkchop")

1. **Clone repository and configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your RPC keys and treasury wallet
   ```

2. **Launch full sovereign stack**:
   ```bash
   docker compose up -d --build
   ```

3. **Check container health**:
   ```bash
   docker compose ps
   curl http://localhost:5050/healthz
   ```

4. **Verify IPFS Swarm connectivity**:
   ```bash
   curl -X POST http://127.0.0.1:5001/api/v0/swarm/peers
   ```

---

## 🤖 Autonomous Daemons

- **XMTP Scout (`scripts/xmtp_scout.py`)**:
  Scans live Polygon and Base blocks, decodes contract creation bytecodes and NFT mint transactions, and dispatches personalized, respectful XMTP invitations to switch to PinBunker.
  ```bash
  python3 scripts/xmtp_scout.py --once
  ```

- **Aave Yield Sweeper (`scripts/aave_yield_sweeper.py`)**:
  Automatically sweeps accumulated USDC subscription revenue from the treasury into Aave V3 lending pools to generate continuous yield.
  ```bash
  python3 scripts/aave_yield_sweeper.py
  ```

- **Farcaster Frame Bot (`scripts/farcaster_frame_bot.py`)**:
  Publishes technical breakdowns and interactive Farcaster Frames pointing to `pinbunker.u.limo` via the Neynar API.
  ```bash
  python3 scripts/farcaster_frame_bot.py
  ```

---

## 📜 Subscription Tiers (Unlock Protocol)

1. **Builder Pass ($9/mo USDC)**: 15 GB Pinned Storage, 100 GB Bandwidth, Unlimited Drop-In Pinata API Keys.
2. **Pro Fleet ($29/mo USDC)**: 75 GB Storage, 500 GB Bandwidth, Dedicated Subdomain Gateway (`yourname.pinbunker.u.limo`), No 429 limits.
3. **Lifetime Founder Bunker ($99 USDC One-Time)**: 150 GB Lifetime Pinning, Direct P2P Peering with porkchop Kubo node, Priority XMTP channel with Cynthia Schomp.
