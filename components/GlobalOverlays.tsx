'use client';

import { LoginModal } from './modals/LoginModal';
import { SupportHub } from './modals/SupportHub';
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
