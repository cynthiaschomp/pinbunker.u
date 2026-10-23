import React, { useState } from 'react';
import { X, Gift, CheckCircle, Copy, ShieldCheck, Wallet, Loader2, AlertCircle } from 'lucide-react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { PINBUNKER_API_URL } from '../utils/ipfs';

interface GiftRedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVault: () => void;
}

export const GiftRedeemModal: React.FC<GiftRedeemModalProps> = ({ isOpen, onClose, onOpenVault }) => {
  const { address, isConnected } = useAccount();
  const [isClaiming, setIsClaiming] = useState(false);
  const [credentials, setCredentials] = useState<{ apiKey: string; apiSecret: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);

  if (!isOpen) return null;

  const params = new URLSearchParams(window.location.search);
  const inviteCode = params.get('gift') || params.get('invite') || 'tester';

  const handleClaim = async () => {
    if (!address) return;
    setIsClaiming(true);
    setErrorMsg('');

    try {
      const res = await fetch(`${PINBUNKER_API_URL}/api/v1/keys/claimInvite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: inviteCode,
          wallet_address: address,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Failed to claim invitation.');
      }

      setCredentials({
        apiKey: data.api_key,
        apiSecret: data.api_secret,
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Error claiming invite.');
    } finally {
      setIsClaiming(false);
    }
  };

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
              VIP Tester Invitation
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Lifetime Account
              </span>
            </h3>
            <p className="text-xs text-gray-400">
              Lock your complimentary Lifetime Founder Pass to your crypto wallet
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* State 1: Claimed & Credentials Ready */}
        {credentials ? (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Lifetime Account Activated!</strong>
                Permanently locked to your wallet: <span className="font-mono">{address?.slice(0, 8)}...{address?.slice(-6)}</span>
              </div>
            </div>

            <div className="space-y-3 bg-gray-950/80 rounded-xl p-4 border border-gray-800 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                  Your Dedicated API Key:
                </label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={credentials.apiKey} 
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs font-mono text-gray-200 select-all"
                  />
                  <button
                    onClick={() => copyToClipboard(credentials.apiKey, true)}
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                  >
                    {copiedKey ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                  Your Dedicated API Secret:
                </label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={credentials.apiSecret} 
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs font-mono text-gray-200 select-all"
                  />
                  <button
                    onClick={() => copyToClipboard(credentials.apiSecret, false)}
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                  >
                    {copiedSecret ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

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
        ) : !isConnected ? (
          /* State 2: Prompt to Connect Wallet */
          <div className="space-y-5 text-center py-4">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Wallet className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-base font-bold text-white">Connect Your Wallet to Claim</h4>
              <p className="text-xs text-gray-300 mt-1 max-w-sm mx-auto leading-relaxed">
                To keep your account private and permanent, your lifetime tester pass must be bound to your wallet address. No passwords or emails needed.
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <ConnectButton showBalance={false} />
            </div>
          </div>
        ) : (
          /* State 3: Wallet Connected, Ready to Activate */
          <div className="space-y-5 py-2">
            <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800 text-xs space-y-2">
              <div className="flex justify-between items-center text-gray-400">
                <span>Invitation Code:</span>
                <span className="text-amber-400 font-mono font-bold uppercase">{inviteCode}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Binding To Wallet:</span>
                <span className="text-white font-mono font-semibold">{address?.slice(0, 8)}...{address?.slice(-6)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Granted Access Tier:</span>
                <span className="text-emerald-400 font-bold">Lifetime Founder (Permanent)</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed text-center">
              Clicking below will record your wallet on our nodes, issue your credentials, and activate your personal file vault.
            </p>

            <button
              onClick={handleClaim}
              disabled={isClaiming}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:brightness-110 text-black font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              {isClaiming ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Binding Account to Wallet...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Activate & Claim Lifetime Pass</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
