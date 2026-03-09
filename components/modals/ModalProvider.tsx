'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useStore } from '@/store/useStore';

// Dynamically import modals to optimize main bundle size
const PrivacyTermsModal = dynamic(() => import('./PrivacyTermsModal'), { ssr: false });
const SupportHub = dynamic(() => import('./SupportHub'), { ssr: false });

export default function ModalProvider() {
  const { showPrivacyModal, showSupportHub } = useStore();

  return (
    <>
      {showPrivacyModal && <PrivacyTermsModal />}
      {showSupportHub && <SupportHub />}
    </>
  );
}
