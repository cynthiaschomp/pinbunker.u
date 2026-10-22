export const PINBUNKER_API_URL = import.meta.env.VITE_PINBUNKER_API || 'http://localhost:5050';
export const PINBUNKER_GATEWAY = 'https://pinbunker.u.limo/ipfs';

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

export function formatCid(cid: string): string {
  if (!cid) return '';
  if (cid.length <= 16) return cid;
  return `${cid.substring(0, 10)}...${cid.substring(cid.length - 8)}`;
}

export function getGatewayUrl(cid: string): string {
  return `${PINBUNKER_GATEWAY}/${cid}`;
}

export function getPublicGatewayUrl(cid: string): string {
  return `https://ipfs.io/ipfs/${cid}`;
}
