import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LegalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div className="relative bg-[#111] border border-white/20 p-6 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto text-white shadow-2xl" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
          <h2 className="text-2xl font-bold mb-4">Privacy Policy & Terms</h2>
          <div className="space-y-4 text-sm text-gray-400">
            <h3 className="text-white font-bold">1. Data Privacy</h3>
            <p>Your photos are processed securely. We do not store or share your personal images with third parties without your explicit consent.</p>
            <h3 className="text-white font-bold">2. Terms of Service</h3>
            <p>By using S_FIT AI, you agree to our terms. This service is provided &quot;as is&quot; without warranties.</p>
            <h3 className="text-white font-bold">3. Acceptable Use</h3>
            <p>You agree not to upload inappropriate or copyrighted content. We reserve the right to suspend accounts that violate these terms.</p>
          </div>
          <button onClick={onClose} className="mt-6 w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors">Accept & Close</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
