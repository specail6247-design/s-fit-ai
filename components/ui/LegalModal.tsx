import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[80vh] bg-[var(--color-secondary)] border border-white/10 rounded-2xl shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold font-mono tracking-wider">
                {type === 'privacy' ? 'PRIVACY POLICY' : 'TERMS OF SERVICE'}
              </h2>
              <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto font-sans text-sm text-gray-300 space-y-4">
              {type === 'privacy' ? (
                <>
                  <p><strong>1. Data Collection:</strong> We collect uploaded photos temporarily to process virtual try-on requests.</p>
                  <p><strong>2. Data Processing:</strong> Photos are processed securely on our servers and are deleted immediately after the result is generated.</p>
                  <p><strong>3. Third-Party Sharing:</strong> We do not share your personal photos with third parties, except as required to provide the core service (e.g., AI inference APIs) which adhere to strict deletion policies.</p>
                  <p><strong>4. Analytics:</strong> We collect anonymized usage data to improve our services.</p>
                </>
              ) : (
                <>
                  <p><strong>1. Acceptance:</strong> By using S_FIT AI, you agree to these Terms of Service.</p>
                  <p><strong>2. Use of Service:</strong> You must not upload offensive, illegal, or copyrighted material without permission.</p>
                  <p><strong>3. Freemium Model:</strong> Free usage is limited. Premium subscriptions provide extended features.</p>
                  <p><strong>4. Limitation of Liability:</strong> S_FIT AI is provided &quot;as is&quot;. We are not responsible for any inaccuracies in virtual fittings.</p>
                </>
              )}
            </div>
            <div className="p-6 border-t border-white/10 flex justify-end">
               <button onClick={onClose} className="btn-primary text-xs uppercase tracking-widest">
                  I Understand
               </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
