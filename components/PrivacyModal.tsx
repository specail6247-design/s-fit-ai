'use client';

import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.3 },
  },
};

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl bg-[#111] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
              <h2 className="text-xl font-bold text-white tracking-tight">Privacy Policy & Terms of Service</h2>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Close Privacy Modal"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto text-sm text-gray-300 space-y-6">
              <section className="space-y-2">
                <h3 className="text-white font-bold text-base">1. Information We Collect</h3>
                <p>
                  When you use S_FIT AI, we temporarily process your uploaded photos to generate a virtual try-on experience.
                  These images are processed securely and are strictly used for the purpose of fulfilling your request.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-white font-bold text-base">2. Data Safety and Retention</h3>
                <p>
                  We do not permanently store, share, or sell your photos. Once the virtual fitting session is complete,
                  all original and generated images are automatically purged from our active processing servers.
                  Your privacy and data security are our top priorities.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-white font-bold text-base">3. Usage of Generated Content</h3>
                <p>
                  The AI-generated try-on images are for your personal use. You may download or share these images
                  directly from the app. However, any content generated remains subject to our acceptable use policy.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-white font-bold text-base">4. Terms of Service</h3>
                <p>
                  By using S_FIT AI, you agree to these terms. S_FIT AI is provided &quot;as is&quot; without any warranties,
                  express or implied. We reserve the right to modify or terminate the service at any time without notice.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-white font-bold text-base">5. Contact Us</h3>
                <p>
                  If you have any questions or concerns regarding our privacy practices or these terms, please contact us
                  through the Support Hub.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-[#1a1a1a] flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}