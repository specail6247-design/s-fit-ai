import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function LegalModal({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void, type: 'privacy' | 'terms' | null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const content = type === 'privacy' ? (
    <div className="space-y-4 text-sm text-gray-300">
      <h3 className="text-xl font-bold text-white mb-4">Privacy Policy</h3>
      <p>Last updated: April 2024</p>
      <h4 className="text-white font-bold mt-4">1. Information We Collect</h4>
      <p>We collect photos uploaded for the virtual try-on experience. These photos are processed securely to generate your digital fitting.</p>
      <h4 className="text-white font-bold mt-4">2. How We Use Your Information</h4>
      <p>Your photos are only used to provide the virtual fitting service. They are securely processed and not shared with third parties for marketing purposes.</p>
      <h4 className="text-white font-bold mt-4">3. Data Security</h4>
      <p>We implement strict security measures to protect your personal information and uploaded images from unauthorized access.</p>
    </div>
  ) : type === 'terms' ? (
    <div className="space-y-4 text-sm text-gray-300">
      <h3 className="text-xl font-bold text-white mb-4">Terms of Service</h3>
      <p>Last updated: April 2024</p>
      <h4 className="text-white font-bold mt-4">1. Acceptance of Terms</h4>
      <p>By using S_FIT AI, you agree to these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
      <h4 className="text-white font-bold mt-4">2. User Responsibilities</h4>
      <p>You agree to only upload images you have the right to use. You must not use the service for any illegal or unauthorized purpose.</p>
      <h4 className="text-white font-bold mt-4">3. Service Limitations</h4>
      <p>The virtual try-on results are AI-generated representations. Actual fit and appearance may vary in reality.</p>
    </div>
  ) : null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl z-[70] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-lg font-bold font-mono text-white">Legal Information</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-xl leading-none">✕</button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {content}
            </div>

            <div className="p-4 border-t border-white/5 bg-black/30 flex justify-end">
               <button onClick={onClose} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-bold transition-colors">
                 Close
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
