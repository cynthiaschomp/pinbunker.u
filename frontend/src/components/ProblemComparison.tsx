import React from 'react';
import { Upload, Lock, Share2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ProblemComparison: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Explanation of the Problem */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-bunker-accent font-semibold mb-3">
            HOW IT WORKS & WHY IT MATTERS
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Internet Has a "Broken Link" Problem. We Solved It.
          </p>
          <p className="text-gray-300 mt-4 text-base sm:text-lg leading-relaxed">
            On the regular internet, files are saved on a company's private computer. If that company goes out of business, changes their rules, or deletes your account, your pictures, documents, and websites vanish forever.
          </p>
        </div>

        {/* 3 Step Visual Walkthrough */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          
          <div className="glass-panel p-8 rounded-2xl border border-gray-800 flex flex-col justify-between relative">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-bunker-accent flex items-center justify-center mb-6">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 1</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-3">Upload Any File</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Choose photos, digital art, music, documents, or an entire website folder. Drag it into the browser or connect your software.
              </p>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-gray-800 flex flex-col justify-between relative">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Step 2</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-3">We Lock It Onto the Web</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Our servers distribute your file to the global open storage network and keep it active 24/7 so it cannot be altered, replaced, or taken down.
              </p>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-gray-800 flex flex-col justify-between relative">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <Share2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Step 3</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-3">Share Your Forever Link</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                You receive a permanent web address that anyone in the world can open on their phone or computer. The link stays live forever.
              </p>
            </div>
          </div>

        </div>

        {/* Comparison Callout: Old Way vs PinBunker */}
        <div className="glass-panel rounded-2xl p-8 sm:p-10 border border-gray-800 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-base">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>The Traditional Cloud Way:</span>
              </div>
              <ul className="text-xs text-gray-400 space-y-2 leading-relaxed">
                <li>• Demands credit card numbers and personal ID verification</li>
                <li>• If your payment fails, your files and links are wiped out</li>
                <li>• Restricts interactive games and custom web apps</li>
                <li>• Subject to sudden price jumps and closed account policies</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>The PinBunker Way:</span>
              </div>
              <ul className="text-xs text-gray-300 space-y-2 leading-relaxed">
                <li>• Pay with your crypto wallet in 1 click (no personal info)</li>
                <li>• Files are permanently preserved across the global network</li>
                <li>• Full web apps, interactive games, and art display natively</li>
                <li>• Transparent, predictable access designed for independence</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
