"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getItemById } from '@/data/mockData';

export default function TheVault() {
  const { savedLooks, removeFromVault, isVaultOpen, setVaultOpen } = useStore();

  const savedItems = savedLooks
    .map((id) => getItemById(id))
    .filter((item) => item !== undefined);

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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[60] w-full max-w-sm bg-[#101622] text-white shadow-2xl border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#101622]">
              <div>
                <h2 className="text-xl font-bold tracking-widest uppercase text-[#D4AF37] font-serif">The Vault</h2>
                <p className="text-xs text-white/50 mt-1 uppercase tracking-wide">Your Curated Collection</p>
              </div>
              <button
                onClick={() => setVaultOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {savedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/30 space-y-4">
                  <span className="material-symbols-outlined text-5xl font-thin">checkroom</span>
                  <p className="text-sm uppercase tracking-wide">Your vault is empty</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {savedItems.map((item) => (
                    <motion.div
                      key={item!.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative group bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 p-3">
                        <div className="size-20 shrink-0 bg-white/10 rounded-lg overflow-hidden relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item!.imageUrl} alt={item!.name} className="w-full h-full object-cover" />
                          {item!.locked && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="material-symbols-outlined text-[#D4AF37] text-lg">lock</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-[#D4AF37] uppercase mb-1">{item!.brand}</p>
                          <h3 className="text-sm font-medium truncate text-white">{item!.name}</h3>
                          <p className="text-xs text-white/60 mt-1">{item!.currency} {item!.price.toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => removeFromVault(item!.id)}
                          className="p-2 text-white/30 hover:text-red-400 transition-colors self-start"
                          title="Remove from Vault"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-[#0a0e17]">
               <button className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-[#b5952f] transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                 <span className="material-symbols-outlined text-lg">compare_arrows</span>
                 Compare Selections ({savedItems.length})
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
