'use client';

import React, { useState } from 'react';
import LuxuryGarmentDetail from '@/components/LuxuryGarmentDetail';
import { getAllItems, ClothingItem } from '@/data/mockData';

export default function LuxuryPage() {
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);

  // Just grab the first luxury item for demo purposes
  const luxuryItem = getAllItems().find(item => item.brand === 'Gucci' || item.brand === 'Chanel' || item.brand === 'Tiffany') || getAllItems()[0];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <h1 className="text-3xl font-display mb-8">Luxury Collection</h1>
      <button
        onClick={() => setSelectedItem(luxuryItem)}
        className="px-6 py-3 border border-white/20 hover:bg-white/10 rounded-xl"
      >
        View {luxuryItem.brand} Item
      </button>

      {selectedItem && (
        <LuxuryGarmentDetail
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onTryOn={() => alert('Virtual Try-On Triggered')}
        />
      )}
    </div>
  );
}
