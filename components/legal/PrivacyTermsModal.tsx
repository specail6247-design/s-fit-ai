import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyTermsModal({ isOpen, onClose }: PrivacyTermsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-2xl bg-[#111] border border-white/20 rounded-2xl overflow-hidden shadow-2xl max-h-[80vh] flex flex-col"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
            <h2 className="text-xl font-bold text-white">Privacy Policy & Terms of Service</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              ✕
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-300">
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">1. Privacy Policy</h3>
              <p className="mb-2">We take your privacy seriously. The photos you upload are processed securely for the sole purpose of generating your virtual try-on experience.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Photos are not shared with third parties.</li>
                <li>Data is transmitted securely using encryption.</li>
                <li>We do not store your uploaded images or generated results after your session ends.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">2. Data Processing</h3>
              <p className="mb-2">By using S_FIT AI, you consent to our processing of the images you provide. The processing is done in real-time and we prioritize data safety and confidentiality.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">3. Terms of Service</h3>
              <p className="mb-2">S_FIT AI is provided &quot;as is&quot; without any warranties. Users must be 13 years or older to use this service.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Do not upload inappropriate or explicit content.</li>
                <li>The generated images are for personal use only.</li>
                <li>We reserve the right to terminate access for terms violations.</li>
              </ul>
            </section>
          </div>

          <div className="p-6 border-t border-white/10 bg-[#1a1a1a] flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
