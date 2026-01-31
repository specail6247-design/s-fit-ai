'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ClothingItem } from '@/data/mockData';

interface TheVaultProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: ClothingItem) => void;
}

const categoryIcons: Record<string, string> = {
  tops: '👔',
  bottoms: '👖',
  outerwear: '🧥',
  dresses: '👗',
  accessories: '👜',
};

export function TheVault({ isOpen, onClose, onSelect }: TheVaultProps) {
  const { savedLooks, removeLook } = useStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-void-black/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-80 bg-charcoal border-l border-white/10 z-50 shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-pure-white tracking-tight">The Vault</h2>
                <p className="text-[10px] text-soft-gray uppercase tracking-widest mt-1">Digital Wardrobe</p>
              </div>
              <button onClick={onClose} className="text-soft-gray hover:text-white transition-colors">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {savedLooks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-soft-gray opacity-50">
                  <span className="text-4xl mb-2">🧥</span>
                  <p className="text-xs">Your vault is empty.</p>
                  <p className="text-[10px]">Save looks to compare them here.</p>
                </div>
              ) : (
                savedLooks.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-void-black/50 border border-white/5 rounded-xl p-3 flex gap-3 group relative overflow-hidden cursor-pointer hover:bg-void-black/70 transition-colors"
                    onClick={() => { onSelect(item); onClose(); }}
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {categoryIcons[item.category] || '👔'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs font-bold text-pure-white truncate pr-4">{item.name}</h3>
                        <button
                            onClick={(e) => { e.stopPropagation(); removeLook(item.id); }}
                            className="text-soft-gray hover:text-red-400 transition-colors p-1 -mr-1 -mt-1"
                        >
                            <span className="text-xs">✕</span>
                        </button>
                      </div>
                      <p className="text-[10px] text-soft-gray mb-1">{item.brand}</p>
                      <div className="flex items-center gap-2">
                          <span className="text-[10px] text-cyber-lime font-mono">${item.price}</span>
                          {item.isLuxury && <span className="text-[8px] px-1.5 py-0.5 bg-luxury-gold text-void-black font-bold rounded">LUXURY</span>}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-void-black/20">
               <p className="text-[9px] text-center text-soft-gray">
                  {savedLooks.length} items stored in secure vault
               </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
