import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LegalModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">Legal & Compliance</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-300">
              <section>
                <h3 className="text-white font-bold mb-2">Privacy Policy</h3>
                <p>Your privacy is our priority. We only process your photos to generate virtual fitting results. Images are processed securely and automatically deleted from our servers after your session ends. We do not use your photos to train AI models without explicit consent.</p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-2">Terms of Service</h3>
                <p>By using S_FIT AI, you agree to use the service for personal, non-commercial purposes only. Do not upload inappropriate, offensive, or copyrighted materials. We reserve the right to suspend accounts that violate these terms.</p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-2">Data Processing</h3>
                <p>All biometric and image data is handled in compliance with GDPR and CCPA regulations. For data deletion requests, please contact our privacy team via the Support Hub.</p>
              </section>
            </div>
            <div className="p-4 border-t border-white/10 bg-black/50">
              <button
                onClick={onClose}
                className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
