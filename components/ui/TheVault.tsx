'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function TheVault() {
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
            onClick={toggleVault}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#0a0a0a] border-l border-[#2d2d2d] z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#2d2d2d] flex justify-between items-center bg-[#0a0a0a]">
              <div>
                <h2 className="text-[#ecab13] text-lg font-serif tracking-wider uppercase">The Vault</h2>
                <p className="text-xs text-zinc-500 font-sans tracking-widest uppercase">Digital Wardrobe</p>
              </div>
              <button
                onClick={toggleVault}
                className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {savedLooks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4">
                  <span className="material-symbols-outlined text-4xl">checkroom</span>
                  <p className="text-sm font-sans uppercase tracking-widest">Vault is Empty</p>
                </div>
              ) : (
                savedLooks.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-4 p-3 rounded-lg bg-[#1a1a1a] border border-[#2d2d2d] group relative overflow-hidden"
                  >
                    <div className="w-20 h-24 bg-zinc-800 rounded flex items-center justify-center overflow-hidden shrink-0">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <p className="text-[#ecab13] text-[10px] uppercase font-bold tracking-wider mb-1">{item.brand}</p>
                        <h3 className="text-white text-sm font-medium leading-tight truncate">{item.name}</h3>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="text-zinc-400 text-xs">{item.currency} {item.price.toLocaleString()}</p>
                        <button
                          onClick={() => removeLook(item.id)}
                          className="text-zinc-500 hover:text-red-500 transition-colors text-xs uppercase tracking-wider font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {savedLooks.length > 0 && (
                <div className="p-6 border-t border-[#2d2d2d] bg-[#0a0a0a]">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-zinc-500 text-xs uppercase tracking-widest">Total Value</span>
                        <span className="text-white font-bold font-mono">
                            ${savedLooks.reduce((acc, item) => acc + item.price, 0).toLocaleString()}
                        </span>
                    </div>
                    <button className="w-full py-3 bg-[#ecab13] text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-[#d49a11] transition-colors">
                        Request Fitting
                    </button>
                </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
