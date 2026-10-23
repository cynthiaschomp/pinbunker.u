import React from 'react';
import { Shield, Globe, ExternalLink, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800/80 bg-bunker-900 py-12 text-xs text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-bunker-accent">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-bold text-sm tracking-wide">PINBUNKER</span>
              <p className="text-xs text-gray-400">
                Permanent, uncensorable storage for digital creators and builders worldwide.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <a
              href="#how-it-works"
              className="hover:text-bunker-accent transition-colors"
            >
              How It Works
            </a>

            <a
              href="#uploader"
              className="hover:text-bunker-accent transition-colors"
            >
              Try It Free
            </a>

            <a
              href="#pricing"
              className="hover:text-bunker-accent transition-colors"
            >
              Capacity Plans
            </a>

            <a
              href="https://pinbunker.u.limo"
              target="_blank"
              rel="noreferrer"
              className="hover:text-bunker-accent transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Decentralized Portal</span>
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs">
          <div>
            © 2026 PinBunker. Built for open, sovereign web permanence.
          </div>
          <div className="text-gray-400">
            Zero Corporate Middlemen • Global Decentralized Network • Permanent Web Links
          </div>
        </div>

      </div>
    </footer>
  );
};
