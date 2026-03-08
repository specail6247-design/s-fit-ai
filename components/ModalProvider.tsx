'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { PrivacyTermsModal } from '@/components/modals/PrivacyTermsModal';
import { SupportHub } from '@/components/modals/SupportHub';

export function ModalProvider() {
  const {
    showPrivacyTermsModal,
    setShowPrivacyTermsModal,
    showSupportHub,
    setShowSupportHub
  } = useStore();

  return (
    <>
      <PrivacyTermsModal
        isOpen={showPrivacyTermsModal}
        onClose={() => setShowPrivacyTermsModal(false)}
      />
      <SupportHub
        isOpen={showSupportHub}
        onClose={() => setShowSupportHub(false)}
      />
    </>
  );
}
