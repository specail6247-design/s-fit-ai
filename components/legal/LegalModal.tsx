'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } },
};

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden max-h-[80vh] flex flex-col"
            variants={modalVariants}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto text-sm text-gray-300 space-y-4">
              {type === 'privacy' ? (
                <>
                  <p><strong>1. Data Collection:</strong> We process your uploaded photos solely for the purpose of generating virtual try-on results. Photos are processed securely.</p>
                  <p><strong>2. Data Retention:</strong> Uploaded photos and generated results are not stored permanently on our servers after the session ends unless explicitly saved by you.</p>
                  <p><strong>3. Third-Party Services:</strong> We use industry-standard AI providers to process images. Your data is not used to train external models.</p>
                </>
              ) : (
                <>
                  <p><strong>1. Acceptance of Terms:</strong> By using S_FIT AI, you agree to these terms of service.</p>
                  <p><strong>2. User Content:</strong> You retain rights to photos you upload. You must not upload inappropriate or copyrighted material.</p>
                  <p><strong>3. Limitation of Liability:</strong> The service is provided &quot;as is&quot;. We are not responsible for inaccuracies in the virtual try-on generation.</p>
                </>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/50 flex justify-end">
               <button onClick={onClose} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-bold">
                 I Understand
               </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
