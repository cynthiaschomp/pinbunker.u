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
import { NftStudioModal } from './components/NftStudioModal';
import { VaultBrowserModal } from './components/VaultBrowserModal';
import { GiftRedeemModal } from './components/GiftRedeemModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isSdkModalOpen, setIsSdkModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDmcaOpen, setIsDmcaOpen] = useState(false);
  const [isNftStudioOpen, setIsNftStudioOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has('admin');
  });
  const [isGiftOpen, setIsGiftOpen] = useState(() => {
    // Check if user came from invite link (e.g. ?gift=tester or ?invite=...)
    const params = new URLSearchParams(window.location.search);
    return params.has('gift') || params.has('invite');
  });
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
        onOpenNftStudio={() => setIsNftStudioOpen(true)}
        onOpenVault={() => setIsVaultOpen(true)}
      />

      <main className="flex-grow">
        <Hero
          onOpenCheckout={handleOpenCheckout}
          onOpenSdkModal={() => setIsSdkModalOpen(true)}
          onOpenNftStudio={() => setIsNftStudioOpen(true)}
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

      <NftStudioModal
        isOpen={isNftStudioOpen}
        onClose={() => setIsNftStudioOpen(false)}
      />

      <VaultBrowserModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
      />

      <GiftRedeemModal
        isOpen={isGiftOpen}
        onClose={() => setIsGiftOpen(false)}
        onOpenVault={() => setIsVaultOpen(true)}
      />
    </div>
  );
};

export default App;
