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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#111] border border-white/20 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Privacy Policy & Terms</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">✕</button>
            </div>

            <div className="space-y-6 text-sm text-gray-300">
              <section>
                <h3 className="text-lg font-bold text-[#007AFF] mb-2">1. Data Privacy & Processing</h3>
                <p>
                  Your privacy is our primary concern. Photos uploaded to S_FIT NEO are processed securely on our encrypted servers solely for the purpose of generating your virtual fitting result. We do not store, share, or sell your biometric data or personal images to third parties.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-[#007AFF] mb-2">2. Data Safety Guarantee</h3>
                <p>
                  All uploaded media is temporarily processed in memory and immediately deleted after your session ends or the try-on result is generated. We adhere to strict data safety protocols to ensure your personal photos remain yours.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-[#007AFF] mb-2">3. Terms of Service</h3>
                <p>
                  By using this application, you agree to use it for personal, non-commercial purposes. You must not upload offensive, illegal, or copyrighted material without permission. We reserve the right to suspend access for violations of these terms.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] text-white font-bold rounded-lg hover:bg-[#005bb5] transition-colors"
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
