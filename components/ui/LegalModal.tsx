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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Privacy Policy & Terms of Service</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-gray-300">
              <section>
                <h3 className="text-white font-bold mb-2">1. Privacy Policy</h3>
                <p className="mb-2">Your privacy is important to us. It is S_FIT AI&apos;s policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
                <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2">2. Data Processing & Photo Uploads</h3>
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/5 mb-4 flex items-start gap-3">
                  <div className="text-[#007AFF] text-xl">🔒</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Data Safety Guarantee</h4>
                    <p className="text-xs text-gray-400">Photos uploaded for virtual try-on are processed securely and temporarily. We do not store, share, or use your photos for any purpose other than generating your fitting result.</p>
                  </div>
                </div>
                <p>Uploaded photos are processed on secure servers and are automatically deleted after your session ends.</p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2">3. Terms of Service</h3>
                <p>By accessing our app, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
              </section>
            </div>

            <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
              <button
                onClick={onClose}
                className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
