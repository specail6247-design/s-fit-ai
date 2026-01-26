'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getItemById, ClothingItem } from '@/data/mockData';
import Image from 'next/image';

interface VaultDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VaultDrawer({ isOpen, onClose }: VaultDrawerProps) {
  const { vaultItemIds, removeFromVault, setSelectedItem } = useStore();

  const vaultItems = vaultItemIds
    .map((id) => getItemById(id))
    .filter((item): item is ClothingItem => !!item);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-void-black/90 border-l border-white/10 z-50 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div>
                <h2 className="text-xl font-bold text-white tracking-wider uppercase">The Vault</h2>
                <p className="text-xs text-soft-gray mt-1">Your Digital Wardrobe</p>
              </div>
              <button
                onClick={onClose}
                className="text-soft-gray hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {vaultItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-soft-gray opacity-50">
                  <span className="text-4xl mb-2">🧥</span>
                  <p className="text-sm">Your vault is empty</p>
                  <p className="text-xs">Save looks to access them here</p>
                </div>
              ) : (
                vaultItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative group bg-white/5 rounded-xl border border-white/10 p-3 hover:border-cyber-lime/50 transition-all"
                  >
                    <div className="flex gap-3">
                      {/* Image */}
                      <div
                        className="relative w-20 h-20 bg-charcoal/50 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                        onClick={() => {
                            setSelectedItem(item);
                            onClose();
                        }}
                      >
                         <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-contain p-1"
                            sizes="80px"
                            unoptimized
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                         <div>
                            <p className="text-xs text-cyber-lime font-bold uppercase tracking-wider mb-1">{item.brand}</p>
                            <h3 className="text-sm font-medium text-white truncate">{item.name}</h3>
                            <p className="text-xs text-soft-gray mt-1">{item.currency} {item.price}</p>
                         </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex gap-2">
                         <button
                            onClick={() => {
                                setSelectedItem(item);
                                onClose();
                            }}
                            className="flex-1 bg-white/10 hover:bg-cyber-lime hover:text-black text-white text-[10px] font-bold py-1.5 rounded transition-colors uppercase tracking-wide"
                         >
                            Try On
                         </button>
                         <button
                            onClick={() => removeFromVault(item.id)}
                            className="px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded transition-colors"
                            title="Remove from Vault"
                         >
                            🗑
                         </button>
                    </div>

                    {/* Locked Badge (if item becomes locked later) */}
                    {item.lockedUntil && new Date(item.lockedUntil) > new Date() && (
                        <div className="absolute top-2 right-2 text-xs">🔒</div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {vaultItems.length > 0 && (
                <div className="p-4 border-t border-white/10 bg-white/5 text-center">
                    <p className="text-[10px] text-soft-gray uppercase tracking-widest">{vaultItems.length} ITEMS SAVED</p>
                </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
