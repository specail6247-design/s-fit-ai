'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ClothingItem } from '@/data/mockData';

export default function TheVault() {
  const { savedLooks, isVaultOpen, toggleVault, removeFromVault } = useStore();

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
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl p-6 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light text-white tracking-wider">THE VAULT</h2>
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em] mt-1">Digital Wardrobe ({savedLooks.length})</p>
              </div>
              <button
                onClick={toggleVault}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {savedLooks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <span className="material-symbols-outlined text-4xl opacity-50">checkroom</span>
                  <p className="text-sm uppercase tracking-widest">Your Vault is Empty</p>
                </div>
              ) : (
                savedLooks.map((item) => (
                  <div key={item.id} className="group relative bg-white/5 border border-white/10 rounded-xl p-3 flex gap-4 hover:bg-white/10 transition-colors">
                    <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[#ecab13] font-bold uppercase tracking-wider mb-1">{item.brand}</p>
                      <h3 className="text-sm font-medium text-white truncate">{item.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">${item.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => removeFromVault(item.id)}
                      className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Actions */}
            <div className="mt-6 space-y-3 pt-6 border-t border-white/10">
              <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors rounded-lg flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">compare_arrows</span>
                Compare Selection
              </button>
              <button className="w-full py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors rounded-lg">
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
