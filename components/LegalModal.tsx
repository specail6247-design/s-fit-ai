'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
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
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <h2 className="text-xl font-bold text-white tracking-widest uppercase">
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
            <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300 space-y-4">
              {type === 'privacy' ? (
                <>
                  <p><strong>1. Data Collection:</strong> We collect only the data necessary to provide our services, including uploaded photos and basic usage metrics.</p>
                  <p><strong>2. Photo Processing:</strong> Uploaded photos are processed securely to generate virtual try-on results. They are not used to train AI models without explicit consent and are not shared with third parties.</p>
                  <p><strong>3. Data Retention:</strong> Photos are temporarily stored during processing and are automatically deleted from our servers shortly after the result is delivered.</p>
                  <p><strong>4. Security:</strong> We employ industry-standard security measures to protect your data during transit and storage.</p>
                </>
              ) : (
                <>
                  <p><strong>1. Acceptance of Terms:</strong> By using S_FIT, you agree to these Terms of Service.</p>
                  <p><strong>2. User Conduct:</strong> You agree not to upload inappropriate, offensive, or copyrighted material without permission.</p>
                  <p><strong>3. Service Availability:</strong> While we strive for high uptime, we do not guarantee uninterrupted access to the service.</p>
                  <p><strong>4. Intellectual Property:</strong> Generated images may include our branding. You may use generated images for personal use, but commercial use may require a separate license.</p>
                </>
              )}
            </div>
            <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors"
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
