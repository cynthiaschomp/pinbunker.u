import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Terminal, Globe, Lock, Cpu } from 'lucide-react';

interface HeroProps {
  onOpenCheckout: (tierId?: string) => void;
  onOpenSdkModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout, onOpenSdkModal }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Banner Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-8 animate-fade-in shadow-inner">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>DROP-IN PINATA REPLACEMENT • ZERO STRIPE KYC • 0 HTML BLOCKS</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6 font-mono">
          Sovereign IPFS Pinning. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-bunker-accent via-teal-300 to-cyan-400">
            No Credit Cards. No KYC.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed font-sans font-normal">
          Ditch Pinata's expensive $20/mo subscriptions, credit card declines, and the notorious 
          <span className="text-red-400 font-mono text-sm px-1.5 py-0.5 mx-1 rounded bg-red-950/60 border border-red-800/40">ERR_ID:00023</span> 
          HTML gateway block. PinBunker is self-hosted on Cynthia's dedicated 
          <strong className="text-white font-mono"> porkchop</strong> VPS with 1-click USDC checkout on Polygon & Base.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => onOpenCheckout('builder')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-bunker-accent text-black font-mono font-bold text-base hover:bg-emerald-300 transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 group"
          >
            <span>Launch Builder Pass ($9/mo USDC)</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenSdkModal}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-gray-800/80 hover:bg-gray-700/80 text-white font-mono font-semibold text-sm border border-gray-700 transition-all flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Drop-In SDK Integration</span>
          </button>
        </div>

        {/* 4 Core Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left font-mono">
          <div className="glass-panel p-4 rounded-xl border border-gray-800/80">
            <div className="text-emerald-400 mb-2">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-white">100% Drop-In SDK</div>
            <div className="text-xs text-gray-400 mt-1">Keep @pinata/sdk or pinatapy. Just update baseURL.</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-gray-800/80">
            <div className="text-cyan-400 mb-2">
              <Lock className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-white">Zero KYC & Doxing</div>
            <div className="text-xs text-gray-400 mt-1">Instant 1-click Unlock checkout with USDC or POL.</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-gray-800/80">
            <div className="text-amber-400 mb-2">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-white">0 HTML Restrictions</div>
            <div className="text-xs text-gray-400 mt-1">Full decentralized dApps, web games, & HTML canvas render natively.</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-gray-800/80">
            <div className="text-purple-400 mb-2">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-white">Sovereign porkchop VPS</div>
            <div className="text-xs text-gray-400 mt-1">Dedicated Kubo node 24/7 announcing to the global IPFS DHT.</div>
          </div>
        </div>

      </div>
    </section>
  );
};
