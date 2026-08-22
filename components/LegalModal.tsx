import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div className="relative bg-gray-900 border border-gray-700 p-6 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>

          {type === 'privacy' ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-white">Privacy Policy</h2>
              <div className="text-gray-300 space-y-4 text-sm">
                <p>Your privacy is important to us. This policy outlines how S_FIT AI handles your data.</p>
                <h3 className="font-bold text-white mt-4">1. Data Collection</h3>
                <p>We collect photos uploaded for the purpose of virtual fitting. These are processed securely and discarded after the session.</p>
                <h3 className="font-bold text-white mt-4">2. Data Safety</h3>
                <p className="flex items-center gap-2">
                  <span className="text-green-400">🛡️</span>
                  Photos are processed securely and not shared with third parties. We do not store your personal photos permanently unless you explicitly save them to your account.
                </p>
                <h3 className="font-bold text-white mt-4">3. Usage</h3>
                <p>Data is strictly used to improve the fitting algorithm and provide you with the best virtual try-on experience.</p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4 text-white">Terms of Service</h2>
              <div className="text-gray-300 space-y-4 text-sm">
                <p>Welcome to S_FIT AI. By using our service, you agree to these terms.</p>
                <h3 className="font-bold text-white mt-4">1. Acceptance of Terms</h3>
                <p>By accessing the virtual fitting room, you agree to be bound by these terms.</p>
                <h3 className="font-bold text-white mt-4">2. User Content</h3>
                <p>You retain rights to any photos you upload. You grant us a temporary license to process them for the try-on feature.</p>
                <h3 className="font-bold text-white mt-4">3. Prohibited Conduct</h3>
                <p>Do not upload inappropriate, offensive, or copyrighted material without permission.</p>
              </div>
            </>
          )}

          <div className="mt-8 pt-4 border-t border-gray-700 flex justify-end">
            <button onClick={onClose} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
              I Understand
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
