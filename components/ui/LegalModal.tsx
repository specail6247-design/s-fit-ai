import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';

  const content = type === 'privacy' ? (
    <div className="space-y-4 text-sm text-gray-300">
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <h3 className="font-bold text-white mt-4">1. Information We Collect</h3>
      <p>We only collect information necessary to provide you with the best virtual fitting experience. This includes uploaded photos which are processed securely and deleted from our servers after processing.</p>

      <h3 className="font-bold text-white mt-4">2. How We Use Your Information</h3>
      <p>Your photos are strictly used for generating virtual try-on results. We do not use your personal images for training public AI models without explicit consent.</p>

      <h3 className="font-bold text-white mt-4">3. Data Security</h3>
      <p>We implement industry-standard security measures to protect your data. All photo processing is encrypted.</p>
    </div>
  ) : (
    <div className="space-y-4 text-sm text-gray-300">
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <h3 className="font-bold text-white mt-4">1. Acceptance of Terms</h3>
      <p>By using S_FIT, you agree to these terms. If you do not agree, please do not use the service.</p>

      <h3 className="font-bold text-white mt-4">2. User Guidelines</h3>
      <p>You agree to only upload photos that you have the right to use. Explicit or inappropriate content is strictly prohibited.</p>

      <h3 className="font-bold text-white mt-4">3. Service Availability</h3>
      <p>We strive to keep the service running 24/7, but we do not guarantee uninterrupted access.</p>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[80vh] overflow-hidden bg-[#0a0a0a] border border-white/10 rounded-2xl flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {content}
            </div>

            <div className="p-6 border-t border-white/10 bg-[#0a0a0a]/90 backdrop-blur-sm">
              <button
                onClick={onClose}
                className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
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
