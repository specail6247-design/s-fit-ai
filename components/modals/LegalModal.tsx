import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy' | null;
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white text-xl" aria-label="Close">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 text-sm text-gray-300 space-y-4 font-sans">
              {type === 'terms' ? (
                <>
                  <p>Welcome to S_FIT NEO.</p>
                  <p>1. Acceptance of Terms: By accessing this application, you agree to be bound by these terms.</p>
                  <p>2. User Content: You retain all rights to the photos you upload. We only process them for the purpose of providing the virtual fitting service.</p>
                  <p>3. Acceptable Use: Do not upload inappropriate, offensive, or copyrighted materials without permission.</p>
                  <p>4. Disclaimer: The virtual fitting results are AI-generated and may not perfectly represent real-life fit or appearance.</p>
                </>
              ) : (
                <>
                  <p>Your privacy is critically important to us.</p>
                  <p>1. Data Collection: We temporarily collect the photos you upload to process the virtual fitting.</p>
                  <p>2. Data Processing: Photos are processed securely using our backend services and AI models.</p>
                  <p>3. Data Retention: We do not store your photos permanently. They are deleted immediately after the session ends.</p>
                  <p>4. Data Sharing: We do not sell or share your personal data with third parties for marketing purposes.</p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button onClick={onClose} className="px-6 py-2 bg-[#007AFF] text-white rounded-lg font-bold hover:bg-[#005bb5] transition-colors">
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
