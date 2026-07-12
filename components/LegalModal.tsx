import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LegalModal({ isOpen, onClose }: LegalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#111] border border-white/20 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] flex flex-col relative shadow-2xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close modal"
            >
              ✕
            </button>

            <h2 className="text-2xl font-black italic tracking-tighter text-white mb-6">
              LEGAL & <span className="text-[#007AFF]">COMPLIANCE</span>
            </h2>

            <div className="flex-1 overflow-y-auto pr-4 space-y-6 text-sm text-gray-300 custom-scrollbar">
              <section className="space-y-2">
                <h3 className="text-[#007AFF] font-bold uppercase tracking-widest text-xs">Privacy Policy</h3>
                <p>
                  At S_FIT NEO, your privacy is our priority. We are committed to protecting your personal data, particularly the images you upload for our virtual try-on experience.
                </p>
                <p>
                  <strong>Data Usage:</strong> Photos uploaded are processed securely in real-time to generate your fitting results. We do not store, share, or sell your personal images to third parties.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-[#007AFF] font-bold uppercase tracking-widest text-xs">Terms of Service</h3>
                <p>
                  By using S_FIT NEO, you agree to use the service for personal, non-commercial purposes only. The generated images remain your property, but we retain the rights to the AI models and underlying technology.
                </p>
                <p>
                  We reserve the right to suspend accounts that abuse the platform, including uploading inappropriate content.
                </p>
              </section>

               <section className="space-y-2">
                <h3 className="text-[#007AFF] font-bold uppercase tracking-widest text-xs">Data Safety</h3>
                <div className="p-3 bg-[#007AFF]/10 border border-[#007AFF]/30 rounded-lg flex items-start gap-3">
                  <span className="text-xl">🛡️</span>
                  <p className="text-xs text-[#007AFF]">
                    <strong>End-to-End Encryption:</strong> All data transmitted between your device and our servers is encrypted. Your photos are deleted immediately after the try-on process is complete.
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
