import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Image from 'next/image';

export function VaultDrawer() {
  const { isVaultOpen, setVaultOpen, vaultItems, removeFromVault, setSelectedItem, setSelectedBrand } = useStore();

  return (
    <AnimatePresence>
      {isVaultOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="vault-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setVaultOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            key="vault-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-void-black border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-void-black/80 backdrop-blur-md">
              <div>
                <h2 className="text-xl font-bold tracking-widest uppercase text-white flex items-center gap-2">
                  <span>🔒</span> The Vault
                </h2>
                <p className="text-xs text-soft-gray mt-1">Your curated digital wardrobe.</p>
              </div>
              <button
                onClick={() => setVaultOpen(false)}
                className="text-soft-gray hover:text-white transition-colors"
                aria-label="Close Vault"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {vaultItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <span className="text-4xl mb-4">🗄️</span>
                  <p className="text-sm font-bold text-white mb-2">Your vault is empty</p>
                  <p className="text-xs text-soft-gray px-6">
                    Save items you love to compare and review them later.
                  </p>
                </div>
              ) : (
                vaultItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex items-center gap-4 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {/* Item Image */}
                    <div className="w-16 h-16 bg-black/50 rounded-lg overflow-hidden border border-white/10 relative shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-cyber-lime truncate">
                        {item.brand}
                      </p>
                      <p className="text-xs font-bold text-white truncate">{item.name}</p>
                      <p className="text-[10px] text-soft-gray mt-1">${item.price}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setSelectedBrand(item.brand);
                          setSelectedItem(item);
                          setVaultOpen(false);
                        }}
                        className="p-1.5 rounded-md bg-white/10 hover:bg-cyber-lime hover:text-black transition-colors"
                        aria-label="Try On"
                      >
                        <span className="text-xs font-bold">Try</span>
                      </button>
                      <button
                        onClick={() => removeFromVault(item.id)}
                        className="p-1.5 rounded-md bg-white/10 hover:bg-red-500/80 transition-colors text-white"
                        aria-label="Remove from Vault"
                      >
                        <span className="text-xs">🗑️</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {vaultItems.length > 0 && (
              <div className="p-4 border-t border-white/10 bg-void-black/80 backdrop-blur-md">
                <button
                  onClick={() => setVaultOpen(false)}
                  className="w-full py-3 bg-cyber-lime text-black font-bold uppercase tracking-wider text-xs rounded-lg hover:scale-[1.02] transition-transform"
                >
                  Return to Fitting Room
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
