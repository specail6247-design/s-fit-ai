'use client';

import React from 'react';
import LoginModal from '@/components/LoginModal';
import SupportHub from '@/components/SupportHub';

export default function GlobalOverlays() {
  return (
    <>
      <LoginModal />
      <SupportHub />
    </>
  );
}
