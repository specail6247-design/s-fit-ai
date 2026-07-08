import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PrivacyTermsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
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
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] flex flex-col relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 font-sans text-white">Privacy Policy & Terms</h2>
            <div className="flex-1 overflow-y-auto pr-2 text-sm text-gray-300 space-y-4 font-sans">
              <section>
                <h3 className="text-white font-bold mb-2">1. Data Privacy & Security</h3>
                <p>Your photos are processed securely for the sole purpose of virtual fitting. We do not store or share your personal images without explicit consent. All processing is done ephemerally where possible.</p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-2">2. Terms of Service</h3>
                <p>By using S_FIT, you agree to our Terms of Service. This includes not uploading inappropriate content and respecting copyright for garment images.</p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-2">3. User Consent</h3>
                <p>You retain all rights to your uploaded photos. Generated images are provided for your personal use.</p>
              </section>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors"
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
