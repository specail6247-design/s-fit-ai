import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="privacy-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="privacy-modal-content"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] flex flex-col relative shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-white">Privacy Policy & Terms of Service</h2>

            <div className="flex-1 overflow-y-auto pr-4 space-y-6 text-sm text-gray-300">
              <section>
                <h3 className="text-white font-semibold mb-2">1. Data Collection & Processing</h3>
                <p>We collect and process the photos you upload exclusively for generating virtual try-on results. Your photos are temporarily stored securely and are automatically deleted after processing. We do not use your photos to train our AI models without explicit consent.</p>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">2. Data Sharing</h3>
                <p>Your data is processed securely and is strictly not shared with third-party advertisers or external entities. Our processing pipelines adhere to strict data protection standards.</p>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">3. User Rights</h3>
                <p>You have the right to request the deletion of any data associated with your account. For guests, all uploaded media is transient and leaves no permanent trace on our servers.</p>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">4. Terms of Service</h3>
                <p>By using S_FIT AI, you agree to not upload prohibited content, including but not limited to, explicit or offensive imagery. We reserve the right to restrict access to users who violate these terms.</p>
              </section>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-lg font-medium transition-colors"
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
