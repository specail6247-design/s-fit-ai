'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LegalModal({ isOpen, onClose }: LegalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-[#111] border border-white/20 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative flex flex-col max-h-[80vh]"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white">✕</button>
            <h2 className="text-xl font-bold mb-4 text-[#007AFF]">Privacy Policy & Terms</h2>

            <div className="flex-1 overflow-y-auto text-sm text-gray-300 space-y-4 pr-2 custom-scrollbar">
              <p><strong>1. Data Collection:</strong> We collect your uploaded photos solely for the purpose of generating the virtual try-on experience.</p>
              <p><strong>2. Data Safety:</strong> Your photos are processed securely and are NOT shared with any third parties. They are deleted from our servers immediately after the session ends.</p>
              <p><strong>3. Usage Rights:</strong> You retain all rights to your uploaded content. The generated images are for your personal use.</p>
              <p><strong>4. Liability:</strong> The generated images are AI representations and may not perfectly reflect real-world fit or color.</p>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors border border-white/10"
            >
              I Understand
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
