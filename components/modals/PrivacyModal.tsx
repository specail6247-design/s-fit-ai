import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PrivacyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="privacy-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            key="privacy-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-[#111] border border-white/20 p-8 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2"
              aria-label="Close"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Privacy Policy & Terms</h2>

            <div className="space-y-4 text-sm text-gray-300">
              <section>
                <h3 className="text-lg font-semibold text-white mb-2">1. Data Collection & Processing</h3>
                <p>
                  We prioritize your privacy. The photos you upload for virtual fitting are processed securely. We only use these images to generate your fitting results and do not share them with third parties or use them for training our models without your explicit consent.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">2. Data Retention</h3>
                <p>
                  Your uploaded images and generated results are stored temporarily to provide the service. They are automatically deleted from our servers within 24 hours unless you explicitly choose to save them to your Digital Wardrobe.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">3. Terms of Service</h3>
                <p>
                  By using S_FIT AI, you agree to use the service for personal, non-commercial purposes. Do not upload sensitive, explicit, or unauthorized images of others. We reserve the right to suspend accounts that violate these terms.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">4. User Rights</h3>
                <p>
                  You have the right to request the immediate deletion of your data, access the data we hold about you, and opt out of any optional data collection features. Contact our support team for assistance.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors"
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
