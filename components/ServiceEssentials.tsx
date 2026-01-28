'use client';

import React from 'react';
import { AuthButton } from './AuthButton';
import SupportHub from './SupportHub';

export default function ServiceEssentials() {
  return (
    <>
      {/* Login System: Top Right */}
      <div className="fixed top-8 right-8 z-50">
        <AuthButton />
      </div>

      {/* Support Hub: Bottom Right (Self-positioned, but we render it here) */}
      <SupportHub />
    </>
  );
}
