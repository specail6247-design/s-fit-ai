import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LegalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-2xl bg-[#111] border border-white/20 rounded-2xl p-8 overflow-y-auto max-h-[80vh] relative shadow-2xl"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white">✕</button>
            <h2 className="text-2xl font-bold text-white mb-6">Privacy Policy & Terms of Service</h2>
            <div className="text-sm text-gray-300 space-y-4">
              <h3 className="text-lg font-semibold text-[#007AFF]">1. Privacy Policy</h3>
              <p>Your privacy is important to us. Photos uploaded are processed securely and are NOT shared with third parties.</p>
              <h3 className="text-lg font-semibold text-[#007AFF]">2. Terms of Service</h3>
              <p>By using S_FIT AI, you agree to our terms. This service is for personal use to visualize clothing fit.</p>
              <h3 className="text-lg font-semibold text-[#007AFF]">3. Data Retention</h3>
              <p>Uploaded photos are deleted from our servers immediately after the fitting process is complete.</p>
            </div>
            <div className="mt-8">
              <button onClick={onClose} className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors">I Understand</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
