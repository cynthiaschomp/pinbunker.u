import React from 'react';
import { XCircle, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

export const ProblemComparison: React.FC = () => {
  const comparisons = [
    {
      title: "Payment & Identity",
      pinataBad: "Mandatory Credit Cards & Stripe KYC. International cards get declined, builders forced to dox their legal identity.",
      pinbunkerGood: "100% Crypto-Native. 1-click checkout with USDC/POL on Polygon or Base via Unlock Protocol. Zero KYC forever.",
    },
    {
      title: "HTML & dApp Rendering",
      pinataBad: "Infamous Gateway HTML Block (ERR_ID:00023). Decentralized websites, JS apps, and web3 games are crippled on public gateways.",
      pinbunkerGood: "Zero HTML Restrictions. Web3 websites, Canvas games, and rich interactive dApps render and execute flawlessly.",
    },
    {
      title: "Rate Limits During Mints",
      pinataBad: "Gateway 429 'Too Many Requests' bottlenecks during NFT mint spikes and peak community traffic.",
      pinbunkerGood: "High-Throughput Sovereign Daemon. Directly peered with global DHT nodes, eliminating centralized SaaS 429 throttling.",
    },
    {
      title: "Entry Pricing Tier",
      pinataBad: "Expensive $20/month ($240/yr) entry toll after killing the free tier. Overpriced for developers and hobbyists.",
      pinbunkerGood: "Affordable $9/month USDC Builder Pass or $99 One-Time Lifetime Founder pass. Accessible for all builders.",
    },
    {
      title: "SDK Compatibility",
      pinataBad: "Centralized proprietary ecosystem locked to their billing servers.",
      pinbunkerGood: "100% Drop-In Parity. Use @pinata/sdk, pinatapy, or curl without modifying your application logic.",
    }
  ];

  return (
    <section id="comparison" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-bunker-accent mb-3 flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            Centralized SaaS vs Sovereign Web3
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
            Why Builders Are Migrating to PinBunker
          </p>
          <p className="text-gray-400 mt-4 text-base">
            Pinata started as decentralized storage, then became another KYC-gated Web2 SaaS company. PinBunker brings sovereignty back to IPFS.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Pinata SaaS Column */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-red-900/30 bg-red-950/10 relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-red-900/30">
              <div>
                <h3 className="text-xl font-bold text-red-300 font-mono">Pinata Cloud</h3>
                <p className="text-xs text-red-400/80 font-mono mt-0.5">Centralized SaaS Model</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-red-900/40 text-red-300 border border-red-700/40">
                Centralized
              </span>
            </div>

            <div className="space-y-6 mt-6">
              {comparisons.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.pinataBad}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PinBunker Column */}
          <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 border border-bunker-accent/40 bg-bunker-800/80 relative overflow-hidden shadow-2xl shadow-emerald-950/40">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-bunker-accent/20 to-transparent p-4 pointer-events-none">
              <Sparkles className="w-8 h-8 text-bunker-accent/40" />
            </div>

            <div className="flex items-center justify-between pb-6 border-b border-bunker-accent/30">
              <div>
                <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                  <span>PinBunker</span>
                  <span className="text-bunker-accent font-mono text-sm">(pinbunker.u)</span>
                </h3>
                <p className="text-xs text-emerald-400 font-mono mt-0.5">Sovereign VPS Architecture</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Crypto-Native
              </span>
            </div>

            <div className="space-y-6 mt-6">
              {comparisons.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-bunker-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-300">{item.title}</h4>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">{item.pinbunkerGood}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
