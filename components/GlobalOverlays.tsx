'use client';

import { LoginModal } from './LoginModal';
import { SupportHub } from './SupportHub';

export function GlobalOverlays() {
  return (
    <>
      <LoginModal />
      <SupportHub />
    </>
  );
}
