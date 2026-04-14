'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LegalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            className="bg-[#0a0a0a] border border-white/20 p-8 rounded-2xl max-w-lg w-full text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-serif text-[#C9B037] mb-4">Privacy Policy & Terms</h2>
            <div className="h-64 overflow-y-auto pr-4 text-sm text-gray-300 space-y-4">
              <p>Welcome to S_FIT AI. By using our service, you agree to these terms.</p>
              <h3 className="font-bold text-white mt-4">1. Data Privacy</h3>
              <p>Your uploaded photos are processed securely to generate virtual try-on results. They are not shared with third parties or used to train models without explicit consent.</p>
              <h3 className="font-bold text-white mt-4">2. Usage Rights</h3>
              <p>All AI-generated images belong to you for personal use. Commercial use requires a Premium subscription.</p>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors"
            >
              I Understand
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
