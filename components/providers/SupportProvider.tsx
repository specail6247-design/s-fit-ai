'use client';

import React, { useState } from 'react';
import { SupportHub, SupportHubTrigger } from '@/components/ui/SupportHub';

export function SupportProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {children}
      <SupportHubTrigger onClick={() => setIsOpen(true)} />
      <SupportHub isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
