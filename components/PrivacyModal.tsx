import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment key="privacy-modal-container">
          <motion.div
            key="privacy-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              key="privacy-content"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl relative"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                <h2 className="text-xl font-bold text-white tracking-wide">Privacy Policy & Terms</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 overflow-y-auto text-gray-300 text-sm space-y-6 flex-1">
                <section>
                  <h3 className="text-[#007AFF] font-bold mb-2 uppercase text-xs tracking-wider">1. Data Privacy</h3>
                  <p>
                    At M_FIT, your privacy is our priority. Any photos you upload are processed securely and
                    are explicitly not shared with third parties or used to train public AI models.
                    Once processing is complete, your images are deleted from our active servers.
                  </p>
                </section>

                <section>
                  <h3 className="text-[#007AFF] font-bold mb-2 uppercase text-xs tracking-wider">2. Terms of Service</h3>
                  <p>
                    By using this application, you agree to our terms of service. This service is provided &quot;as is&quot;
                    for demonstration and personal use. M_FIT reserves the right to suspend access in cases of misuse.
                  </p>
                </section>

                <section>
                  <h3 className="text-[#007AFF] font-bold mb-2 uppercase text-xs tracking-wider">3. AI Generation</h3>
                  <p>
                    The results produced by M_FIT are AI-generated representations. While we strive for high fidelity,
                    actual physical fit may vary. The AI models employed are designed to respect the source images
                    without altering your fundamental identity.
                  </p>
                </section>

                <section>
                  <h3 className="text-[#007AFF] font-bold mb-2 uppercase text-xs tracking-wider">4. Contact</h3>
                  <p>
                    If you have any questions or concerns regarding your data or these terms, please contact our support team.
                  </p>
                </section>
              </div>

              <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}