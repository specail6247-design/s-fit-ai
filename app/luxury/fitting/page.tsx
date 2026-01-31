'use client';

import React, { useEffect } from 'react';
import { FittingRoom } from '@/components/FittingRoom';
import { useStore } from '@/store/useStore';

export default function LuxuryFittingPage() {
  const { setSelectedBrand } = useStore();

  useEffect(() => {
    // Force set Hermes brand for the Luxury Fitting Room
    setSelectedBrand('Hermes');
  }, [setSelectedBrand]);

  return (
    <div className="w-full h-screen bg-void-black">
      <FittingRoom />
    </div>
  );
}
