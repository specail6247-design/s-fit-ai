'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function VaultDrawer() {
  const { vaultItems, isVaultOpen, setVaultOpen, removeFromVault } = useStore();

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
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[101] w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-white text-lg font-bold tracking-widest uppercase">The Vault</h2>
                <p className="text-[#ecab13] text-xs font-mono mt-1">Digital Wardrobe</p>
              </div>
              <button
                onClick={() => setVaultOpen(false)}
                className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {vaultItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-center space-y-4">
                  <span className="material-symbols-outlined text-4xl">inventory_2</span>
                  <p className="text-sm">Your vault is empty.<br/>Save looks to compare and curate.</p>
                </div>
              ) : (
                vaultItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5 relative group"
                  >
                    <div className="w-20 h-24 bg-zinc-900 rounded-lg overflow-hidden shrink-0 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col flex-1 justify-between py-1">
                      <div>
                        <p className="text-xs text-zinc-400 uppercase tracking-widest">{item.brand}</p>
                        <p className="text-sm font-bold text-white line-clamp-2 leading-snug">{item.name}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[#ecab13] text-sm font-bold font-mono">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency || 'USD' }).format(item.price || 0)}
                        </p>
                        <button
                          onClick={() => removeFromVault(item.id)}
                          className="text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {vaultItems.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-zinc-400">Total Value</span>
                  <span className="text-white font-bold font-mono">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                      vaultItems.reduce((sum, item) => sum + (item.price || 0), 0)
                    )}
                  </span>
                </div>
                <button className="w-full py-3 bg-white text-black font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-zinc-200 transition-colors">
                  Checkout Selected
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
