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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[#111] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
              <h2 className="text-xl font-bold text-white">Privacy Policy & Terms</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-gray-300 space-y-4">
              <section>
                <h3 className="text-lg font-semibold text-white mb-2">1. Information We Collect</h3>
                <p>
                  We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.
                  For virtual fitting, we temporarily process photos you upload. These are used solely for generating the fitting result and are not stored permanently or shared with third parties.
                </p>
              </section>
              <section>
                <h3 className="text-lg font-semibold text-white mb-2">2. Use of Information</h3>
                <p>
                  We may use the information we collect about you to provide, maintain, and improve our services, including to facilitate payments, send receipts, provide products and services you request, develop new features, provide customer support to Users, develop safety features, authenticate users, and send product updates and administrative messages.
                </p>
              </section>
              <section>
                <h3 className="text-lg font-semibold text-white mb-2">3. Data Security</h3>
                <p>
                  We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                </p>
              </section>
               <section>
                <h3 className="text-lg font-semibold text-white mb-2">4. Contact Us</h3>
                <p>
                  If you have any questions about this Privacy Policy, please use the Support Hub to contact us.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
