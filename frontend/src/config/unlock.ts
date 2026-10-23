export interface TierConfig {
  id: string;
  name: string;
  badge?: string;
  idealFor: string;
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
    name: 'Builder Plan',
    idealFor: 'For independent creators, developers, and new NFT collections',
    price: '$9',
    period: '/ month in USDC',
    storage: '15 GB Dedicated Pinned Storage',
    bandwidth: '100 GB High-Throughput Bandwidth',
    features: [
      'Universal Web3 SDK & API Compatibility',
      'Unlimited API Credentials & Access Tokens',
      'Full Unrestricted Gateway Loading for Apps & Games',
      'Direct 1-Click Wallet Checkout on Polygon & Base',
      'Continuous Global Decentralized Persistence'
    ],
    recommended: false,
    lockAddressPolygon: '0x1A2B3C4D5E6F708192aBcDeF1234567890abcdef',
    lockAddressBase: '0x2B3C4D5E6F708192aBcDeF1234567890abcdef1A',
    unlockUrl: 'https://app.unlock-protocol.com/checkout?id=builder-pass-polygon'
  },
  {
    id: 'pro',
    name: 'Production Fleet',
    badge: 'Recommended for Production',
    idealFor: 'For high-volume NFT collections, production dApps, and studios',
    price: '$29',
    period: '/ month in USDC',
    storage: '75 GB High-Performance Storage',
    bandwidth: '500 GB Accelerated Global Bandwidth',
    features: [
      'Includes Everything in the Builder Plan',
      'Dedicated Custom Subdomain Gateway',
      'Optimized High-Volume Traffic Routing for Mints',
      'Fast Multi-Region Global Content Resolution',
      'Custom Content Headers & Gateway Controls',
      'Direct High-Priority Swarm Connections'
    ],
    recommended: true,
    lockAddressPolygon: '0x3C4D5E6F708192aBcDeF1234567890abcdef1A2B',
    lockAddressBase: '0x4D5E6F708192aBcDeF1234567890abcdef1A2B3C',
    unlockUrl: 'https://app.unlock-protocol.com/checkout?id=pro-fleet-base'
  },
  {
    id: 'lifetime',
    name: 'Lifetime Founder',
    badge: 'Permanent Storage',
    idealFor: 'For foundational protocols, permanent archives, and long-term collections',
    price: '$99',
    period: 'USDC One-Time',
    storage: '150 GB Lifetime Pinned Storage',
    bandwidth: '1 TB Accelerated Monthly Bandwidth',
    features: [
      'Permanent One-Time Access — Zero Recurring Invoices',
      'Direct Dedicated P2P Node Peering',
      'On-Chain Founder Recognition Badge',
      'Priority Protocol Support Channel',
      'Lifetime Access to Next-Gen Storage Features'
    ],
    recommended: false,
    lockAddressPolygon: '0x5E6F708192aBcDeF1234567890abcdef1A2B3C4D',
    lockAddressBase: '0x6F708192aBcDeF1234567890abcdef1A2B3C4D5E',
    unlockUrl: 'https://app.unlock-protocol.com/checkout?id=lifetime-founder-polygon'
  }
];
