import React, { useState } from 'react';
import { X, ShieldCheck, ExternalLink, Check, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { TIERS, TierConfig } from '../config/unlock';
import { useAccount } from 'wagmi';

interface UnlockCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTierId?: string;
}

export const UnlockCheckoutModal: React.FC<UnlockCheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedTierId = 'builder',
}) => {
  const { isConnected, address } = useAccount();
  const [currentTierId, setCurrentTierId] = useState<string>(selectedTierId);
  const [selectedNetwork, setSelectedNetwork] = useState<'polygon' | 'base'>('polygon');
  const [isProcessing, setIsProcessing] = useState(false);
  const [txSuccess, setTxSuccess] = useState(false);

  if (!isOpen) return null;

  const currentTier = TIERS.find(t => t.id === currentTierId) || TIERS[0];
  const lockAddress = selectedNetwork === 'polygon' ? currentTier.lockAddressPolygon : currentTier.lockAddressBase;

  const handle1ClickCheckout = () => {
    setIsProcessing(true);
    // Simulate Unlock checkout completion for UX demo
    setTimeout(() => {
      setIsProcessing(false);
      setTxSuccess(true);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl glass-panel rounded-2xl border border-emerald-500/30 bg-bunker-900 shadow-2xl p-6 sm:p-8">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-bunker-accent">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-mono text-white flex items-center gap-2">
              Unlock Protocol Checkout
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              100% Crypto-Native • Zero KYC • USDC Subscription NFT
            </p>
          </div>
        </div>

        {/* Tier Selector */}
        <div className="grid grid-cols-3 gap-2 mb-6 font-mono text-xs">
          {TIERS.map(t => (
            <button
              key={t.id}
              onClick={() => {
                setCurrentTierId(t.id);
                setTxSuccess(false);
              }}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                currentTierId === t.id
                  ? 'border-bunker-accent bg-emerald-500/10 text-white font-bold'
                  : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="truncate">{t.name}</div>
              <div className="text-bunker-accent text-[11px] mt-0.5">{t.price}</div>
            </button>
          ))}
        </div>

        {/* Network Selection */}
        <div className="mb-6">
          <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
            Select Settlement Network (USDC)
          </label>
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <button
              onClick={() => setSelectedNetwork('polygon')}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                selectedNetwork === 'polygon'
                  ? 'border-purple-500 bg-purple-500/10 text-purple-300 font-semibold'
                  : 'border-gray-800 bg-gray-900/40 text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                Polygon Network
              </span>
              <span className="text-[10px] text-gray-400">Gas &lt; $0.01</span>
            </button>

            <button
              onClick={() => setSelectedNetwork('base')}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                selectedNetwork === 'base'
                  ? 'border-blue-500 bg-blue-500/10 text-blue-300 font-semibold'
                  : 'border-gray-800 bg-gray-900/40 text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                Base (Coinbase L2)
              </span>
              <span className="text-[10px] text-gray-400">Gas &lt; $0.005</span>
            </button>
          </div>
        </div>

        {/* Selected Tier Details Summary */}
        <div className="p-4 rounded-xl bg-black/60 border border-gray-800 mb-6 font-mono text-xs space-y-2">
          <div className="flex justify-between items-center text-gray-300">
            <span>Pass Type:</span>
            <span className="text-white font-bold">{currentTier.name}</span>
          </div>
          <div className="flex justify-between items-center text-gray-300">
            <span>Amount:</span>
            <span className="text-bunker-accent font-bold text-sm">{currentTier.price} USDC</span>
          </div>
          <div className="flex justify-between items-center text-gray-300">
            <span>Storage:</span>
            <span className="text-white">{currentTier.storage}</span>
          </div>
          <div className="flex justify-between items-center text-gray-300">
            <span>Unlock Lock Contract:</span>
            <span className="text-gray-400 truncate max-w-[200px]" title={lockAddress}>
              {lockAddress.substring(0, 8)}...{lockAddress.substring(lockAddress.length - 6)}
            </span>
          </div>
        </div>

        {txSuccess ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center font-mono">
            <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <h4 className="text-white font-bold text-sm">Pass Activated Successfully!</h4>
            <p className="text-xs text-emerald-300/80 mt-1">
              Your sovereign PinBunker quota is now live on porkchop. You can issue API keys from the SDK modal.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handle1ClickCheckout}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-xl bg-bunker-accent text-black font-mono font-bold text-sm hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Confirming USDC in Wallet...</span>
              ) : (
                <span>Pay {currentTier.price} USDC via Unlock Protocol</span>
              )}
            </button>

            <a
              href={currentTier.unlockUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white font-mono text-xs transition-colors flex items-center justify-center gap-1.5 border border-gray-700"
            >
              <span>Open in Official Unlock Checkout App</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
