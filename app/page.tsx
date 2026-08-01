'use client';

import React from 'react';
import RealLifeFitting from '@/components/RealLifeFitting';
import { LandingPage } from '@/components/LandingPage';
import { useStore } from '@/store/useStore';

export default function Home() {
  const { selectedMode } = useStore();

  return selectedMode ? <RealLifeFitting /> : <LandingPage />;
}
