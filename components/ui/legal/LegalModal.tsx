'use client';
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
        <React.Fragment key="legal-modal-backdrop">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#111] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 className="text-xl font-bold text-white">Privacy Policy & Terms of Service</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">✕</button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300 space-y-4">
                <h3 className="text-lg font-semibold text-white">1. Data Collection and Usage</h3>
                <p>We process your uploaded photos solely for the purpose of generating virtual try-on images. Your original photos are processed securely and are not shared with third parties or used for training AI models without explicit consent.</p>
                <h3 className="text-lg font-semibold text-white">2. Data Retention</h3>
                <p>Images uploaded during the virtual try-on session are temporarily stored to generate the result and are automatically deleted from our active servers shortly after processing is complete.</p>
                <h3 className="text-lg font-semibold text-white">3. User Responsibilities</h3>
                <p>By using our service, you agree not to upload inappropriate, copyrighted, or sensitive material. You retain all rights to your original uploaded images.</p>
                <h3 className="text-lg font-semibold text-white">4. Liability</h3>
                <p>The virtual try-on results are AI-generated estimations. We do not guarantee perfect accuracy of fit, color, or fabric representation.</p>
              </div>
              <div className="p-4 border-t border-white/10 bg-black/40 flex justify-end">
                <button onClick={onClose} className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-lg font-medium transition-colors">I Understand</button>
              </div>
            </motion.div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};
