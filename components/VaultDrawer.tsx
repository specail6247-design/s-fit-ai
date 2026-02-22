'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getItemById } from '@/data/mockData';
import Link from 'next/link';

export default function VaultDrawer() {
  const { savedLooks, isVaultOpen, setIsVaultOpen, toggleSavedLook } = useStore();

  const savedItems = savedLooks
    .map((id) => getItemById(id))
    .filter((item): item is NonNullable<typeof item> => !!item);

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
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-[#101622] border-l border-[#314368] shadow-2xl overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#314368]">
              <h2 className="text-xl font-bold text-white tracking-widest uppercase">The Vault</h2>
              <button
                onClick={() => setIsVaultOpen(false)}
                className="rounded-full p-2 hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              {savedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <span className="material-symbols-outlined text-4xl text-[#314368] mb-4">checkroom</span>
                  <p className="text-[#90a4cb]">Your vault is empty.</p>
                  <p className="text-sm text-[#90a4cb] mt-2">Save items to compare them later.</p>
                </div>
              ) : (
                savedItems.map((item) => (
                  <div key={item.id} className="relative flex gap-4 p-4 rounded-xl bg-[#1a2336] border border-[#314368] group">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt={item.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <p className="text-xs font-bold text-[#ecab13] uppercase tracking-wider">{item.brand}</p>
                        <h3 className="text-sm font-bold text-white leading-tight mt-1">{item.name}</h3>
                        <p className="text-xs text-[#90a4cb] mt-1">{item.currency} {item.price}</p>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Link
                            href={`/luxury`} // TODO: Add ID support to luxury page
                            onClick={() => setIsVaultOpen(false)}
                            className="text-xs font-bold text-[#256af4] hover:text-[#256af4]/80 uppercase tracking-wider"
                        >
                            View
                        </Link>
                        <button
                          onClick={() => toggleSavedLook(item.id)}
                          className="text-xs font-bold text-red-400 hover:text-red-300 uppercase tracking-wider ml-auto"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    {item.locked && (
                         <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1">
                             <span className="material-symbols-outlined text-[10px]">lock</span>
                             LOCKED
                         </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
