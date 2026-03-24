import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="legal-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="legal-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl bg-[#0a0a0a] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 id="legal-modal-title" className="text-xl font-bold text-white tracking-tight">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh] text-sm text-gray-300 space-y-4">
              {type === 'privacy' ? (
                <>
                  <h3 className="text-lg font-semibold text-white">1. Data Collection & Processing</h3>
                  <p>
                    When you use S_FIT NEO for virtual fitting, we temporarily process your uploaded photo
                    and selected garment image solely for the purpose of generating the fitting result.
                  </p>

                  <h3 className="text-lg font-semibold text-white mt-6">2. Data Safety & Security</h3>
                  <p>
                    Photos are processed securely and <strong>are not shared</strong> with third parties for marketing purposes.
                    The generated fitting results are stored temporarily to allow you to view and download them,
                    and are automatically deleted from our servers shortly after your session ends.
                  </p>

                  <h3 className="text-lg font-semibold text-white mt-6">3. User Rights</h3>
                  <p>
                    You retain all rights to your original photos. S_FIT NEO claims no ownership over
                    the images you upload.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-white">1. Acceptance of Terms</h3>
                  <p>
                    By accessing or using S_FIT NEO, you agree to be bound by these Terms of Service.
                    If you do not agree to all the terms and conditions, you may not access the service.
                  </p>

                  <h3 className="text-lg font-semibold text-white mt-6">2. Acceptable Use</h3>
                  <p>
                    You agree to use the service only for lawful purposes. You must not upload any
                    inappropriate, offensive, or copyrighted material without permission.
                  </p>

                  <h3 className="text-lg font-semibold text-white mt-6">3. Disclaimer of Warranties</h3>
                  <p>
                    The service is provided &quot;as is&quot;. S_FIT AI makes no warranties, expressed or implied,
                    and hereby disclaims all other warranties including without limitation, implied
                    warranties or conditions of merchantability or fitness for a particular purpose.
                  </p>
                </>
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
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
