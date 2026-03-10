'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import PrivacyTermsModal from './PrivacyTermsModal';
import SupportHub from './SupportHub';
import { PremiumModal } from '../PremiumModal'; // Assumes PremiumModal exists and is already managed similarly

export default function ModalProvider() {
  // Using specific selectors to avoid re-rendering on other state changes
  const isPrivacyModalOpen = useStore((state) => state.isPrivacyModalOpen);
  const setPrivacyModalOpen = useStore((state) => state.setPrivacyModalOpen);

  const isSupportHubOpen = useStore((state) => state.isSupportHubOpen);
  const setSupportHubOpen = useStore((state) => state.setSupportHubOpen);

  return (
    <>
      <PrivacyTermsModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
      <SupportHub
        isOpen={isSupportHubOpen}
        onClose={() => setSupportHubOpen(false)}
      />
      <PremiumModal />
    </>
  );
}
