import React, { useState } from 'react';
import { X, Gift, CheckCircle, Copy, Key, ShieldCheck } from 'lucide-react';

interface GiftRedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVault: () => void;
}

export const GiftRedeemModal: React.FC<GiftRedeemModalProps> = ({ isOpen, onClose, onOpenVault }) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);

  // VIP Tester Credentials
  const apiKey = 'pb_gift_1e54a6c70480622293ef96a7c1cddd4c';
  const apiSecret = 'pb_sec_ad3d0c39bf253be843458676570fa95b4ec87d0a64a01413';

  if (!isOpen) return null;

  const copyToClipboard = (text: string, isKey: boolean) => {
    navigator.clipboard.writeText(text);
    if (isKey) {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedSecret(true);
      setTimeout(() => setCopiedSecret(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl border border-amber-500/40 bg-bunker-900 shadow-2xl p-6 sm:p-8 text-gray-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-black font-bold shadow-lg shadow-amber-500/20">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              VIP Tester Gift Pass
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Lifetime Active
              </span>
            </h3>
            <p className="text-xs text-gray-400">
              Complimentary Lifetime PinBunker Account for Site Testing
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Welcome to PinBunker!</strong> Your Lifetime Founder pass has been activated with permanent storage and unlimited API access.
            </span>
          </div>

          <div className="space-y-3 bg-gray-950/80 rounded-xl p-4 border border-gray-800 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                Your PinBunker API Key:
              </label>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={apiKey} 
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs font-mono text-gray-200 select-all"
                />
                <button
                  onClick={() => copyToClipboard(apiKey, true)}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                  title="Copy API Key"
                >
                  {copiedKey ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                Your PinBunker API Secret:
              </label>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={apiSecret} 
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs font-mono text-gray-200 select-all"
                />
                <button
                  onClick={() => copyToClipboard(apiSecret, false)}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                  title="Copy API Secret"
                >
                  {copiedSecret ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-gray-900/60 border border-gray-800 text-[11px] text-gray-400 leading-relaxed flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-bunker-accent shrink-0" />
            <span>
              Use these credentials with the Web Presence Boss plugin or any standard developer tool to save files permanently.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenVault();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:brightness-110 text-black font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>Open My File Vault</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
