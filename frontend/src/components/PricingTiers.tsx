import React from 'react';
import { TIERS, TierConfig } from '../config/unlock';
import { Check, Shield, Zap, Crown } from 'lucide-react';

interface PricingTiersProps {
  onSelectTier: (tierId: string) => void;
}

export const PricingTiers: React.FC<PricingTiersProps> = ({ onSelectTier }) => {
  return (
    <section id="pricing" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-bunker-accent mb-3 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            Simple Crypto-Native Subscription Plans
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white font-mono">
            Zero Stripe KYC. 1-Click USDC.
          </p>
          <p className="text-gray-400 mt-4 text-base">
            Pay with USDC or POL on Polygon or Base via Unlock Protocol. Cancel or transfer your access NFT anytime.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {TIERS.map((tier: TierConfig) => {
            const isPro = tier.id === 'pro';
            const isLifetime = tier.id === 'lifetime';

            return (
              <div
                key={tier.id}
                className={`flex flex-col justify-between rounded-2xl p-8 transition-all relative ${
                  isPro
                    ? 'glass-panel-glow border-bunker-accent/50 scale-105 z-20 shadow-2xl shadow-emerald-500/10'
                    : 'glass-panel border-gray-800 hover:border-gray-700'
                }`}
              >
                {/* Popular Pill */}
                {tier.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-bunker-accent text-black font-mono text-xs font-extrabold uppercase tracking-wide shadow-md shadow-emerald-500/30">
                    Most Popular for Production
                  </div>
                )}

                {isLifetime && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-mono text-xs font-extrabold uppercase tracking-wide shadow-md shadow-amber-500/30 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5" />
                    Lifetime Sovereign
                  </div>
                )}

                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold font-mono text-white flex items-center gap-2">
                      {tier.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
                        {tier.price}
                      </span>
                      <span className="text-sm font-mono text-gray-400">
                        {tier.period}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-400 font-mono mt-1">
                      Polygon & Base (Zero KYC)
                    </p>
                  </div>

                  {/* Specs Pill */}
                  <div className="bg-gray-900/80 rounded-xl p-3 border border-gray-800 mb-6 font-mono text-xs space-y-1">
                    <div className="text-gray-300 font-semibold flex items-center justify-between">
                      <span>Storage:</span>
                      <span className="text-white">{tier.storage}</span>
                    </div>
                    <div className="text-gray-300 font-semibold flex items-center justify-between">
                      <span>Bandwidth:</span>
                      <span className="text-white">{tier.bandwidth}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3.5 mb-8">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-bunker-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-300 font-medium leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => onSelectTier(tier.id)}
                  className={`w-full py-3.5 px-4 rounded-xl font-mono font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    isPro
                      ? 'bg-bunker-accent text-black hover:bg-emerald-300 shadow-lg shadow-emerald-500/20'
                      : isLifetime
                      ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-black hover:brightness-110 shadow-lg shadow-amber-500/20'
                      : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>
                    {isLifetime ? 'Secure Lifetime Bunker' : `Subscribe in USDC (${tier.price})`}
                  </span>
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
