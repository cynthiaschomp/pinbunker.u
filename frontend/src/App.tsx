import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NodeStatusWidget } from './components/NodeStatusWidget';
import { LiveUploader } from './components/LiveUploader';
import { ProblemComparison } from './components/ProblemComparison';
import { PricingTiers } from './components/PricingTiers';
import { SdkIntegrationModal } from './components/SdkIntegrationModal';
import { UnlockCheckoutModal } from './components/UnlockCheckoutModal';
import { DmcaModal } from './components/DmcaModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isSdkModalOpen, setIsSdkModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDmcaOpen, setIsDmcaOpen] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<string>('builder');

  const handleOpenCheckout = (tierId: string = 'builder') => {
    setSelectedTierId(tierId);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-bunker-900 text-gray-100 flex flex-col font-sans">
      <Navbar
        onOpenSdkModal={() => setIsSdkModalOpen(true)}
        onOpenCheckout={handleOpenCheckout}
      />

      <main className="flex-grow">
        <Hero
          onOpenCheckout={handleOpenCheckout}
          onOpenSdkModal={() => setIsSdkModalOpen(true)}
        />

        <NodeStatusWidget />

        <LiveUploader />

        <ProblemComparison />

        <PricingTiers onSelectTier={handleOpenCheckout} />
      </main>

      <Footer onOpenDmca={() => setIsDmcaOpen(true)} />

      {/* Interactive Modals */}
      <SdkIntegrationModal
        isOpen={isSdkModalOpen}
        onClose={() => setIsSdkModalOpen(false)}
      />

      <UnlockCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedTierId={selectedTierId}
      />

      <DmcaModal
        isOpen={isDmcaOpen}
        onClose={() => setIsDmcaOpen(false)}
      />
    </div>
  );
};

export default App;
