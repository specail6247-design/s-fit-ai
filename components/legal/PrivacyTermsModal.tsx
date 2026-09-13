import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyTermsModal: React.FC<PrivacyTermsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col m-4 overflow-hidden shadow-2xl text-white"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold font-sans">Privacy Policy & Terms</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 font-sans text-sm text-gray-300 space-y-6">
              <section>
                <h3 className="text-white font-bold mb-2">1. Data Privacy & Security</h3>
                <p>
                  Your privacy is our highest priority. All photos uploaded for virtual try-on are processed securely and are never shared with third parties. Images are temporarily stored solely for the purpose of generating your fitting result and are automatically deleted from our servers immediately after processing.
                </p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2">2. Terms of Service</h3>
                <p>
                  By using S_FIT AI, you agree to use the service for its intended purpose of virtual fashion try-on. You must own the rights to the images you upload. We reserve the right to suspend accounts that violate these terms or attempt to misuse the platform.
                </p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2">3. User Consent</h3>
                <p>
                  By continuing to use our application, you consent to the processing of your images as described in this policy. For any questions regarding your data, please contact our support team.
                </p>
              </section>
            </div>

            <div className="p-4 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
