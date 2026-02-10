'use client';

import { useStore } from '@/store/useStore';
import { getItemById } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function TheVault() {
  const { savedLooks, toggleSavedLook, isVaultOpen, setVaultOpen, setSelectedItem } = useStore();

  const savedItems = savedLooks
    .map((id) => getItemById(id))
    .filter((item): item is NonNullable<typeof item> => item !== undefined);

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
            className="fixed inset-0 bg-void-black/80 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-charcoal border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-pure-white">The Vault</h2>
                <p className="text-xs text-soft-gray uppercase tracking-wider">Your Digital Wardrobe</p>
              </div>
              <button
                onClick={() => setVaultOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {savedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-soft-gray text-center opacity-50">
                  <span className="text-4xl mb-2">🧥</span>
                  <p>Your vault is empty.</p>
                  <p className="text-xs">Save looks to compare them here.</p>
                </div>
              ) : (
                savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-void-black/40 border border-white/5 hover:border-cyber-lime/30 transition-all group"
                  >
                    <div className="relative w-16 h-16 rounded-lg bg-charcoal overflow-hidden flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{item.name}</p>
                      <p className="text-[10px] text-soft-gray">{item.brand}</p>
                      <p className="text-[10px] text-cyber-lime">${item.price}</p>
                    </div>
                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setVaultOpen(false);
                        }}
                        className="text-[10px] bg-cyber-lime text-black px-2 py-1 rounded font-bold hover:bg-white"
                      >
                        Try On
                      </button>
                      <button
                        onClick={() => toggleSavedLook(item.id)}
                        className="text-[10px] text-soft-gray hover:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-void-black/20">
               <div className="flex justify-between items-center text-xs text-soft-gray">
                  <span>{savedItems.length} Items Saved</span>
                  {savedItems.length > 1 && (
                      <button className="text-cyber-lime hover:underline" onClick={() => alert('Feature coming in Phase 8: Outfit Builder')}>
                          Create Outfit →
                      </button>
                  )}
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
