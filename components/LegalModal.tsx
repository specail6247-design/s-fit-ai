'use client';
import { motion, AnimatePresence } from 'framer-motion';

export function LegalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div className="relative bg-[#111] border border-white/10 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
            <h2 className="text-xl font-bold mb-4 text-white">Privacy Policy & Terms</h2>
            <div className="text-sm text-gray-300 space-y-4">
              <p><strong>1. Data Collection:</strong> We collect user photos solely for the purpose of virtual fitting.</p>
              <p><strong>2. Data Safety:</strong> Photos are processed securely and are NOT shared with third parties.</p>
              <p><strong>3. Terms of Use:</strong> By using S_FIT AI, you agree to these terms.</p>
            </div>
            <button onClick={onClose} className="mt-6 w-full py-3 bg-[#007AFF] text-white rounded-xl font-bold hover:bg-[#005bb5] transition-colors">I Understand</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
