'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { PrivacyModal } from './modals/PrivacyModal';
import { SupportHub } from './modals/SupportHub';
// Import LoginModal, PremiumModal, etc. if they exist

import { AnimatePresence } from 'framer-motion';

export function GlobalOverlays() {
  const isPrivacyOpen = useStore((state) => state.isPrivacyOpen);
  const setIsPrivacyOpen = useStore((state) => state.setIsPrivacyOpen);
  const privacyActiveTab = useStore((state) => state.privacyActiveTab);

  const isSupportOpen = useStore((state) => state.isSupportOpen);
  const setIsSupportOpen = useStore((state) => state.setIsSupportOpen);

  return (
    <AnimatePresence>
      {isPrivacyOpen && (
        <PrivacyModal
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
          initialTab={privacyActiveTab}
        />
      )}

      {isSupportOpen && (
        <SupportHub
          isOpen={isSupportOpen}
          onClose={() => setIsSupportOpen(false)}
        />
      )}

      {/* Add other global overlays here later */}
    </AnimatePresence>
  );
}
