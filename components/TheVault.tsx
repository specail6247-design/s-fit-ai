'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getItemById, ClothingItem } from '@/data/mockData';

const getCategoryIcon = (category: ClothingItem['category']) => {
  switch (category) {
    case 'tops': return '👔';
    case 'bottoms': return '👖';
    case 'outerwear': return '🧥';
    case 'dresses': return '👗';
    case 'accessories': return '👜';
    default: return '👔';
  }
};

export default function TheVault() {
  const {
    isVaultOpen,
    setVaultOpen,
    savedItemIds,
    toggleSavedItem,
    setSelectedItem
  } = useStore();

  const savedItems = savedItemIds
    .map(id => getItemById(id))
    .filter((item): item is ClothingItem => !!item);

  return (
    <AnimatePresence>
      {isVaultOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVaultOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">The Vault</h2>
                <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest">Digital Wardrobe • {savedItems.length} Items</p>
              </div>
              <button
                onClick={() => setVaultOpen(false)}
                className="size-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {savedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
                  <span className="text-4xl mb-4">🔒</span>
                  <p className="text-white font-bold mb-2">Your Vault is Empty</p>
                  <p className="text-xs text-zinc-400">Save items from the Fitting Room to build your personal collection.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {savedItems.map((item) => (
                    <div
                      key={item.id}
                      className="group relative aspect-[3/4] bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all"
                    >
                      {/* Image */}
                      <div className="absolute inset-0 p-4 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 200px"
                            unoptimized
                          />
                        </div>
                      </div>

                      {/* Info Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-8">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{getCategoryIcon(item.category)}</span>
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{item.brand}</span>
                        </div>
                        <p className="text-xs text-white font-medium truncate mb-2">{item.name}</p>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setVaultOpen(false);
                            }}
                            className="flex-1 bg-white text-black text-[10px] font-bold py-1.5 rounded hover:bg-zinc-200 transition-colors"
                          >
                            TRY ON
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSavedItem(item.id);
                            }}
                            className="size-7 flex items-center justify-center bg-white/10 text-white hover:bg-red-500/20 hover:text-red-500 rounded transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </div>

                      {/* Luxury Badge */}
                      {item.isLuxury && (
                        <div className="absolute top-2 right-2 bg-[#ecab13] text-black text-[8px] font-bold px-1.5 py-0.5 rounded">
                          LUXURY
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-[#0a0a0a]">
              <button className="w-full py-3 bg-zinc-800 text-zinc-400 text-xs font-bold rounded-xl hover:bg-zinc-700 hover:text-white transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">ios_share</span>
                Share Collection
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
