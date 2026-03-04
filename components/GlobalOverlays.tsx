'use client';
import { useStore } from '@/store/useStore';
import { SupportHub } from '@/components/modals/SupportHub';
import { PrivacyModal } from '@/components/modals/PrivacyModal';
import { PremiumModal } from '@/components/PremiumModal';

export const GlobalOverlays = () => {
  const { isSupportOpen, isPrivacyOpen, showPremiumModal, setShowPremiumModal, setSupportOpen, setPrivacyOpen } = useStore();

  return (
    <>
      <SupportHub isOpen={isSupportOpen} onClose={() => setSupportOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setPrivacyOpen(false)} />
      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </>
  );
};
