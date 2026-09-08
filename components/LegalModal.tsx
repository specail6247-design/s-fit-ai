import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-[#111] border border-white/20 rounded-2xl p-6 shadow-2xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Privacy Policy & Terms</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-sm text-gray-300">
              <section>
                <h3 className="font-bold text-white mb-2">1. Data Safety & Privacy</h3>
                <p>We value your privacy. Photos uploaded to S_FIT are processed securely solely for the purpose of generating your virtual try-on result. We do not store, share, or sell your personal photos to third parties. All images are processed ephemerally and deleted from our servers immediately after the fitting session concludes.</p>
              </section>
              <section>
                <h3 className="font-bold text-white mb-2">2. Terms of Service</h3>
                <p>By using S_FIT, you agree to these terms. You must only upload photos that you have the right to use. Do not upload inappropriate, offensive, or copyrighted materials without permission. S_FIT reserves the right to terminate access for users who violate these guidelines.</p>
              </section>
              <section>
                <h3 className="font-bold text-white mb-2">3. User Consent</h3>
                <p>By uploading your photo and selecting &quot;Try It On&quot;, you consent to the automated processing of your image by our AI models to generate the fitting result. You retain full ownership of your original photos.</p>
              </section>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-lg font-bold transition-colors"
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
