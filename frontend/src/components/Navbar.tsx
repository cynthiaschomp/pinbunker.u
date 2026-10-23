import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Shield, Terminal, Zap } from 'lucide-react';

interface NavbarProps {
  onOpenSdkModal: () => void;
  onOpenCheckout: (tierId?: string) => void;
  onOpenNftStudio?: () => void;
  onOpenVault?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenSdkModal, 
  onOpenCheckout, 
  onOpenNftStudio,
  onOpenVault 
}) => {
  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-bunker-accent via-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Shield className="w-6 h-6 text-black" strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-mono">
                PIN<span className="text-bunker-accent">BUNKER</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 flex items-center gap-1.5 font-sans">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Decentralized Network Active</span>
            </p>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-300">
          <a href="#solutions" className="hover:text-bunker-accent transition-colors">
            Solutions
          </a>
          <button
            onClick={onOpenVault}
            className="hover:text-bunker-accent transition-colors flex items-center gap-1.5 text-cyan-400 font-semibold"
          >
            My Vault
          </button>
          <button
            onClick={onOpenNftStudio}
            className="hover:text-bunker-accent transition-colors flex items-center gap-1.5 text-emerald-400 font-semibold"
          >
            <Zap className="w-4 h-4 text-bunker-accent" />
            NFT Studio
          </button>
          <a href="#pricing" className="hover:text-bunker-accent transition-colors">
            Access Plans
          </a>
          <button
            onClick={onOpenSdkModal}
            className="hover:text-bunker-accent transition-colors flex items-center gap-1.5 text-xs bg-gray-800/80 px-3.5 py-1.5 rounded-lg border border-gray-700/80"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Developer Integration
          </button>
        </div>

        {/* Right Actions & Connect Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenCheckout('builder')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg bg-bunker-accent text-black hover:bg-emerald-300 transition-all shadow-md shadow-emerald-500/20"
          >
            Get Started
          </button>
          <ConnectButton 
            showBalance={false}
            chainStatus="icon"
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
          />
        </div>

      </div>
    </nav>
  );
};
