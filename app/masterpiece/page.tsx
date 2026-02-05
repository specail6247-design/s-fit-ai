'use client';

import React, { useEffect } from 'react';
import { FittingRoom } from '@/components/FittingRoom';
import { useStore } from '@/store/useStore';

export default function MasterpiecePage() {
  const setSelectedBrand = useStore((state) => state.setSelectedBrand);
  const setSelectedItem = useStore((state) => state.setSelectedItem);

  useEffect(() => {
    // Initialize with a brand to show UI elements
    setSelectedBrand('gucci');
    // We can also select a mode if needed
    useStore.getState().setSelectedMode('digital-twin');
  }, [setSelectedBrand, setSelectedItem]);

  return (
    <div className="w-full h-screen">
      <FittingRoom />
    </div>
  );
}
