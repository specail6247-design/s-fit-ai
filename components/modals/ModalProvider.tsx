'use client';

// S_FIT AI - Modal Provider
// Centralized wrapper for global modals

import { LoginModal } from './LoginModal';
import { SupportHub } from './SupportHub';
import { PremiumModal } from '../PremiumModal'; // Assuming PremiumModal is at components/PremiumModal.tsx

export function ModalProvider() {
  return (
    <>
      <LoginModal />
      <SupportHub />
      <PremiumModal />
    </>
  );
}