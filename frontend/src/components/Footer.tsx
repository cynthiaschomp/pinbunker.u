import React from 'react';
import { Shield, Globe, Terminal, MessageSquare, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800/80 bg-bunker-900 py-12 text-xs font-mono text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-bunker-accent">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-bold text-sm">PINBUNKER (pinbunker.u)</span>
              <p className="text-[11px] text-gray-400">
                Self-hosted on Cynthia Schomp's sovereign VPS <span className="text-gray-300">porkchop</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <a
              href="https://pinbunker.u.limo"
              target="_blank"
              rel="noreferrer"
              className="hover:text-bunker-accent transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>pinbunker.u.limo</span>
            </a>

            <a
              href="https://unstoppabledomains.com/search?searchTerm=pinbunker.u"
              target="_blank"
              rel="noreferrer"
              className="hover:text-bunker-accent transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
              <span>Unstoppable Domains (.u)</span>
            </a>

            <a
              href="https://xmtp.chat"
              target="_blank"
              rel="noreferrer"
              className="hover:text-bunker-accent transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>XMTP Support</span>
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px]">
          <div>
            © 2026 PinBunker Engine. Built for uncensorable, sovereign Web3 builders worldwide.
          </div>
          <div className="text-gray-400">
            Kubo v0.32+ • Direct DHT Peering • 0 KYC • Relative Path Gateway Enabled
          </div>
        </div>

      </div>
    </footer>
  );
};
