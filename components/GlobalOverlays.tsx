'use client';

import LoginModal from './modals/LoginModal';
import SupportHub from './modals/SupportHub';

export default function GlobalOverlays() {
  return (
    <>
      <LoginModal />
      <SupportHub />
    </>
  );
}
