import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl p-8 max-h-[80vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()} initial={{ y: 20, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.95 }}>
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <h2 className="text-xl font-bold">{title}</h2>
              <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto pr-4 space-y-4 text-sm text-gray-300">
              {type === 'privacy' ? (
                <>
                  <h3 className="text-white font-bold">1. Data Collection</h3>
                  <p>We only collect photos temporarily for virtual fitting processing. Photos are securely processed and immediately deleted from active servers after the session ends.</p>
                  <h3 className="text-white font-bold">2. Data Safety</h3>
                  <p>We do not share your biometric data or photos with third parties for marketing purposes.</p>
                </>
              ) : (
                <>
                  <h3 className="text-white font-bold">1. Acceptable Use</h3>
                  <p>You agree to only upload photos of yourself or individuals who have given explicit consent.</p>
                  <h3 className="text-white font-bold">2. Liability</h3>
                  <p>S_FIT AI is a beta service. AI-generated results may vary and are provided as-is.</p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
