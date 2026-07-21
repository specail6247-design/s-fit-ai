import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LegalModal({ isOpen, onClose }: LegalModalProps) {
  if (!isOpen) return null;

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
            className="relative w-full max-w-2xl max-h-[80vh] flex flex-col bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white tracking-tight">Privacy Policy & Terms</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar text-sm text-gray-300 space-y-6">
              <section>
                <h3 className="text-lg font-bold text-[#007AFF] mb-3">1. Data Privacy & Photo Processing</h3>
                <p className="mb-2 text-xs leading-relaxed">
                  At S_FIT AI, your privacy is our highest priority. The photos you upload for virtual try-on are processed securely in real-time.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-400">
                  <li>Photos are processed securely and <strong>never shared</strong> with third parties.</li>
                  <li>We do not store your personal photos on our servers after the session ends.</li>
                  <li>Facial features are used solely for the generation of the try-on result.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-[#007AFF] mb-3">2. Terms of Service</h3>
                <p className="mb-2 text-xs leading-relaxed">
                  By using S_FIT AI, you agree to these terms:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-400">
                  <li>You must have the right to use the photos you upload.</li>
                  <li>Generated images are for personal use and entertainment.</li>
                  <li>Do not use the service to generate inappropriate or offensive content.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-[#007AFF] mb-3">3. Subscriptions (Premium)</h3>
                <p className="mb-2 text-xs leading-relaxed text-gray-400">
                  Premium subscriptions are billed monthly. You can cancel anytime. No refunds are provided for partial months.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/50">
              <button
                onClick={onClose}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
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
