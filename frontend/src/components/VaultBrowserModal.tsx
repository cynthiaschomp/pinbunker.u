import React, { useState, useEffect } from 'react';
import { 
  X, 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Globe, 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  Trash2, 
  UploadCloud, 
  RefreshCw, 
  HardDrive,
  Sparkles,
  Layers
} from 'lucide-react';
import { useAccount } from 'wagmi';
import { PINBUNKER_API_URL, formatBytes } from '../utils/ipfs';

interface VaultFile {
  id: string;
  ipfs_pin_hash: string;
  name: string;
  size: number;
  date_pinned: string;
  status: string;
  category: 'image' | 'pdf' | 'video' | 'website' | 'other';
}

interface VaultBrowserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNftStudioWithFile?: (cid: string, name: string) => void;
}

export const VaultBrowserModal: React.FC<VaultBrowserModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenNftStudioWithFile 
}) => {
  const { address, isConnected } = useAccount();
  const [files, setFiles] = useState<VaultFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'pdf' | 'website' | 'other'>('all');
  const [copiedCid, setCopiedCid] = useState<string | null>(null);
  const [totalStorageBytes, setTotalStorageBytes] = useState(0);
  const [unpinningHash, setUnpinningHash] = useState<string | null>(null);

  // Storage Limit (e.g. 2 GB default plan quota)
  const maxQuotaBytes = 2 * 1024 * 1024 * 1024; // 2 GB

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${PINBUNKER_API_URL}/data/pinList?pageLimit=100`, {
        headers: {
          'pinata_api_key': 'pb_master_key_bunker777',
          'pinata_secret_api_key': 'pb_master_secret_vault999',
        }
      });
      if (res.ok) {
        const data = await res.json();
        let total = 0;
        const parsed: VaultFile[] = (data.rows || []).map((row: any) => {
          total += row.size || 0;
          const fileName = (row.metadata?.name || row.ipfs_pin_hash || 'Untitled').toLowerCase();
          let category: VaultFile['category'] = 'other';
          if (fileName.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) category = 'image';
          else if (fileName.match(/\.(pdf|doc|docx|txt)$/)) category = 'pdf';
          else if (fileName.match(/\.(mp4|mov|webm)$/)) category = 'video';
          else if (fileName.match(/\.(html|zip)$/) || fileName.includes('site') || fileName.includes('web')) category = 'website';

          return {
            id: row.id,
            ipfs_pin_hash: row.ipfs_pin_hash,
            name: row.metadata?.name || row.ipfs_pin_hash,
            size: row.size || 0,
            date_pinned: row.date_pinned || new Date().toISOString(),
            status: 'pinned',
            category
          };
        });

        // Add demo items if empty so user can experience Google Drive feel immediately
        if (parsed.length === 0) {
          const demoFiles: VaultFile[] = [
            {
              id: '1',
              ipfs_pin_hash: 'bafybeihgn5ume45pxk4iwuaroghynubxre2xuiy7bwcodkjs5k2amg467u',
              name: 'PinBunker-Decentralized-Portal.html',
              size: 4803877,
              date_pinned: new Date().toISOString(),
              status: 'pinned',
              category: 'website'
            },
            {
              id: '2',
              ipfs_pin_hash: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi',
              name: 'Genesis-Artwork-Master.png',
              size: 1420800,
              date_pinned: new Date(Date.now() - 3600000 * 24).toISOString(),
              status: 'pinned',
              category: 'image'
            },
            {
              id: '3',
              ipfs_pin_hash: 'bafybeic7v3p3d6j4g5a2b1c0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3',
              name: 'Digital-Creator-Contract.pdf',
              size: 890400,
              date_pinned: new Date(Date.now() - 3600000 * 48).toISOString(),
              status: 'pinned',
              category: 'pdf'
            }
          ];
          setFiles(demoFiles);
          setTotalStorageBytes(demoFiles.reduce((acc, f) => acc + f.size, 0));
        } else {
          setFiles(parsed);
          setTotalStorageBytes(total);
        }
      }
    } catch (err) {
      console.error('Failed to load vault files:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchFiles();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (cid: string) => {
    navigator.clipboard.writeText(`https://pinbunker.u.limo/ipfs/${cid}`);
    setCopiedCid(cid);
    setTimeout(() => setCopiedCid(null), 2000);
  };

  const handleUnpin = async (hash: string) => {
    if (!confirm('Are you sure you want to remove this file from your PinBunker server storage?')) return;
    setUnpinningHash(hash);
    try {
      await fetch(`${PINBUNKER_API_URL}/pinning/unpin/${hash}`, {
        method: 'DELETE',
        headers: {
          'pinata_api_key': 'pb_master_key_bunker777',
          'pinata_secret_api_key': 'pb_master_secret_vault999',
        }
      });
      setFiles(prev => prev.filter(f => f.ipfs_pin_hash !== hash));
    } catch (err) {
      console.error('Unpin failed:', err);
    } finally {
      setUnpinningHash(null);
    }
  };

  // Filter files by category and search query
  const filteredFiles = files.filter(f => {
    const matchesCategory = filterType === 'all' || f.category === filterType;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.ipfs_pin_hash.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const usedPercentage = Math.min(100, (totalStorageBytes / maxQuotaBytes) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl h-[85vh] glass-panel rounded-2xl border border-emerald-500/30 bg-bunker-900 shadow-2xl flex flex-col overflow-hidden text-gray-200">
        
        {/* Top Header Bar */}
        <div className="p-5 sm:px-6 border-b border-gray-800 flex items-center justify-between gap-4 bg-gray-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-bunker-accent to-cyan-400 flex items-center justify-center text-black font-bold shadow-lg shadow-emerald-500/20">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  My PinBunker Vault
                </h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Permanent Storage
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Browse, share, download, and manage your permanently saved web files
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchFiles}
              disabled={isLoading}
              className="p-2 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-300 transition-colors"
              title="Refresh Files"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-bunker-accent' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar & Search */}
        <div className="p-4 sm:px-6 border-b border-gray-800/80 bg-gray-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                filterType === 'all' 
                  ? 'bg-bunker-accent text-black font-semibold' 
                  : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>All Files</span>
            </button>
            <button
              onClick={() => setFilterType('pdf')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                filterType === 'pdf' 
                  ? 'bg-bunker-accent text-black font-semibold' 
                  : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDFs & Docs</span>
            </button>
            <button
              onClick={() => setFilterType('image')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                filterType === 'image' 
                  ? 'bg-bunker-accent text-black font-semibold' 
                  : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Images & Art</span>
            </button>
            <button
              onClick={() => setFilterType('website')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                filterType === 'website' 
                  ? 'bg-bunker-accent text-black font-semibold' 
                  : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Websites</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search file name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 rounded-lg bg-gray-950/70 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-bunker-accent"
            />
          </div>
        </div>

        {/* File Table List (Google Drive View) */}
        <div className="flex-1 overflow-y-auto">
          {filteredFiles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-400">
              <Folder className="w-12 h-12 text-gray-600 mb-3" />
              <p className="text-base font-semibold text-white">No files found</p>
              <p className="text-xs text-gray-400 mt-1 max-w-sm">
                Upload your first image, PDF, or website to see it permanently hosted here.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-gray-950/60 sticky top-0 border-b border-gray-800 text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-6">File Name</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Type</th>
                  <th className="py-3 px-4 hidden md:table-cell">Size</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Saved Date</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filteredFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-800/40 transition-colors group">
                    
                    {/* Name & Icon */}
                    <td className="py-3.5 px-6 font-medium text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-800/80 flex items-center justify-center shrink-0 text-bunker-accent">
                        {file.category === 'image' && <ImageIcon className="w-4 h-4 text-emerald-400" />}
                        {file.category === 'pdf' && <FileText className="w-4 h-4 text-cyan-400" />}
                        {file.category === 'video' && <Film className="w-4 h-4 text-purple-400" />}
                        {file.category === 'website' && <Globe className="w-4 h-4 text-amber-400" />}
                        {file.category === 'other' && <FileText className="w-4 h-4 text-gray-400" />}
                      </div>
                      <div className="overflow-hidden">
                        <span className="block truncate max-w-xs sm:max-w-md font-semibold text-gray-100">
                          {file.name}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {file.ipfs_pin_hash.slice(0, 10)}...{file.ipfs_pin_hash.slice(-8)}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 hidden sm:table-cell text-gray-400 uppercase text-[10px] font-semibold">
                      {file.category}
                    </td>

                    {/* Size */}
                    <td className="py-3.5 px-4 hidden md:table-cell text-gray-300 font-mono">
                      {formatBytes(file.size)}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 hidden lg:table-cell text-gray-400">
                      {new Date(file.date_pinned).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-6 text-right space-x-2 whitespace-nowrap">
                      
                      {/* Copy Permanent Link */}
                      <button
                        onClick={() => handleCopy(file.ipfs_pin_hash)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                        title="Copy Public Link"
                      >
                        {copiedCid === file.ipfs_pin_hash ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span className="text-[11px] hidden sm:inline">
                          {copiedCid === file.ipfs_pin_hash ? 'Copied' : 'Copy Link'}
                        </span>
                      </button>

                      {/* View Link in Gateway */}
                      <a
                        href={`https://pinbunker.u.limo/ipfs/${file.ipfs_pin_hash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                        title="Open in Browser"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="text-[11px] hidden sm:inline">Open</span>
                      </a>

                      {/* Delete / Unpin */}
                      <button
                        onClick={() => handleUnpin(file.ipfs_pin_hash)}
                        disabled={unpinningHash === file.ipfs_pin_hash}
                        className="inline-flex items-center p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete from Vault"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Bottom Storage Quota Footer */}
        <div className="p-4 sm:px-6 border-t border-gray-800/80 bg-gray-950/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-80 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Vault Capacity Used:</span>
              <span className="text-white font-semibold font-mono">
                {formatBytes(totalStorageBytes)} of {formatBytes(maxQuotaBytes)}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-bunker-accent to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(4, usedPercentage)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 hidden md:inline">
              Need to host bigger collections or dApps?
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-white transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
