'use client';

// S_FIT AI - Global Overlays
// Aggregates application-wide modals and drawers

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
