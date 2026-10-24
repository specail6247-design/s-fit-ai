'use client';

import React from 'react';
import { getLuxuryItems, ClothingItem } from '@/data/mockData';

interface Props {
  selectedGarment: ClothingItem | null;
  setSelectedGarment: (item: ClothingItem | null) => void;
  selectedAccessory: ClothingItem | null;
  setSelectedAccessory: (item: ClothingItem | null) => void;
}

export function BrandAccessorySelector({
  selectedGarment,
  setSelectedGarment,
  selectedAccessory,
  setSelectedAccessory
}: Props) {
  const luxuryItems = getLuxuryItems();
  const garments = luxuryItems.filter(item => item.category !== 'accessories');
  const accessories = luxuryItems.filter(item => item.category === 'accessories');

  return (
    <div className="space-y-8">
      {/* Garments Selection */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#C9B037]/20 pb-2">
          <h3 className="text-[#C9B037] text-xs font-bold tracking-[0.2em] uppercase">02. The Garment</h3>
          <span className="text-[#F4E4BC]/50 text-xs">{garments.length} pieces</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {garments.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedGarment(item)}
              className={`relative flex-shrink-0 w-32 aspect-[3/4] border transition-all duration-700 group overflow-hidden ${
                selectedGarment?.id === item.id
                  ? 'border-[#C9B037] shadow-[0_0_20px_rgba(201,176,55,0.2)]'
                  : 'border-[#333] hover:border-[#C9B037]/50'
              }`}
            >
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <p className="text-[#C9B037] text-[9px] font-bold tracking-widest uppercase truncate">{item.brand}</p>
                <p className="text-white text-xs truncate">{item.name}</p>
              </div>
              {selectedGarment?.id === item.id && (
                <div className="absolute top-2 right-2 size-4 bg-[#C9B037] flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-[10px] text-black">check</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Accessory Selection */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#C9B037]/20 pb-2">
          <h3 className="text-[#C9B037] text-xs font-bold tracking-[0.2em] uppercase">03. Accessory Layer</h3>
          <span className="text-[#F4E4BC]/50 text-xs">{accessories.length} pieces</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {accessories.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedAccessory(selectedAccessory?.id === item.id ? null : item)}
              className={`relative flex-shrink-0 w-24 aspect-square border transition-all duration-700 group overflow-hidden ${
                selectedAccessory?.id === item.id
                  ? 'border-[#C9B037] shadow-[0_0_20px_rgba(201,176,55,0.2)]'
                  : 'border-[#333] hover:border-[#C9B037]/50'
              }`}
            >
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <p className="text-[#C9B037] text-[8px] font-bold tracking-widest uppercase truncate">{item.brand}</p>
              </div>
              {selectedAccessory?.id === item.id && (
                <div className="absolute top-2 right-2 size-4 bg-[#C9B037] flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-[10px] text-black">check</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
