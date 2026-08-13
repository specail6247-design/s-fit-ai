import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="legal-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            key="legal-modal-content"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="text-gray-300 space-y-4 text-sm leading-relaxed">
              {type === 'privacy' ? (
                <>
                  <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                  <h3 className="text-lg font-semibold text-white mt-4">1. Information We Collect</h3>
                  <p>We collect information you provide directly to us, such as when you create an account, upload photos for virtual try-on, or contact support.</p>

                  <h3 className="text-lg font-semibold text-white mt-4">2. How We Use Your Information</h3>
                  <p>Your photos are processed securely to generate virtual try-on results. We do not use your personal photos for training our AI models without explicit consent.</p>

                  <h3 className="text-lg font-semibold text-white mt-4">3. Data Security</h3>
                  <p>We implement appropriate technical and organizational measures to protect the security of your personal information. Photos are temporarily stored during processing and deleted afterwards.</p>

                  <h3 className="text-lg font-semibold text-white mt-4">4. Sharing of Information</h3>
                  <p>We do not sell your personal information. We may share information with service providers who perform services on our behalf (e.g., cloud hosting).</p>
                </>
              ) : (
                <>
                  <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                  <h3 className="text-lg font-semibold text-white mt-4">1. Acceptance of Terms</h3>
                  <p>By accessing or using S_FIT AI, you agree to be bound by these Terms of Service.</p>

                  <h3 className="text-lg font-semibold text-white mt-4">2. User Content</h3>
                  <p>You retain all rights to the photos you upload. You grant us a temporary license to process these photos solely for providing the virtual try-on service to you.</p>

                  <h3 className="text-lg font-semibold text-white mt-4">3. Acceptable Use</h3>
                  <p>You agree not to use the service for any unlawful purpose or to upload inappropriate, offensive, or copyrighted material without permission.</p>

                  <h3 className="text-lg font-semibold text-white mt-4">4. Limitation of Liability</h3>
                  <p>The service is provided &quot;as is&quot;. We shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.</p>
                </>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Accept & Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
