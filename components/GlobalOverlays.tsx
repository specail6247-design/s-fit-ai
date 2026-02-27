'use client';

import { LoginModal } from '@/components/ui/LoginModal';
import { SupportHub } from '@/components/ui/SupportHub';

export function GlobalOverlays() {
  return (
    <>
      <LoginModal />
      <SupportHub />
    </>
  );
}
