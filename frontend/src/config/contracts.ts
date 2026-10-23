// PinBunker NFT Creator Smart Contract Config
export const PINBUNKER_NFT_ABI = [
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "string", name: "tokenURI", type: "string" }
    ],
    name: "mintNFT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "mintFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "string", name: "tokenURI", type: "string" }
    ],
    name: "NFTMinted",
    type: "event"
  }
] as const;

export const CONTRACT_ADDRESSES = {
  // Polygon Mainnet deployment address
  polygon: "0x89D6169c2EcDb6d900481F4e4B517042a2A08c58",
  // Base Mainnet deployment address
  base: "0x3A2E8913919e952F4625b290cb962eaFfc91a13e",
} as const;

// Default mint fee (e.g. ~$2 equivalent in native gas tokens or symbolic fee)
export const MINT_FEE_POL = "1.5"; // 1.5 POL (~$0.50 - $1.00)
export const MINT_FEE_BASE = "0.0005"; // 0.0005 ETH (~$1.20)
