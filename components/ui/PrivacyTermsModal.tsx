import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export function PrivacyTermsModal({ isOpen, onClose, type }: PrivacyTermsModalProps) {
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#111] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
              <h2 className="text-xl font-bold font-mono tracking-tighter text-white">{title}</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300 space-y-6">
              {type === 'privacy' ? (
                <>
                  <section>
                    <h3 className="text-white font-bold mb-2">1. Data Collection</h3>
                    <p>We strictly limit data collection to what is necessary for our virtual try-on service. Uploaded photos are processed securely and automatically deleted from our primary servers after processing, typically within 24 hours.</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2">2. Facial & Biometric Data</h3>
                    <p>Facial analysis is performed locally on your device or via secure, encrypted channels. We do not store, sell, or use your facial geometry or biometric identifiers for cross-tracking or identification purposes.</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2">3. Third-Party Services</h3>
                    <p>We may use trusted third-party providers (e.g., cloud rendering) to facilitate our service. These providers are bound by strict data processing agreements and are not permitted to use your data for their own purposes.</p>
                  </section>
                </>
              ) : (
                <>
                  <section>
                    <h3 className="text-white font-bold mb-2">1. Acceptance of Terms</h3>
                    <p>By accessing or using the S_FIT AI service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2">2. User Conduct</h3>
                    <p>You agree not to upload explicit, illegal, or copyrighted material without permission. The service is intended for personal virtual try-on experiences only.</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2">3. Limitation of Liability</h3>
                    <p>S_FIT AI provides virtual fitting estimates. We do not guarantee 100% physical accuracy. We are not liable for any purchasing decisions made based on our digital simulations.</p>
                  </section>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/50 shrink-0 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
