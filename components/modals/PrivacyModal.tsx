import React from 'react';
import { motion } from 'framer-motion';

export function PrivacyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111] border border-white/20 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
        </div>
        <div className="text-sm text-gray-300 space-y-4">
          <p>Your privacy is important to us. S_FIT AI processes your photos securely to provide the virtual try-on experience.</p>
          <p>We do not share your personal photos with third parties, and they are deleted from our active servers after processing.</p>
        </div>
      </motion.div>
    </div>
  );
}
