'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Image from 'next/image';
import { ClothingItem } from '@/data/mockData';

interface VaultDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: ClothingItem) => void;
}

export default function VaultDrawer({ isOpen, onClose, onSelect }: VaultDrawerProps) {
  const { savedLooks, removeLook } = useStore();

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-void-black border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-charcoal/20">
              <div>
                <h2 className="text-xl font-bold text-white tracking-widest uppercase font-cinzel">The Vault</h2>
                <p className="text-[10px] text-soft-gray uppercase tracking-widest mt-1">Your Curated Collection</p>
              </div>
              <button onClick={onClose} className="text-soft-gray hover:text-white transition-colors">
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {savedLooks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-soft-gray opacity-50 space-y-4">
                  <span className="text-4xl">🔒</span>
                  <p className="text-xs uppercase tracking-widest text-center">The Vault is Empty<br/>Save looks to compare later</p>
                </div>
              ) : (
                savedLooks.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={`vault-${item.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative bg-charcoal/40 rounded-xl overflow-hidden border border-white/5 hover:border-cyber-lime/30 transition-colors"
                  >
                    <div className="flex p-3 gap-3">
                      {/* Image */}
                      <div className="relative w-20 h-24 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                         <Image
                           src={item.imageUrl}
                           alt={item.name}
                           fill
                           className="object-contain p-1"
                           sizes="80px"
                           unoptimized
                         />
                         {item.isLuxury && (
                           <div className="absolute top-1 right-1 text-[8px] text-luxury-gold">✦</div>
                         )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                             <p className="text-[10px] text-soft-gray uppercase tracking-wider">{item.brand}</p>
                             <button onClick={(e) => { e.stopPropagation(); removeLook(item.id); }} className="text-soft-gray hover:text-red-400 text-xs px-1">✕</button>
                          </div>
                          <h3 className="text-xs font-bold text-white leading-tight mt-1 line-clamp-2">{item.name}</h3>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                           <span className="text-xs font-mono text-white/80">${item.price}</span>
                           <button
                             onClick={() => { onSelect(item); onClose(); }}
                             className="text-[9px] bg-white/10 hover:bg-cyber-lime hover:text-black px-2 py-1 rounded transition-colors uppercase font-bold tracking-wider"
                           >
                             Try On
                           </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-charcoal/20">
               <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-all">
                 Compare Selection ({savedLooks.length})
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
