'use client';

import { LoginModal } from '@/components/LoginModal';
import { SupportHub } from '@/components/SupportHub';
import { PremiumModal } from '@/components/PremiumModal';

export function GlobalOverlays() {
  return (
    <>
      <LoginModal />
      <SupportHub />
      <PremiumModal />
    </>
  );
}
