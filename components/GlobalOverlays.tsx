'use client';

import { LoginModal } from './modals/LoginModal';
import { SupportHub } from './modals/SupportHub';
// Import other global overlays here later, e.g., PrivacyModal, PremiumModal, TheVault, etc.

export function GlobalOverlays() {
  return (
    <>
      <LoginModal />
      <SupportHub />
    </>
  );
}
