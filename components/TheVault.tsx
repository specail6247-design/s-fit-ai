'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Image from 'next/image';
import { getCategoryIcon } from './FittingRoom';

interface TheVaultProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TheVault({ isOpen, onClose }: TheVaultProps) {
  const { savedLooks, removeLook, setSelectedItem } = useStore();

  const handleSelect = (item: any) => {
    setSelectedItem(item);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-widest uppercase">The Vault</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Digital Wardrobe • {savedLooks.length} Items</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {savedLooks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                   <span className="text-4xl opacity-20">inventory_2</span>
                   <p className="text-xs uppercase tracking-widest text-center">Your vault is empty.<br/>Save looks to compare later.</p>
                </div>
              ) : (
                savedLooks.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group relative overflow-hidden"
                  >
                     <div className="w-20 aspect-[3/4] relative bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                        {item.imageUrl ? (
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                                {getCategoryIcon(item.category)}
                            </div>
                        )}
                     </div>

                     <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                            <div className="flex justify-between items-start">
                                <span className="text-[9px] uppercase tracking-widest text-gray-400">{item.brand}</span>
                                <span className="text-xs font-bold text-cyber-lime">${item.price}</span>
                            </div>
                            <h3 className="text-sm font-bold text-white leading-tight mt-1">{item.name}</h3>
                        </div>

                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={() => handleSelect(item)}
                                className="flex-1 py-2 bg-white/10 hover:bg-cyber-lime hover:text-black rounded text-[10px] font-bold uppercase tracking-wider transition-colors"
                            >
                                Try On
                            </button>
                            <button
                                onClick={() => removeLook(item.id)}
                                className="px-3 py-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded text-gray-400 transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                        </div>
                     </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/20">
                <button className="w-full py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-gray-200 transition-colors">
                    Checkout All
                </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
