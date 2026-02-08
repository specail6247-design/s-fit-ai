'use client';

import { useStore } from '@/store/useStore';
import { mockClothingItems, ClothingItem } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function TheVault() {
  const { savedLooks, toggleSaveLook, isVaultOpen, setVaultOpen, setSelectedItem } = useStore();

  const savedItems = savedLooks
    .map((id) => mockClothingItems.find((item) => item.id === id))
    .filter((item): item is ClothingItem => !!item);

  return (
    <AnimatePresence>
      {isVaultOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVaultOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight font-serif">THE VAULT</h2>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Digital Wardrobe</p>
              </div>
              <button
                onClick={() => setVaultOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {savedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <span className="text-4xl mb-4">🧥</span>
                  <p className="text-sm font-medium text-gray-400">Your Vault is Empty</p>
                  <p className="text-xs text-gray-600 mt-2">Save items to curate your collection.</p>
                </div>
              ) : (
                savedItems.map((item) => (
                  <div key={item.id} className="relative group bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-3 p-3">
                      <div className="relative w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{item.brand}</p>
                        <p className="text-[10px] text-gray-400 truncate">{item.name}</p>
                        <p className="text-xs text-[#007AFF] mt-1 font-mono">${item.price}</p>
                      </div>
                      <button
                        onClick={() => toggleSaveLook(item.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-full text-red-400"
                        title="Remove from Vault"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="bg-black/20 p-2 flex gap-2">
                        <button
                            onClick={() => {
                                setSelectedItem(item);
                                setVaultOpen(false);
                            }}
                            className="flex-1 text-[10px] font-bold text-center py-1.5 bg-white/10 hover:bg-white/20 rounded hover:text-[#007AFF] transition-colors uppercase tracking-wider"
                        >
                            Try On
                        </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                <span>Total Items</span>
                <span className="text-white font-mono">{savedItems.length}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Total Value</span>
                <span className="text-[#007AFF] font-mono font-bold">
                    ${savedItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
