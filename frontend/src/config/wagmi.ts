import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygon, base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'PinBunker IPFS Sovereign Pinning',
  projectId: '21f4798365287f3299dfa80e159040cb', // Public WalletConnect project ID
  chains: [polygon, base],
  ssr: false,
});
