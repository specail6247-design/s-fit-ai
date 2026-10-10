import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300 space-y-4">
              {type === 'privacy' ? (
                <>
                  <h3 className="text-white font-semibold">1. Data Collection</h3>
                  <p>We only collect photos explicitly uploaded for the virtual try-on experience. These photos are processed securely and are never used for any other purpose.</p>

                  <h3 className="text-white font-semibold mt-4">2. Data Processing</h3>
                  <p>Photos are temporarily processed by our AI engines to generate your fitting results. They are not permanently stored on our servers.</p>

                  <h3 className="text-white font-semibold mt-4">3. Third-Party Services</h3>
                  <p>We use trusted third-party AI providers to process images. They are bound by strict confidentiality agreements and do not retain your data.</p>
                </>
              ) : (
                <>
                  <h3 className="text-white font-semibold">1. Usage Rights</h3>
                  <p>By using S_FIT AI, you agree to use the service for personal, non-commercial purposes unless explicitly authorized.</p>

                  <h3 className="text-white font-semibold mt-4">2. User Content</h3>
                  <p>You retain all rights to the images you upload. You are responsible for ensuring you have the right to use and upload such images.</p>

                  <h3 className="text-white font-semibold mt-4">3. Disclaimer</h3>
                  <p>The virtual try-on results are AI-generated approximations and may not perfectly reflect the real-world fit or appearance of the garments.</p>
                </>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Acknowledge
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}