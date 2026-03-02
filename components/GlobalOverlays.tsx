'use client';

import React from 'react';
import { PremiumModal } from '@/components/PremiumModal';
import { PrivacyModal } from '@/components/modals/PrivacyModal';
import { SupportHub } from '@/components/modals/SupportHub';

export function GlobalOverlays() {
  return (
    <>
      <PremiumModal />
      <PrivacyModal />
      <SupportHub />
    </>
  );
}
