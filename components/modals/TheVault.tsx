'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function TheVault() {
  const { savedItems, isVaultOpen, setVaultOpen, removeSavedItem } = useStore();

  return (
    <AnimatePresence>
      {isVaultOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setVaultOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[101] h-full w-full max-w-sm bg-[#0a0a0a] border-l border-[#2d2d2d] shadow-2xl flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#2d2d2d]">
              <h2 className="text-white text-lg font-bold tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-cinzel), serif' }}>The Vault</h2>
              <button
                onClick={() => setVaultOpen(false)}
                className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {savedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <span className="material-symbols-outlined text-4xl mb-4 text-[#ecab13]">inventory_2</span>
                  <p className="text-white text-sm">Your vault is empty.</p>
                  <p className="text-zinc-500 text-xs mt-2">Save items here to compare luxury looks.</p>
                </div>
              ) : (
                savedItems.map((item) => (
                  <div key={item.id} className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 flex gap-4 relative group">
                    <div
                      className="w-20 h-24 bg-zinc-800 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                    />
                    <div className="flex flex-col justify-center flex-1">
                      <p className="text-[#ecab13] text-[10px] font-bold tracking-widest uppercase mb-1">{item.brand}</p>
                      <h3 className="text-white text-sm font-semibold mb-1 truncate w-40">{item.name}</h3>
                      <p className="text-zinc-400 text-xs">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: item.currency || 'USD',
                        }).format(item.price || 0)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeSavedItem(item.id)}
                      className="absolute top-2 right-2 size-6 flex items-center justify-center rounded bg-black/50 text-white/50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-xs">delete</span>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {savedItems.length > 0 && (
              <div className="p-6 border-t border-[#2d2d2d]">
                <button
                  className="w-full h-12 rounded-xl bg-white text-black font-bold text-xs tracking-widest uppercase hover:bg-zinc-200 transition-colors"
                >
                  Compare Looks ({savedItems.length})
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
