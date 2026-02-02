'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

interface TheVaultProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TheVault({ isOpen, onClose }: TheVaultProps) {
  const { savedLooks, removeLook, setSelectedItem } = useStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-widest uppercase">The Vault</h2>
                <p className="text-xs text-zinc-500 mt-1">Your Curated Collection</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {savedLooks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-zinc-600">
                  <span className="text-4xl mb-4 opacity-30">💎</span>
                  <p className="text-sm font-medium">Your vault is empty</p>
                  <p className="text-xs mt-2 max-w-[200px]">Save your favorite looks here to compare and revisit later.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedLooks.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group relative bg-zinc-900/50 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all"
                    >
                      <div className="flex p-3 gap-4">
                        {/* Image */}
                        <div className="relative w-20 h-24 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                           <Image
                             src={item.imageUrl}
                             alt={item.name}
                             fill
                             className="object-contain p-2"
                             unoptimized
                           />
                           {item.isLuxury && (
                             <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                           )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{item.brand}</span>
                              <span className="text-xs text-white font-bold">${item.price}</span>
                            </div>
                            <h3 className="text-sm text-white font-medium leading-tight mt-1 line-clamp-2">{item.name}</h3>
                          </div>

                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() => { setSelectedItem(item); onClose(); }}
                              className="flex-1 py-1.5 bg-white/10 hover:bg-white/20 rounded text-[10px] font-bold uppercase tracking-wider text-white transition-colors"
                            >
                              Try On
                            </button>
                            <button
                              onClick={() => removeLook(item.id)}
                              className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                              title="Remove from Vault"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Stats */}
            {savedLooks.length > 0 && (
              <div className="p-4 bg-zinc-900/80 border-t border-white/10 backdrop-blur text-center">
                 <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                   Total Value: <span className="text-white font-bold">${savedLooks.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
                 </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
