'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getItemById, getCategoryIcon } from '@/data/mockData';
import Image from 'next/image';

export function TheVault() {
  const { savedLooks, isVaultOpen, setVaultOpen, removeSavedLook, setSelectedItem } = useStore();

  const handleClose = () => setVaultOpen(false);

  return (
    <AnimatePresence>
      {isVaultOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-void-black border-l border-border-color shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border-color flex justify-between items-center bg-charcoal/20">
              <div>
                <h2 className="text-xl font-[family-name:var(--font-display)] font-bold text-pure-white flex items-center gap-2">
                  <span className="text-cyber-lime">✦</span> The Vault
                </h2>
                <p className="text-xs text-soft-gray mt-1">Your Curated Digital Wardrobe</p>
              </div>
              <button
                onClick={handleClose}
                className="text-soft-gray hover:text-white transition-colors p-2"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {savedLooks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-soft-gray opacity-50 space-y-4">
                  <span className="text-4xl">🧥</span>
                  <p className="text-sm">Your vault is empty.</p>
                  <p className="text-xs">Save looks to build your collection.</p>
                </div>
              ) : (
                savedLooks.map((id) => {
                  const item = getItemById(id);
                  if (!item) return null;

                  return (
                    <motion.div
                      key={id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group relative bg-charcoal/40 border border-white/5 rounded-xl overflow-hidden hover:border-cyber-lime/30 transition-all"
                    >
                      <div className="flex h-24">
                        <div className="w-24 relative bg-white/5">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 p-3 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="text-sm font-bold text-white line-clamp-1">{item.name}</h3>
                              <span className="text-xs text-soft-gray">{getCategoryIcon(item.category)}</span>
                            </div>
                            <p className="text-xs text-soft-gray">{item.brand}</p>
                          </div>
                          <div className="flex justify-between items-end">
                            <span className="text-xs text-cyber-lime font-mono">${item.price}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => removeSavedLook(id)}
                                className="p-1.5 text-soft-gray hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                                title="Remove from Vault"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedItem(item);
                                  handleClose();
                                }}
                                className="px-3 py-1 bg-cyber-lime/10 hover:bg-cyber-lime/20 text-cyber-lime text-[10px] font-bold uppercase tracking-wider rounded border border-cyber-lime/30 transition-all"
                              >
                                Try On
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {savedLooks.length > 0 && (
                <div className="p-4 border-t border-border-color bg-charcoal/20 text-center">
                    <p className="text-[10px] text-soft-gray uppercase tracking-widest">
                        {savedLooks.length} Items in Vault
                    </p>
                </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
