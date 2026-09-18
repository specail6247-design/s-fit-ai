import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyTermsModal({ isOpen, onClose }: PrivacyTermsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Privacy Policy & Terms</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close">
                ✕
              </button>
            </div>

            <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
              <section>
                <h3 className="text-white font-bold mb-2">1. Data Collection & Usage</h3>
                <p>When using S_FIT AI, your uploaded photos and garments are processed securely to generate your virtual fitting results. We do not store your original photos permanently unless explicitly requested, and they are never shared with third parties.</p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2">2. AI Processing</h3>
                <p>Our virtual try-on technology utilizes advanced AI models. While we strive for accuracy, the generated results are representations and may not perfectly reflect real-world fit or fabric behavior.</p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2">3. User Responsibilities</h3>
                <p>You agree to only upload images for which you have the legal right or permission to use. Uploading explicit, copyrighted, or non-consensual content is strictly prohibited.</p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] text-white rounded-lg font-bold hover:bg-[#005bb5] transition-colors"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
