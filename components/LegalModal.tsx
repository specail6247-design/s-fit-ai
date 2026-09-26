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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-lg p-6 bg-[#0a0a0a] border border-white/20 rounded-2xl shadow-2xl overflow-y-auto max-h-[80vh]"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Privacy Policy & Terms</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close">
                ✕
              </button>
            </div>
            <div className="space-y-4 text-sm text-gray-300">
              <section>
                <h3 className="text-[#007AFF] font-bold mb-2">Privacy Policy</h3>
                <p>We respect your privacy. All uploaded photos are processed securely and are not shared with any third parties. They are deleted immediately after the virtual fitting process is complete.</p>
              </section>
              <section>
                <h3 className="text-[#007AFF] font-bold mb-2">Terms of Service</h3>
                <p>By using S_FIT AI, you agree to our terms of service. The virtual try-on feature is for personal use only. We are not responsible for any inaccuracies in the final generated images.</p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
