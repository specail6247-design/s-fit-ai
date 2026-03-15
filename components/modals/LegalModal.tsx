import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';

  const privacyContent = (
    <div className="space-y-4 text-sm text-gray-300">
      <p>Your privacy is important to us. This policy outlines how we handle your data.</p>
      <h3 className="text-white font-bold mt-4">1. Data Collection</h3>
      <p>We collect photos solely for the purpose of providing the virtual fitting service. Your photos are processed securely.</p>
      <h3 className="text-white font-bold mt-4">2. Data Usage & Sharing</h3>
      <p>Photos are not shared with third parties or used for training generalized AI models without explicit consent. They are processed ephemerally or stored securely if you choose to save them.</p>
      <h3 className="text-white font-bold mt-4">3. Data Retention</h3>
      <p>Uploaded photos and generated results are automatically deleted from our processing servers after your session ends, unless saved to your vault.</p>
    </div>
  );

  const termsContent = (
    <div className="space-y-4 text-sm text-gray-300">
      <p>Welcome to S_FIT NEO. By using our service, you agree to these terms.</p>
      <h3 className="text-white font-bold mt-4">1. Acceptable Use</h3>
      <p>You agree to only upload photos that you have the right to use. Do not upload inappropriate or offensive content.</p>
      <h3 className="text-white font-bold mt-4">2. Service Limitations</h3>
      <p>The virtual fitting results are AI-generated and may not perfectly represent the physical garment&apos;s fit or appearance.</p>
      <h3 className="text-white font-bold mt-4">3. Liability</h3>
      <p>S_FIT NEO is provided &quot;as is&quot;. We are not responsible for any decisions made based on the virtual fitting results.</p>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="legal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          />

          {/* Modal */}
          <motion.div
            key="legal-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed z-[101] bg-[#111] border border-white/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[80vh] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ x: '-50%', y: '-50%' }} // Frame motion shorthand for centering
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              {type === 'privacy' ? privacyContent : termsContent}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
