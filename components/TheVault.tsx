'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { ClothingItem } from '@/data/mockData';

interface TheVaultProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TheVault({ isOpen, onClose }: TheVaultProps) {
  const { savedItems, unsaveItem, setSelectedItem } = useStore();

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
            className="fixed right-0 top-0 bottom-0 w-80 bg-charcoal border-l border-border-color z-50 p-6 shadow-2xl overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold uppercase tracking-wider text-pure-white flex items-center gap-2">
                <span>🗄️</span> The Vault
              </h2>
              <button onClick={onClose} className="text-soft-gray hover:text-pure-white transition-colors">
                ✕
              </button>
            </div>

            {savedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <span className="text-4xl mb-4 opacity-20">🧥</span>
                <p className="text-soft-gray text-sm">Your vault is empty.</p>
                <p className="text-soft-gray/50 text-xs mt-1">Save items to build your digital wardrobe.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedItems.map((item) => (
                  <div key={item.id} className="relative group bg-void-black/50 border border-border-color rounded-xl p-3 flex gap-3 hover:border-cyber-lime/50 transition-colors">
                    <div className="relative w-16 h-20 flex-shrink-0 bg-charcoal/50 rounded-lg overflow-hidden cursor-pointer" onClick={() => { setSelectedItem(item); onClose(); }}>
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain"
                        sizes="64px"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-soft-gray uppercase tracking-wider mb-1">{item.brand}</p>
                        <h3 className="text-sm font-bold text-pure-white line-clamp-2 cursor-pointer hover:text-cyber-lime" onClick={() => { setSelectedItem(item); onClose(); }}>
                          {item.name}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-cyber-lime font-mono">${item.price}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); unsaveItem(item.id); }}
                          className="text-soft-gray hover:text-red-400 text-xs transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-border-color">
                <p className="text-[10px] text-soft-gray/60 text-center uppercase tracking-widest">S_FIT AI Digital Wardrobe</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
