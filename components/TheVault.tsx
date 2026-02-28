'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function TheVault() {
  const { isVaultOpen, setVaultOpen, savedLooks } = useStore();

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
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#101622] text-white z-[70] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] border-l border-[#314368]/50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#314368]/50">
              <div>
                <h2 className="text-xl font-bold tracking-tight">The Vault</h2>
                <p className="text-xs text-[#90a4cb] uppercase tracking-widest mt-1">Your Saved Looks</p>
              </div>
              <button
                onClick={() => setVaultOpen(false)}
                className="flex size-10 items-center justify-center rounded-full bg-[#314368]/30 hover:bg-[#314368]/50 transition-colors"
                aria-label="Close Vault"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {savedLooks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <span className="material-symbols-outlined text-4xl mb-4">wardrobe</span>
                  <p className="text-sm">Your vault is empty.</p>
                  <p className="text-xs text-[#90a4cb] mt-2">Save items during fitting to compare.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedLooks.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3 rounded-xl border border-[#314368]/30 bg-[#161f30]/80 hover:bg-[#1c273c] transition-colors"
                    >
                      <div className="w-20 h-24 shrink-0 rounded-lg bg-[#0a0f18] overflow-hidden relative">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {item.isLuxury && (
                          <div className="absolute top-1 left-1 bg-[#ecab13] text-black text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                            Luxury
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-center flex-1">
                        <p className="text-xs font-bold text-[#ecab13] uppercase tracking-widest mb-1">{item.brand}</p>
                        <h3 className="text-sm font-medium leading-tight line-clamp-2">{item.name}</h3>
                        <p className="text-[#90a4cb] text-xs mt-2 font-mono">
                          {item.currency === 'USD' ? '$' : item.currency}{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {savedLooks.length > 0 && (
              <div className="p-6 border-t border-[#314368]/50">
                <button className="w-full h-12 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                  <span className="material-symbols-outlined text-sm">compare</span>
                  Compare Mode
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
