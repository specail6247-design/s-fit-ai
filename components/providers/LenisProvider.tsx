'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import React from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      {children as any}
    </ReactLenis>
  );
}
