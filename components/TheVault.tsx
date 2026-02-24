'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function TheVault() {
  const { isVaultOpen, setVaultOpen, vaultItems, removeFromVault } = useStore();

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
            className="fixed right-0 top-0 z-[101] h-full w-full max-w-md bg-[#0a0a0a] border-l border-[#2d2d2d] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#2d2d2d]">
              <div>
                <h2 className="text-xl font-bold text-white tracking-widest uppercase font-serif">The Vault</h2>
                <p className="text-[#ecab13] text-xs font-bold uppercase tracking-wider mt-1">Digital Wardrobe</p>
              </div>
              <button
                onClick={() => setVaultOpen(false)}
                className="size-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {vaultItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <span className="material-symbols-outlined text-6xl mb-4 text-zinc-700">checkroom</span>
                  <p className="text-zinc-500 font-medium">Your vault is empty</p>
                  <p className="text-zinc-600 text-sm mt-2 max-w-[200px]">Save items from the fitting room to compare and curate your look.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {vaultItems.map((item) => (
                    <div key={item.id} className="group relative bg-[#1a1a1a] rounded-lg border border-[#2d2d2d] overflow-hidden">
                      <div className="aspect-[3/4] relative bg-zinc-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <button
                          onClick={() => removeFromVault(item.id)}
                          className="absolute top-2 right-2 size-8 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                          title="Remove from Vault"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                      <div className="p-3">
                        <p className="text-[#ecab13] text-[10px] font-bold uppercase tracking-wider mb-1">{item.brand}</p>
                        <h3 className="text-white text-xs font-bold leading-tight line-clamp-2">{item.name}</h3>
                        <p className="text-zinc-400 text-xs mt-2 font-mono">
                          {item.currency} {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#2d2d2d] bg-[#0a0a0a]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-zinc-500 text-xs uppercase tracking-widest">Total Value</span>
                <span className="text-white font-mono font-bold">
                  {vaultItems.length > 0 ? vaultItems[0].currency : '$'}
                  {vaultItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                </span>
              </div>
              <button
                disabled={vaultItems.length === 0}
                className="w-full h-12 bg-[#ecab13] text-black font-bold uppercase tracking-widest rounded-lg hover:bg-[#d49a11] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Compare Selection
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
