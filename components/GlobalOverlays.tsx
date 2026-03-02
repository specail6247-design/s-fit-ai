'use client';

import { LoginModal } from './modals/LoginModal';
import { SupportHub } from './modals/SupportHub';
// Import other existing overlays here if they exist and are supposed to be global.
import { PremiumModal } from './PremiumModal';

export function GlobalOverlays() {
  return (
    <>
      <LoginModal />
      <SupportHub />
      <PremiumModal />
    </>
  );
}
