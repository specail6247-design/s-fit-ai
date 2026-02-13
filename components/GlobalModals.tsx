'use client';

import { PremiumModal } from '@/components/PremiumModal';
import { LegalModal } from '@/components/LegalModal';
import { SupportHub } from '@/components/SupportHub';

export function GlobalModals() {
  return (
    <>
      <PremiumModal />
      <LegalModal />
      <SupportHub />
    </>
  );
}
