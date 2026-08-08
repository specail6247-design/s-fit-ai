import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LegalModal({
  isOpen,
  onClose,
  title,
  content,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="legal-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="legal-modal-content"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/50">
              <h2 className="text-xl font-bold font-serif text-luxury-champagne">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-gray-300 space-y-4 font-sans leading-relaxed">
              {content}
            </div>
            <div className="p-4 border-t border-white/10 bg-black/50 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-mono text-xs"
              >
                ACCEPT & CLOSE
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
