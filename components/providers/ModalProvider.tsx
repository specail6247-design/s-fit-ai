'use client';

import { useStore } from '@/store/useStore';
import { PrivacyTermsModal } from '@/components/modals/PrivacyTermsModal';
import { SupportHub } from '@/components/modals/SupportHub';

export function ModalProvider() {
  const {
    isPrivacyOpen, setPrivacyOpen,
    isSupportOpen, setSupportOpen
  } = useStore();

  return (
    <>
      <PrivacyTermsModal isOpen={isPrivacyOpen} onClose={() => setPrivacyOpen(false)} />
      <SupportHub isOpen={isSupportOpen} onClose={() => setSupportOpen(false)} />
    </>
  );
}
