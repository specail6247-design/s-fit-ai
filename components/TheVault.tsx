'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Image from 'next/image';

export default function TheVault() {
  const { savedLooks, removeLook, isVaultOpen, setVaultOpen } = useStore();

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 z-[100] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-white text-lg font-bold tracking-[0.2em] uppercase">The Vault</h2>
                <p className="text-zinc-500 text-xs tracking-widest uppercase mt-1">Digital Wardrobe</p>
              </div>
              <button
                onClick={() => setVaultOpen(false)}
                className="text-white hover:text-zinc-400 transition-colors"
                aria-label="Close Vault"
              >
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {savedLooks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <span className="material-symbols-outlined text-4xl mb-4">wardrobe</span>
                  <p className="text-sm tracking-widest uppercase">Your vault is empty</p>
                  <p className="text-xs text-zinc-500 mt-2">Save pieces to compare and build your collection.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {savedLooks.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group relative flex gap-4 bg-[#1a1a1a] rounded-xl p-4 border border-white/5 hover:border-white/20 transition-colors"
                    >
                      <div className="relative size-20 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1">{item.brand}</p>
                        <h3 className="text-white text-sm font-medium truncate mb-2">{item.name}</h3>
                        <p className="text-[#ecab13] text-sm font-bold">
                          {item.currency === 'USD' ? '$' : ''}{item.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => removeLook(item.id)}
                        className="absolute top-2 right-2 size-8 flex items-center justify-center text-zinc-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded-full hover:bg-white/10"
                        aria-label="Remove item"
                      >
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">delete</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {savedLooks.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
                <button className="w-full bg-white text-black h-12 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-zinc-200 transition-colors">
                  Compare Collection
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
