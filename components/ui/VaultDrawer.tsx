import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VaultItem {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
}

interface VaultDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: VaultItem[];
}

export const VaultDrawer: React.FC<VaultDrawerProps> = ({ isOpen, onClose, items }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-80 max-w-[80vw] bg-[#0a0a0a] border-l border-[#2d2d2d] shadow-2xl z-[1000] flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="p-6 border-b border-[#2d2d2d] flex justify-between items-center bg-[#0a0a0a]/90 backdrop-blur-md">
              <div>
                <h2 className="text-white text-sm font-bold tracking-[0.2em] uppercase">The Vault</h2>
                <p className="text-[#ecab13] text-[10px] font-bold uppercase mt-1">Digital Wardrobe</p>
              </div>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-50">inventory_2</span>
                  <p className="text-xs uppercase tracking-widest">Your vault is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="group relative rounded-xl overflow-hidden border border-[#2d2d2d] bg-[#1a1a1a]">
                    <div className="aspect-square relative">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-medium">{item.name}</p>
                        <p className="text-[#ecab13] text-[10px] uppercase tracking-widest">{item.brand}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
