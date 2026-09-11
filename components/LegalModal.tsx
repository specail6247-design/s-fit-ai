import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LegalModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-xl font-bold text-white tracking-widest uppercase">Privacy Policy & Terms</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">✕</button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-gray-300 space-y-6 flex-1">
              <section>
                <h3 className="text-white font-bold mb-2">1. Data Privacy</h3>
                <p>Your photos are processed securely and are never shared with third parties. All uploaded images are temporarily stored during the fitting process and permanently deleted thereafter.</p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-2">2. Terms of Service</h3>
                <p>By using S_FIT, you agree to our terms. This service is provided for virtual fitting visualization purposes.</p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-2">3. User Consent</h3>
                <p>You must own the rights to the photos you upload. We reserve the right to block usage if terms are violated.</p>
              </section>
            </div>
            <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end">
              <button onClick={onClose} className="px-6 py-2 bg-[#007AFF] text-white rounded-lg hover:bg-[#005bb5] transition-colors font-bold text-xs uppercase tracking-widest">
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
