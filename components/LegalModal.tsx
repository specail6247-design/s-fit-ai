import React from 'react';
import { motion } from 'framer-motion';

export function LegalModal({ isOpen, onClose, type }: { isOpen: boolean, onClose: () => void, type: 'privacy' | 'terms' | null }) {
  if (!isOpen) return null;
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-[#111] border border-white/20 p-6 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto z-10 text-white">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="text-sm text-gray-400 space-y-4">
          {type === 'privacy' ? (
            <>
              <p>Your privacy is important to us. Photos uploaded for virtual try-on are processed securely and are never shared with third parties.</p>
              <p>Data is stored temporarily during the session and deleted immediately after processing.</p>
            </>
          ) : (
            <>
              <p>Welcome to S_FIT AI. By using our service, you agree to these terms.</p>
              <p>You must not upload any inappropriate or copyrighted material without permission.</p>
            </>
          )}
        </div>
        <button onClick={onClose} className="mt-6 w-full py-3 bg-[#007AFF] text-white rounded-xl font-bold hover:bg-[#005bb5]">Close</button>
      </motion.div>
    </div>
  );
}
