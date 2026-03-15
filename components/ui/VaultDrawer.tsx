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
            key="vault-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVaultOpen(false)}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="vault-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm bg-[#0a0a0a] border-l border-[#2d2d2d] shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-white text-lg font-bold tracking-[0.2em] uppercase">The Vault</h2>
                  <p className="text-zinc-500 text-xs mt-1">Digital Wardrobe</p>
                </div>
                <button
                  onClick={() => setVaultOpen(false)}
                  className="size-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              {vaultItems.length === 0 ? (
                <div className="text-center py-20">
                  <span className="material-symbols-outlined text-zinc-600 text-5xl mb-4">wardrobe</span>
                  <p className="text-zinc-400 text-sm">Your vault is empty.</p>
                  <p className="text-zinc-600 text-xs mt-2">Save looks to compare luxury items.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {vaultItems.map((item) => (
                    <div key={item.id} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#2d2d2d] flex flex-col group">
                      <div className="relative aspect-[4/3] w-full bg-zinc-900">
                        {/* Use object-cover with top position to show garment nicely */}
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover object-top"
                        />
                        <button
                          onClick={() => removeFromVault(item.id)}
                          className="absolute top-2 right-2 size-8 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80 backdrop-blur-md"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                        {item.isLuxury && (
                           <div className="absolute bottom-2 left-2 bg-[#ecab13] text-black px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">
                             Luxury
                           </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-1">{item.brand}</p>
                        <h3 className="text-white text-sm font-semibold truncate">{item.name}</h3>
                        <p className="text-white font-mono mt-2 text-xs">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency }).format(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
