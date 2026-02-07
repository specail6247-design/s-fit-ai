'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Image from 'next/image';

export default function TheVault() {
  const { isVaultOpen, setIsVaultOpen, savedLooks, removeFromVault, setSelectedItem } = useStore();

  return (
    <AnimatePresence>
      {isVaultOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVaultOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-[#0a0a0a] border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-void-black to-charcoal">
              <div>
                <h2 className="text-xl font-bold text-white font-serif tracking-wider">The Vault</h2>
                <p className="text-[10px] text-soft-gray uppercase tracking-widest mt-1">Digital Wardrobe</p>
              </div>
              <button
                onClick={() => setIsVaultOpen(false)}
                className="text-soft-gray hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyber-lime/20 scrollbar-track-transparent">
              {savedLooks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <span className="text-4xl mb-4 text-soft-gray">🔒</span>
                  <p className="text-sm text-soft-gray font-medium">Your vault is empty.</p>
                  <p className="text-[10px] text-soft-gray mt-2 max-w-[200px]">Save your favorite fits to build your digital wardrobe.</p>
                </div>
              ) : (
                savedLooks.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.id}
                    className="relative group bg-white/5 rounded-xl border border-white/5 overflow-hidden flex items-center gap-3 p-2 hover:border-cyber-lime/30 transition-colors"
                  >
                    <div className="relative w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{item.name}</p>
                      <p className="text-[10px] text-soft-gray truncate">{item.brand}</p>
                      <p className="text-[10px] text-cyber-lime font-mono mt-1">${item.price}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <button
                          onClick={() => { setSelectedItem(item); setIsVaultOpen(false); }}
                          className="p-1.5 rounded bg-white/10 hover:bg-cyber-lime hover:text-black transition-colors text-[10px]"
                          title="Try On"
                        >
                          👕
                        </button>
                        <button
                          onClick={() => removeFromVault(item.id)}
                          className="p-1.5 rounded bg-white/10 hover:bg-red-500 hover:text-white transition-colors text-[10px]"
                          title="Remove"
                        >
                          🗑️
                        </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {savedLooks.length > 0 && (
              <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-md">
                <button className="w-full py-3 rounded-lg bg-cyber-lime text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_15px_rgba(204,255,0,0.2)]">
                  Compare All ({savedLooks.length})
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
