import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-void-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div className="relative glass-card p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">{type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}</h3>
            <button onClick={onClose} className="text-soft-gray hover:text-white">✕</button>
          </div>
          <div className="text-sm text-soft-gray space-y-4">
            {type === 'privacy' ? (
              <>
                <p><strong>1. Data Collection:</strong> We collect photos and basic usage data to provide the virtual try-on experience.</p>
                <p><strong>2. Data Safety:</strong> Your photos are processed securely and are not shared with third parties without your consent.</p>
                <p><strong>3. Usage:</strong> Data is used solely for improving our fitting algorithm and your personal experience.</p>
              </>
            ) : (
              <>
                <p><strong>1. Acceptance:</strong> By using S_FIT AI, you agree to these terms.</p>
                <p><strong>2. User Content:</strong> You retain ownership of your photos, but grant us a license to process them for the try-on feature.</p>
                <p><strong>3. Limitation of Liability:</strong> We provide this service &quot;as is&quot; and are not liable for any generated content.</p>
              </>
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-border-color">
            <button onClick={onClose} className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">Close</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
