import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg bg-[#111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
              <h2 className="text-xl font-bold text-white tracking-widest uppercase">Privacy Policy & Terms</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-300 flex-1 custom-scrollbar">
              <section className="space-y-2">
                <h3 className="text-[#007AFF] font-bold uppercase tracking-wider text-xs">1. Data Collection & Usage</h3>
                <p>
                  S_FIT NEO processes uploaded photos solely for the purpose of virtual fitting. Images are transiently
                  processed and are <strong>never stored persistently</strong> on our servers after your session ends.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-[#007AFF] font-bold uppercase tracking-wider text-xs">2. Data Safety</h3>
                <p>
                  Your identification photos are processed securely using end-to-end encryption.
                  We do not use your personal images to train AI models without explicit consent.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-[#007AFF] font-bold uppercase tracking-wider text-xs">3. Terms of Service</h3>
                <p>
                  By using this virtual try-on application, you agree to use it only for lawful purposes.
                  Generated composite images are for personal visualization and are not guaranteed to be exact
                  physical representations of the garments.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-[#007AFF] font-bold uppercase tracking-wider text-xs">4. Contact</h3>
                <p>
                  For privacy concerns or to request data deletion, please reach out via our Support Hub.
                </p>
              </section>
            </div>

            <div className="p-4 border-t border-white/10 bg-[#1a1a1a] flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors text-sm"
              >
                Acknowledge
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
