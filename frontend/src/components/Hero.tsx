import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenCheckout: (tierId?: string) => void;
  onOpenSdkModal: () => void;
  onOpenNftStudio?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout, onOpenSdkModal, onOpenNftStudio }) => {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Soft ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Simple Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-8">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>PERMANENT FILE STORAGE & 1-CLICK NFT CREATION • ZERO PAPERWORK</span>
        </div>

        {/* Clear Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] mb-6">
          Store Files Permanently. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-bunker-accent via-teal-300 to-cyan-400">
            Mint Indestructible NFTs.
          </span>
        </h1>

        {/* Plain English Subtitle */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed font-normal">
          Traditional web hosts delete your files when bills lapse, and standard NFTs break when temporary image links 404. PinBunker permanently locks your digital art, media, and web content onto the global decentralized web — so nothing you create ever vanishes.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenNftStudio}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-bunker-accent text-black font-bold text-base hover:bg-emerald-300 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-5 h-5 text-black" />
            <span>Create & Mint an NFT</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onOpenCheckout('builder')}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gray-800/90 hover:bg-gray-700/90 text-white font-semibold text-base border border-gray-700 transition-all flex items-center justify-center"
          >
            <span>Storage Capacity Plans</span>
          </button>

          <a
            href="#uploader"
            className="w-full sm:w-auto px-6 py-4 rounded-xl text-gray-400 hover:text-white font-medium text-base transition-colors flex items-center justify-center"
          >
            <span>Try Free Upload</span>
          </a>
        </div>

        {/* 3 Plain English Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left pt-6 border-t border-gray-800/80">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-bunker-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="text-base font-bold text-white">Permanent Web Addresses</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Every file and NFT receives an immutable web address that can never expire or be altered.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-bunker-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="text-base font-bold text-white">No Broken NFT Images</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Both your high-res artwork and smart contract certificates are pinned forever to open peer-to-peer storage.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-bunker-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="text-base font-bold text-white">Zero Banking Friction</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                No credit cards, subscriptions, or invasive paperwork. Mint and store directly from your crypto wallet.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
