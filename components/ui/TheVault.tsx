'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function TheVault() {
  const { savedLooks, removeLook, setSelectedItem, isVaultOpen, setVaultOpen } = useStore();

  return (
    <AnimatePresence>
      {isVaultOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVaultOpen(false)}
          />
          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-80 bg-[#0a0a0a] border-l border-white/10 z-50 p-6 shadow-2xl overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🔒</span> The Vault
              </h2>
              <button
                onClick={() => setVaultOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {savedLooks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
                <span className="text-4xl mb-2">🧥</span>
                <p className="text-sm">Your wardrobe is empty.</p>
                <p className="text-xs mt-1">Save looks to compare them here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedLooks.map((item) => (
                  <div key={item.id} className="bg-white/5 rounded-xl p-3 border border-white/5 relative group hover:bg-white/10 transition-colors">
                    <button
                        onClick={(e) => { e.stopPropagation(); removeLook(item.id); }}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-10 p-1"
                    >
                        ✕
                    </button>
                    <div className="flex gap-3 cursor-pointer" onClick={() => { setSelectedItem(item); setVaultOpen(false); }}>
                        <div className="relative w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className="object-contain"
                                sizes="64px"
                                unoptimized
                            />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <p className="text-xs font-bold text-white truncate">{item.brand}</p>
                            <p className="text-xs text-gray-400 truncate">{item.name}</p>
                            <p className="text-[10px] text-lime-400 mt-1">{item.currency} {item.price}</p>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
