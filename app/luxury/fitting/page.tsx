'use client';

import React, { useEffect } from 'react';
import { FittingRoom } from '@/components/FittingRoom';
import { useStore } from '@/store/useStore';

export default function LuxuryFittingPage() {
  const { setSelectedBrand, selectedBrand } = useStore();

  useEffect(() => {
    // Default to Hermes for the Luxury Fitting experience if no brand is selected
    if (!selectedBrand) {
      setSelectedBrand('Hermes');
    }
  }, [selectedBrand, setSelectedBrand]);

  return (
    <main className="w-full h-screen overflow-hidden">
      <FittingRoom />
    </main>
  );
}
