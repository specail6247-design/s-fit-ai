'use client';

// S_FIT AI - Global Overlays Manager
// Orchestrates all app-wide modal/overlay components

import React from 'react';
import { PremiumModal } from './PremiumModal';
import { PrivacyModal } from './PrivacyModal';
import { SupportHub } from './SupportHub';

export function GlobalOverlays() {
  return (
    <>
      <PremiumModal />
      <PrivacyModal />
      <SupportHub />
    </>
  );
}
