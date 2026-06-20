import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
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
            className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto bg-[#101622] border border-white/10 rounded-2xl p-6 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="text-xl font-bold mb-4 text-white">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h2>
            <div className="space-y-4 text-sm text-gray-300">
              {type === 'privacy' ? (
                <>
                  <p><strong>1. Data Processing</strong><br/>We only process uploaded images for the purpose of generating virtual try-on results. Your photos are never used to train our AI models without explicit consent.</p>
                  <p><strong>2. Data Retention</strong><br/>Uploaded images are deleted from our servers immediately after the session ends.</p>
                  <p><strong>3. Third-Party Services</strong><br/>We use secure third-party APIs (like Fashn.ai and Runway) to process images. They are bound by strict data processing agreements.</p>
                </>
              ) : (
                <>
                  <p><strong>1. Acceptance of Terms</strong><br/>By using S_FIT AI, you agree to these terms.</p>
                  <p><strong>2. User Conduct</strong><br/>You agree to only upload images you have the right to use. No explicit or illegal content.</p>
                  <p><strong>3. Service Availability</strong><br/>We strive for 99% uptime but do not guarantee uninterrupted service.</p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
