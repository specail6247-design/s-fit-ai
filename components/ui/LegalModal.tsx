import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LegalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative bg-[#111] border border-white/20 p-6 max-w-lg w-full rounded-2xl shadow-2xl max-h-[80vh] flex flex-col"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Privacy Policy & Terms</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close">✕</button>
          </div>
          <div className="overflow-y-auto pr-2 space-y-4 text-sm text-gray-300 flex-1">
            <section>
              <h4 className="text-white font-bold mb-1">1. Data Privacy & Security</h4>
              <p>Your photos are processed securely to provide the virtual fitting experience. We do not store, share, or sell your personal images. All temporary processing data is deleted immediately after your session ends.</p>
            </section>
            <section>
              <h4 className="text-white font-bold mb-1">2. Terms of Service</h4>
              <p>By using S_FIT AI, you agree to use the service for personal, non-commercial purposes. The AI-generated results are approximations and may not perfectly reflect real-world fits.</p>
            </section>
            <section>
              <h4 className="text-white font-bold mb-1">3. User Content</h4>
              <p>You retain all rights to the photos you upload. You grant S_FIT AI a temporary license solely to process the image for the requested try-on service.</p>
            </section>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10">
            <button onClick={onClose} className="w-full py-3 bg-[#007AFF] text-white font-bold rounded-xl hover:bg-[#005bb5] transition-colors shadow-[0_0_15px_rgba(0,122,255,0.3)]">
              I Understand & Agree
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
