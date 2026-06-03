'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import React from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {children as any}
    </ReactLenis>
  );
}
