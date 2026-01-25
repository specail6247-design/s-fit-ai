'use client';

import { FittingRoom } from '@/components/FittingRoom';
import { useStore } from '@/store/useStore';
import { useEffect } from 'react';
import { mockClothingItems } from '@/data/mockData';

export default function VerifyVoicePage() {
  const { setSelectedItem, setSelectedBrand, setSelectedMode } = useStore();

  useEffect(() => {
    // Setup initial state for verification
    setSelectedBrand('Gucci');
    setSelectedItem(mockClothingItems[5]); // Pick a Gucci item
    setSelectedMode('digital-twin');
  }, []);

  return (
    <div className="h-screen w-screen">
      <FittingRoom />
    </div>
  );
}
