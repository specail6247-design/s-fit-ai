import React from 'react';
import { AuthButton } from './AuthButton';
import { SupportHub } from './SupportHub';

export function ServiceEssentials() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1000] overflow-hidden">
      {/* Auth Button - Top Right */}
      <div className="absolute top-6 right-6 pointer-events-auto">
        <AuthButton />
      </div>

      {/* Support Hub - Bottom Right */}
      <div className="absolute bottom-6 right-6 pointer-events-auto">
        <SupportHub />
      </div>
    </div>
  );
}
