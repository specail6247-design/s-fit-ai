'use client';

import { PremiumModal } from '@/components/PremiumModal';
import { PrivacyModal } from '@/components/PrivacyModal';
import { SupportHub } from '@/components/SupportHub';

export function GlobalOverlays() {
  return (
    <>
      <PremiumModal />
      <PrivacyModal />
      <SupportHub />
    </>
  );
}
