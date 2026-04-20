import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyTermsModal({ isOpen, onClose }: PrivacyTermsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#050505] border border-[#C9B037]/30 rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto relative z-[101]"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#C9B037] font-serif uppercase tracking-widest text-xl">Legal & Privacy</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors focus-visible:ring-2 outline-none" aria-label="Close">
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
            </div>

            <div className="space-y-6 text-sm text-gray-300 font-sans">
              <section>
                <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">Privacy Policy</h3>
                <p className="leading-relaxed">
                  We take your privacy seriously. The photos you upload are processed securely in memory and are deleted immediately after the virtual try-on session ends. We do not use your photos to train our models, nor do we share them with any third parties.
                </p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">Terms of Service</h3>
                <p className="leading-relaxed">
                  By using S_FIT AI, you agree to our Terms of Service. This service is provided &quot;as is&quot; without any warranties. You retain all rights to your images. Do not upload inappropriate, explicit, or copyrighted content that you do not own.
                </p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">Data Processing</h3>
                <p className="leading-relaxed">
                  All facial and body analysis is performed transiently to provide the fitting service. No biometric data is permanently stored.
                </p>
              </section>
            </div>

            <div className="mt-8">
              <button onClick={onClose} className="w-full py-3 bg-[#C9B037] hover:bg-[#d4be5c] text-black font-bold uppercase tracking-widest text-xs rounded transition-colors focus-visible:ring-2 outline-none">
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
