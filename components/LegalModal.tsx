'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const content = type === 'privacy'
    ? {
        title: "Privacy Policy",
        body: "Your privacy is paramount. We process your photos securely to generate your virtual fitting results. Photos are not shared with third parties or used for training without explicit consent. Data is transient and deleted from our servers after your session."
      }
    : {
        title: "Terms of Service",
        body: "By using S_FIT, you agree to our terms. This service is provided 'as is'. Do not upload inappropriate or explicit content. S_FIT reserves the right to terminate access for users violating these terms."
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment key="modal-container">
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#111] border border-white/20 rounded-2xl p-8 z-50 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-4">{content.title}</h2>
            <div className="text-gray-400 text-sm leading-relaxed max-h-[60vh] overflow-y-auto">
              {content.body}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
              >
                Acknowledge
              </button>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
