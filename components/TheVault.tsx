'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getItemById } from '@/data/mockData';
import Image from 'next/image';

export default function TheVault() {
  const { isVaultOpen, setVaultOpen, savedItemIds, toggleSavedItem, setSelectedItem } = useStore();

  const savedItems = savedItemIds
    .map((id) => getItemById(id))
    .filter((item): item is NonNullable<typeof item> => !!item);

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
            className="fixed inset-0 bg-void-black/80 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold font-serif text-white">The Vault</h2>
                <p className="text-[10px] uppercase tracking-widest text-soft-gray">Digital Wardrobe</p>
              </div>
              <button
                onClick={() => setVaultOpen(false)}
                className="text-soft-gray hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {savedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-soft-gray">
                  <span className="text-4xl mb-4">🧥</span>
                  <p className="text-sm">Your vault is empty.</p>
                  <p className="text-xs opacity-60 mt-1">Save looks to compare them here.</p>
                </div>
              ) : (
                savedItems.map((item) => (
                  <div key={item.id} className="relative group bg-void-black border border-white/10 rounded-xl overflow-hidden hover:border-cyber-lime/50 transition-colors">
                    <div className="flex p-3 gap-3">
                      <div className="relative w-20 h-24 bg-charcoal/30 rounded-lg overflow-hidden flex-shrink-0">
                         {item.imageUrl ? (
                           <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-contain p-1"
                              sizes="80px"
                              unoptimized
                           />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500 text-xs">
                             No Image
                           </div>
                         )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                           <div className="flex justify-between items-start">
                             <p className="text-xs text-soft-gray uppercase">{item.brand}</p>
                             {item.isLuxury && <span className="text-[10px] text-luxury-gold">✦ Luxury</span>}
                           </div>
                           <h3 className="text-sm font-bold text-white leading-tight mt-0.5">{item.name}</h3>
                        </div>
                        <div className="flex justify-between items-end">
                          <p className="text-xs text-white">${item.price}</p>
                          <div className="flex gap-2">
                            <button
                               onClick={() => toggleSavedItem(item.id)}
                               className="text-xs text-soft-gray hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-white/5"
                            >
                              Remove
                            </button>
                            <button
                               onClick={() => {
                                 setSelectedItem(item);
                                 setVaultOpen(false);
                               }}
                               className="text-xs bg-white text-black px-3 py-1 rounded font-bold hover:bg-cyber-lime transition-colors"
                            >
                              Wear
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-[#0a0a0a]">
               <div className="flex justify-between items-center text-xs text-soft-gray mb-2">
                 <span>Total Value</span>
                 <span className="text-white font-bold">${savedItems.reduce((acc, item) => acc + item.price, 0).toLocaleString()}</span>
               </div>
               <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors">
                 Compare All
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
