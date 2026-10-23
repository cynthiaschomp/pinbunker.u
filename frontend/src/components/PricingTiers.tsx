import React from 'react';
import { TIERS, TierConfig } from '../config/unlock';
import { Check, Shield, Crown } from 'lucide-react';

interface PricingTiersProps {
  onSelectTier: (tierId: string) => void;
}

export const PricingTiers: React.FC<PricingTiersProps> = ({ onSelectTier }) => {
  return (
    <section id="pricing" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-bunker-accent font-semibold mb-3">
            CAPACITY & ACCESS PLANS
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Scale for Every Project Phase
          </p>
          <p className="text-gray-300 mt-4 text-base sm:text-lg leading-relaxed">
            Direct crypto checkout with your wallet on Polygon or Base. Simple, transparent access without contracts, hidden surcharges, or banking friction.
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
                {tier.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md ${
                    isLifetime 
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-amber-500/20 flex items-center gap-1.5' 
                      : 'bg-bunker-accent text-black shadow-emerald-500/20'
                  }`}>
                    {isLifetime && <Crown className="w-3.5 h-3.5" />}
                    <span>{tier.badge}</span>
                  </div>
                )}

                <div>
                  {/* Header */}
                  <div className="mb-2">
                    <h3 className="text-2xl font-bold text-white">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                      {tier.idealFor}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="my-6 py-4 border-y border-gray-800/80">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                        {tier.price}
                      </span>
                      <span className="text-sm text-gray-400">
                        {tier.period}
                      </span>
                    </div>
                  </div>

                  {/* Specs Pill */}
                  <div className="bg-gray-900/90 rounded-xl p-3.5 border border-gray-800 mb-6 text-xs space-y-1.5">
                    <div className="text-gray-300 flex items-center justify-between">
                      <span className="text-gray-400">Capacity:</span>
                      <span className="text-white font-semibold">{tier.storage}</span>
                    </div>
                    <div className="text-gray-300 flex items-center justify-between">
                      <span className="text-gray-400">Bandwidth:</span>
                      <span className="text-white font-semibold">{tier.bandwidth}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-bunker-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-300 leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => onSelectTier(tier.id)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    isPro
                      ? 'bg-bunker-accent text-black hover:bg-emerald-300 shadow-lg shadow-emerald-500/20'
                      : isLifetime
                      ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-black hover:brightness-110 shadow-lg shadow-amber-500/20'
                      : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>
                    {isLifetime ? 'Activate Lifetime Access' : `Select ${tier.name}`}
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
