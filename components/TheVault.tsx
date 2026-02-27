'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Image from 'next/image';

export default function TheVault() {
  const { isVaultOpen, setVaultOpen, savedLooks, removeFromVault } = useStore();

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
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md bg-[#0a0a0a] border-l border-[#2d2d2d] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#2d2d2d] flex items-center justify-between bg-[#0a0a0a]/90 backdrop-blur-md">
              <div>
                <h2 className="text-white text-lg font-bold tracking-[0.2em] uppercase">The Vault</h2>
                <p className="text-zinc-500 text-xs mt-1">Digital Wardrobe • {savedLooks.length} Items</p>
              </div>
              <button
                onClick={() => setVaultOpen(false)}
                className="size-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {savedLooks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-zinc-500">
                  <span className="material-symbols-outlined text-4xl mb-4 opacity-50">checkroom</span>
                  <p className="text-sm">Your vault is empty.</p>
                  <p className="text-xs mt-2 opacity-70">Save items while fitting to build your digital wardrobe.</p>
                </div>
              ) : (
                savedLooks.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group relative bg-[#1a1a1a] rounded-xl border border-[#2d2d2d] overflow-hidden flex"
                  >
                    {/* Image */}
                    <div className="relative w-24 aspect-[3/4] bg-zinc-800">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#ecab13]">{item.brand}</span>
                          <button
                            onClick={() => removeFromVault(item.id)}
                            className="text-zinc-500 hover:text-red-500 transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                        <h3 className="text-white text-sm font-medium leading-tight mt-1 line-clamp-2">{item.name}</h3>
                        <p className="text-zinc-400 text-xs mt-1">{item.currency} {item.price.toLocaleString()}</p>
                      </div>

                      <div className="flex gap-2 mt-2">
                         <button className="flex-1 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase py-2 rounded transition-colors">
                           Compare
                         </button>
                         <button className="flex-1 bg-[#ecab13] hover:bg-[#d49a11] text-black text-[10px] font-bold uppercase py-2 rounded transition-colors">
                           Buy Now
                         </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {savedLooks.length > 0 && (
              <div className="p-4 border-t border-[#2d2d2d] bg-[#0a0a0a]/90 backdrop-blur-md">
                 <button className="w-full h-12 bg-white text-black font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-zinc-200 transition-colors">
                   Checkout All Items
                 </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
