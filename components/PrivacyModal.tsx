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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-[#0a0a0a] border border-white/20 rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl z-10"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            <h2 className="text-2xl font-bold tracking-tighter mb-6 text-[#007AFF]">Privacy Policy & Terms</h2>

            <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
              <section>
                <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">Data Safety</h3>
                <p>
                  At S_FIT AI, your privacy is our priority. We process all uploaded photos locally where possible,
                  and any cloud processing is done securely via encrypted channels. <strong>Your photos are not shared with third parties
                  and are automatically deleted after processing.</strong>
                </p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">Terms of Service</h3>
                <p>
                  By using the S_FIT AI virtual try-on service, you agree to our standard terms of service. The service is
                  provided &quot;as is&quot; for personal visualization purposes. Commercial use requires a separate enterprise license.
                </p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">Virtual Fitting Results</h3>
                <p>
                  The AI-generated virtual fitting results are estimations intended to help you visualize garments. Actual fit,
                  drape, and colors may vary in reality. S_FIT AI is not liable for purchase decisions made solely based on the virtual preview.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all uppercase tracking-widest text-xs"
              >
                I Understand & Agree
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
