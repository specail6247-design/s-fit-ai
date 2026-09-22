import React from 'react';
import { motion } from 'framer-motion';

export function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111] border border-white/20 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Terms of Service</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
        </div>
        <div className="text-sm text-gray-300 space-y-4">
          <p>Welcome to S_FIT AI. By using our service, you agree to these terms.</p>
          <p>You must not use the service for any illegal purposes or to process inappropriate content.</p>
        </div>
      </motion.div>
    </div>
  );
}
