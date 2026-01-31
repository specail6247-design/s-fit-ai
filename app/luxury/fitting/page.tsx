'use client';

import React, { useEffect } from 'react';
import { FittingRoom } from '@/components/FittingRoom';
import { useStore } from '@/store/useStore';

export default function LuxuryFittingPage() {
  const { setSelectedBrand, setSelectedMode } = useStore();

  useEffect(() => {
    setSelectedBrand('Gucci');
    setSelectedMode('digital-twin'); // Or appropriate mode for luxury
  }, [setSelectedBrand, setSelectedMode]);

  return (
    <main className="w-full h-screen bg-void-black overflow-hidden">
      <FittingRoom />
    </main>
  );
}
