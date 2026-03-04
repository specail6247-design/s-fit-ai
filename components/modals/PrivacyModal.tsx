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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
              <h2 className="text-xl font-bold font-sans tracking-wide">Privacy & Terms</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-gray-300">
              <section>
                <h3 className="text-white font-bold mb-2">1. Data Collection & Usage</h3>
                <p>We collect and process your photos solely for the purpose of generating virtual try-on results. Your images are temporarily processed and are not used for identifying individuals or training external facial recognition models.</p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2">2. Data Security</h3>
                <p>All photo uploads are transmitted securely using industry-standard encryption. Photos are processed in secure environments and are automatically deleted from our active processing servers after the session ends.</p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2">3. Third-Party Services</h3>
                <p>We may use trusted third-party AI providers (e.g., Replicate) to process the images. These providers are bound by strict confidentiality agreements and are prohibited from using your photos for any purpose other than generating your try-on result.</p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2">4. User Rights</h3>
                <p>You have the right to request deletion of any stored data associated with your account. For support, please use the Report Issue form in the Support Hub.</p>
              </section>
            </div>

            <div className="p-6 border-t border-white/10 bg-black/50 flex justify-end">
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
