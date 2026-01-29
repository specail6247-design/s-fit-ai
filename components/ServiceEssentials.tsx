'use client';

import React from 'react';
import { AuthButton } from './AuthButton';
import { SupportHub } from './SupportHub';

export function ServiceEssentials() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1000]">
      {/* Top Right: Auth */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <AuthButton />
      </div>

      {/* Bottom Right: Support Hub */}
      <div className="absolute bottom-4 right-4 pointer-events-auto">
        <SupportHub />
      </div>
    </div>
  );
}
