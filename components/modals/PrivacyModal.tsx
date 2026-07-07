import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/20 rounded-2xl overflow-hidden flex flex-col"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-2xl font-black italic tracking-tighter text-white">Privacy Policy & Terms</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6 text-sm text-gray-300">
              <section className="space-y-2">
                <h3 className="text-lg font-bold text-white">1. Data Collection</h3>
                <p>
                  S_FIT AI collects photos and images you upload to provide the virtual fitting experience.
                  We only process this data to generate your fitting results and do not use your personal images for other purposes without explicit consent.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-white">2. Data Storage</h3>
                <p>
                  Your uploaded photos are processed securely. Once the fitting result is generated,
                  the original images and intermediate data are temporarily cached and automatically deleted from our processing servers.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-white">3. User Rights</h3>
                <p>
                  You retain all rights to the images you upload. S_FIT AI claims no ownership over your original content.
                  You may request the deletion of any associated account data at any time through our support hub.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-white">4. Acceptable Use</h3>
                <p>
                  You agree not to upload explicit, illegal, or harmful content. S_FIT AI reserves the right to terminate access for users who violate these terms.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/50">
              <button
                onClick={onClose}
                className="w-full py-4 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,122,255,0.4)]"
              >
                Accept & Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
