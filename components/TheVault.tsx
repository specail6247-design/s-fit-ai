'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

import { ClothingItem } from '@/data/mockData';

export default function TheVault() {
  const { isVaultOpen, setIsVaultOpen, savedLooks, removeLook } = useStore();

  return (
    <AnimatePresence>
      {isVaultOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVaultOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[101] h-full w-full max-w-sm bg-[#0a0a0a] border-l border-[#2d2d2d] shadow-2xl overflow-y-auto"
          >
            <div className="p-6 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-white text-xl font-bold tracking-[0.2em] uppercase font-cinzel">The Vault</h2>
                  <p className="text-zinc-500 text-xs mt-1">Your Curated Collection</p>
                </div>
                <button
                  onClick={() => setIsVaultOpen(false)}
                  className="flex items-center justify-center size-8 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                  aria-label="Close Vault"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">close</span>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-4">
                {savedLooks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center flex-1 opacity-50 text-center">
                    <span className="material-symbols-outlined text-4xl mb-4">wardrobe</span>
                    <p className="text-sm">Your vault is empty.</p>
                    <p className="text-xs mt-2 text-zinc-400">Save items you love to compare and curate your wardrobe.</p>
                  </div>
                ) : (
                  savedLooks.map((item: ClothingItem) => (
                    <div key={item.id} className="group relative flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                      {/* Image */}
                      <div className="relative w-20 h-24 rounded-md overflow-hidden bg-zinc-900 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-col flex-1 justify-center">
                        <p className="text-[10px] font-bold text-cyber-lime tracking-widest uppercase mb-1">{item.brand}</p>
                        <h3 className="text-sm font-medium text-white line-clamp-1">{item.name}</h3>
                        <p className="text-xs text-zinc-400 mt-1">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency || 'USD' }).format(item.price || 0)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeLook(item.id)}
                        className="absolute top-2 right-2 size-6 flex items-center justify-center rounded-full bg-black/50 text-white/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`Remove ${item.name} from Vault`}
                      >
                        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">delete</span>
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {savedLooks.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#2d2d2d]">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-zinc-500 text-xs uppercase tracking-widest">Collection Value</span>
                    <span className="text-white text-xl font-cinzel">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                        savedLooks.reduce((total, item) => total + item.price, 0)
                      )}
                    </span>
                  </div>
                  <button className="w-full h-12 bg-white text-black font-bold text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-zinc-200 transition-colors">
                    Checkout Collection
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
