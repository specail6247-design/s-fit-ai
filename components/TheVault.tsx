'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Image from 'next/image';

export function TheVault() {
  const { isVaultOpen, toggleVault, savedLooks, removeLook } = useStore();

  return (
    <AnimatePresence>
      {isVaultOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleVault(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#111] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold tracking-[0.2em] uppercase text-white">The Vault</h2>
              <button
                onClick={() => toggleVault(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {savedLooks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-4">
                  <span className="material-symbols-outlined text-4xl">inventory_2</span>
                  <p className="text-sm tracking-wider uppercase text-center">Your vault is empty.<br/>Save looks to compare.</p>
                </div>
              ) : (
                savedLooks.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-4 bg-white/5 rounded-xl p-3 border border-white/5 relative group"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 bg-zinc-900 rounded-lg overflow-hidden relative shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex flex-col justify-center flex-1">
                      <p className="text-[#ecab13] text-[10px] font-bold tracking-widest uppercase mb-1">{item.brand}</p>
                      <h3 className="text-white text-sm font-medium leading-tight mb-2 line-clamp-2">{item.name}</h3>
                      <p className="text-zinc-400 text-xs font-mono">${item.price}</p>
                    </div>

                    {/* Actions */}
                    <button
                      onClick={() => removeLook(item.id)}
                      className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-zinc-400 hover:text-white hover:bg-red-500/80 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {savedLooks.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/50">
                <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-zinc-200 transition-colors">
                  Compare Selection
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
