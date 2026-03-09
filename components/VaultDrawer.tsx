'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function VaultDrawer() {
  const { vaultItems, removeFromVault, isVaultOpen, setVaultOpen } = useStore();

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
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm bg-[#0a0a0a] border-l border-[#2d2d2d] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#2d2d2d]">
              <h2 className="text-white text-sm font-bold tracking-[0.2em] uppercase">The Vault</h2>
              <button
                onClick={() => setVaultOpen(false)}
                className="size-8 flex items-center justify-center text-zinc-500 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close Vault"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {vaultItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <span className="material-symbols-outlined text-4xl text-zinc-700">inventory_2</span>
                  <div>
                    <p className="text-zinc-400 text-sm">Your vault is empty</p>
                    <p className="text-zinc-600 text-xs mt-1">Save looks to compare luxury pieces.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {vaultItems.map((item) => (
                    <div key={item.id} className="group relative flex gap-4 p-3 rounded-xl border border-[#2d2d2d] bg-[#1a1a1a]/50 hover:border-[#ecab13]/50 transition-colors">
                      <div
                        className="w-20 h-24 rounded-lg bg-zinc-800 bg-cover bg-center border border-[#2d2d2d]"
                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                      />
                      <div className="flex flex-col justify-center flex-1">
                        <p className="text-[#ecab13] text-[10px] font-bold tracking-widest uppercase mb-1">{item.brand}</p>
                        <h3 className="text-white text-sm font-light leading-tight mb-2 line-clamp-2">{item.name}</h3>
                        <p className="text-white text-xs font-bold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency || 'USD' }).format(item.price)}</p>
                      </div>
                      <button
                        onClick={() => removeFromVault(item.id)}
                        className="absolute top-2 right-2 size-6 flex items-center justify-center rounded-full bg-black/50 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400"
                        aria-label="Remove item"
                      >
                        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {vaultItems.length > 0 && (
               <div className="p-6 border-t border-[#2d2d2d]">
                   <button className="w-full h-12 flex items-center justify-center bg-white text-black font-bold tracking-widest uppercase text-xs rounded-lg hover:bg-gray-200 transition-colors">
                       Compare Looks
                   </button>
               </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
