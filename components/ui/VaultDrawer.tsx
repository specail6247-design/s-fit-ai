'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getItemById } from '@/data/mockData';
import Image from 'next/image';

export function VaultDrawer() {
  const { isVaultOpen, setVaultOpen, vaultItems, removeFromVault, setSelectedItem } = useStore();

  return (
    <AnimatePresence>
      {isVaultOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setVaultOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-void-black border-l border-white/10 z-50 p-6 shadow-2xl overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold font-serif tracking-widest text-white">THE VAULT</h2>
              <button onClick={() => setVaultOpen(false)} className="text-soft-gray hover:text-white">
                ✕
              </button>
            </div>

            {vaultItems.length === 0 ? (
              <div className="text-center text-soft-gray mt-20">
                <p className="text-4xl mb-4">🕸️</p>
                <p>Your vault is empty.</p>
                <p className="text-xs mt-2">Save your favorite looks here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {vaultItems.map((id) => {
                  const item = getItemById(id);
                  if (!item) return null;
                  return (
                    <div key={id} className="relative group bg-charcoal/30 border border-white/5 rounded-xl p-3 flex gap-3 items-center hover:border-cyber-lime/30 transition-colors">
                      <div className="relative w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{item.name}</p>
                        <p className="text-[10px] text-soft-gray">{item.brand}</p>
                        <button
                          onClick={() => { setSelectedItem(item); setVaultOpen(false); }}
                          className="mt-2 text-[10px] text-cyber-lime hover:underline"
                        >
                          Try On
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromVault(id)}
                        className="absolute top-2 right-2 text-soft-gray hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove from Vault"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
