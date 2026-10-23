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
    idealFor: 'For independent creators, artists, and individual NFT drops',
    price: '$9',
    period: '/ month in USDC',
    storage: '2 GB Dedicated Permanent Storage',
    bandwidth: '25 GB Accelerated Monthly Delivery',
    features: [
      'Universal Web3 SDK & API Compatibility',
      'Unlimited API Credentials & Access Tokens',
      'Fast Global Gateway Resolution for Art & Media',
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
    badge: 'Recommended for Creators',
    idealFor: 'For digital studios, generative NFT collections, and dApps',
    price: '$29',
    period: '/ month in USDC',
    storage: '10 GB Dedicated Permanent Storage',
    bandwidth: '100 GB Accelerated Global Bandwidth',
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
    idealFor: 'For long-term archives, permanent portfolios, and collectors',
    price: '$99',
    period: 'USDC One-Time',
    storage: '25 GB Lifetime Dedicated Storage',
    bandwidth: '250 GB Accelerated Monthly Bandwidth',
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
