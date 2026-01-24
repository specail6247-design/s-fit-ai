import React from 'react';
import { motion } from 'framer-motion';
import { ClothingItem } from '@/data/mockData';
import Image from 'next/image';

interface VaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ClothingItem[];
  onSelect: (item: ClothingItem) => void;
  onRemove: (itemId: string) => void;
}

export default function VaultModal({ isOpen, onClose, items, onSelect, onRemove }: VaultModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-void-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative h-full w-80 bg-charcoal border-l border-white/10 p-6 shadow-2xl overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>💎</span> The Vault
          </h2>
          <button onClick={onClose} className="text-soft-gray hover:text-white transition-colors">✕</button>
        </div>

        {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <span className="text-4xl mb-4 opacity-50">🔒</span>
                <p className="text-soft-gray text-sm">Your vault is empty.</p>
                <p className="text-xs text-soft-gray/60 mt-2">Save items to build your digital wardrobe.</p>
            </div>
        ) : (
            <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="relative group bg-void-black/50 rounded-xl p-3 border border-white/5 hover:border-cyber-lime/30 transition-all">
                    <div className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                            {item.imageUrl && (
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                            <p className="text-xs text-soft-gray">{item.brand}</p>
                            <p className="text-xs text-cyber-lime font-mono mt-1">${item.price}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={() => { onSelect(item); onClose(); }}
                            className="flex-1 bg-white/10 hover:bg-cyber-lime hover:text-black text-white text-[10px] font-bold py-1.5 rounded transition-colors"
                        >
                            WEAR
                        </button>
                        <button
                            onClick={() => onRemove(item.id)}
                            className="px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold py-1.5 rounded transition-colors"
                        >
                            REMOVE
                        </button>
                    </div>
                </div>
            ))}
            </div>
        )}
      </motion.div>
    </motion.div>
  );
}
