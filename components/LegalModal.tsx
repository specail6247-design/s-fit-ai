import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LegalModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="legal-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-[#111] border border-white/20 p-6 rounded-2xl w-full max-w-lg shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold text-white mb-4">Privacy Policy & Terms</h2>
            <div className="text-sm text-gray-300 space-y-4">
              <p><strong>1. Privacy Policy</strong></p>
              <p>Your photos are processed securely. We do not store or share your uploaded images or generated fitting results with any third parties without your explicit consent. All data is handled in accordance with standard privacy practices.</p>

              <p><strong>2. Terms of Service</strong></p>
              <p>By using S_FIT AI, you agree to use the service for personal, non-commercial purposes only. The AI-generated images are for visualization purposes and may not perfectly reflect real-life fit or fabric behavior.</p>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
