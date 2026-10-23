import React, { useState } from 'react';
import { X, Scale, Send, CheckCircle, AlertTriangle } from 'lucide-react';

interface DmcaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DmcaModal: React.FC<DmcaModalProps> = ({ isOpen, onClose }) => {
  const [cid, setCid] = useState('');
  const [copyrightOwner, setCopyrightOwner] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setCid('');
    setCopyrightOwner('');
    setContactEmail('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl border border-gray-700/80 bg-bunker-900 shadow-2xl p-6 sm:p-8 text-gray-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              DMCA & Legal Takedown
            </h3>
            <p className="text-xs text-gray-400">
              Content Removal & Safe Harbor Notice Procedure
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-white">Notice Received</h4>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm mx-auto">
              Your takedown request has been recorded. Upon review of the provided ownership evidence, the requested content hash will be unpinned from PinBunker servers and blocked across our public web gateways.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-lg bg-bunker-accent text-black font-semibold text-xs hover:bg-emerald-300 transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 rounded-lg bg-gray-800/60 border border-gray-700/60 text-xs text-gray-300 leading-relaxed flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                PinBunker respects intellectual property rights. Submitting this form requests that the specified content hash be unpinned from our storage nodes and blocked on PinBunker-operated gateways.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Content Identifier / Web Address (CID or URL) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. bafybeic... or https://pinbunker.u/ipfs/..."
                value={cid}
                onChange={(e) => setCid(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-gray-950/70 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-bunker-accent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Copyright Owner / Entity *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Legal name or organization"
                  value={copyrightOwner}
                  onChange={(e) => setCopyrightOwner(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-gray-950/70 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-bunker-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Contact Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="legal@yourdomain.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-gray-950/70 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-bunker-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Description of Infringement & Verification Link *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe the copyrighted work, provide a link to the authorized original, and specify your authorization to act on behalf of the copyright holder."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-gray-950/70 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-bunker-accent"
              />
            </div>

            <p className="text-[11px] text-gray-400 leading-tight">
              By submitting, you certify under penalty of perjury that you have a good faith belief that the identified material is not authorized by the copyright owner, its agent, or the law.
            </p>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-800 text-xs font-medium text-gray-300 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-bunker-accent text-black font-semibold text-xs hover:bg-emerald-300 transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Notice</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
