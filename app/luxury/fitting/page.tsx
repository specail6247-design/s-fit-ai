'use client';

import React, { useEffect } from 'react';
import { FittingRoom } from '@/components/FittingRoom';
import { useStore } from '@/store/useStore';
import { mockClothingItems } from '@/data/mockData';

export default function LuxuryFittingPage() {
  const { selectedItem, setSelectedItem, selectedBrand, setSelectedBrand } = useStore();

  useEffect(() => {
    // Ensure we have a luxury context initialized
    if (!selectedBrand) {
      setSelectedBrand('Gucci');
    }

    if (!selectedItem) {
      // Default to the first Gucci item (Blazer)
      const defaultItem = mockClothingItems.find(i => i.id === 'gucci-001');
      if (defaultItem) {
        setSelectedItem(defaultItem);
      }
    }
  }, [selectedBrand, selectedItem, setSelectedBrand, setSelectedItem]);

  return (
    <main className="w-full h-screen bg-black">
      <FittingRoom />
    </main>
  );
}
