export interface TierConfig {
  id: string;
  name: string;
  price: string;
  period: string;
  storage: string;
  bandwidth: string;
  features: string[];
  recommended?: boolean;
  lockAddressPolygon: string;
  lockAddressBase: string;
  unlockUrl: string;
}

export const TIERS: TierConfig[] = [
  {
    id: 'builder',
    name: 'Builder Pass',
    price: '$9',
    period: '/ month in USDC',
    storage: '15 GB Sovereign Pinned Storage',
    bandwidth: '100 GB High-Speed Bandwidth',
    features: [
      '100% Drop-In Pinata SDK Compatibility',
      'Unlimited API Keys & JWTs',
      '0 HTML Gateway Restrictions (ERR_ID:00023 fixed)',
      '1-Click USDC Checkout on Polygon & Base',
      'Continuous DHT Announcements from porkchop'
    ],
    recommended: false,
    lockAddressPolygon: '0x1A2B3C4D5E6F708192aBcDeF1234567890abcdef',
    lockAddressBase: '0x2B3C4D5E6F708192aBcDeF1234567890abcdef1A',
    unlockUrl: 'https://app.unlock-protocol.com/checkout?id=builder-pass-polygon'
  },
  {
    id: 'pro',
    name: 'Pro Fleet',
    price: '$29',
    period: '/ month in USDC',
    storage: '75 GB Sovereign Pinned Storage',
    bandwidth: '500 GB High-Speed Bandwidth',
    features: [
      'Everything in Builder Pass',
      'Dedicated Subdomain Gateway (yourname.pinbunker.u.limo)',
      'Zero 429 Rate Limits During High Mint Spikes',
      'Sub-150ms Global P2P Resolution',
      'Custom Content-Type and CORS Header Injector',
      'Priority WebSocket Swarm Peering'
    ],
    recommended: true,
    lockAddressPolygon: '0x3C4D5E6F708192aBcDeF1234567890abcdef1A2B',
    lockAddressBase: '0x4D5E6F708192aBcDeF1234567890abcdef1A2B3C',
    unlockUrl: 'https://app.unlock-protocol.com/checkout?id=pro-fleet-base'
  },
  {
    id: 'lifetime',
    name: 'Lifetime Founder Bunker',
    price: '$99',
    period: 'USDC One-Time',
    storage: '150 GB Lifetime Sovereign Pinning',
    bandwidth: '1 TB / Month Bandwidth',
    features: [
      'Zero Recurring Bills Forever',
      'Direct P2P Peering with porkchop Kubo node',
      'Founder On-Chain NFT Badge with Protocol Voting',
      'Priority Encrypted XMTP Channel with Cynthia Schomp',
      'Lifetime Access to Future Autonomous Agent Toolchains'
    ],
    recommended: false,
    lockAddressPolygon: '0x5E6F708192aBcDeF1234567890abcdef1A2B3C4D',
    lockAddressBase: '0x6F708192aBcDeF1234567890abcdef1A2B3C4D5E',
    unlockUrl: 'https://app.unlock-protocol.com/checkout?id=lifetime-founder-polygon'
  }
];
