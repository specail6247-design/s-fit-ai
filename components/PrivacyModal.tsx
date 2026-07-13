import React from 'react';
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
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } },
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
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-2xl font-bold text-white tracking-tight">Privacy Policy & Terms</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors text-xl p-2"
              >
                ✕
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="p-8 overflow-y-auto space-y-6 text-gray-300 text-sm leading-relaxed">
              <section>
                <h3 className="text-lg font-bold text-white mb-2">1. Information We Collect</h3>
                <p>
                  S_FIT AI collects photos you upload for virtual try-on purposes.
                  We prioritize your privacy and ensure that these images are processed securely.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">2. How We Use Your Information</h3>
                <p>
                  Your uploaded photos are strictly used to generate the virtual fitting results.
                  They are temporarily processed by our AI engines and are not used for any other purpose.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">3. Data Security & Storage</h3>
                <p>
                  We implement robust security measures to protect your data.
                  User photos are not permanently stored on our servers and are automatically deleted after the processing session is complete, unless explicitly saved by the user for sharing.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">4. Third-Party Services</h3>
                <p>
                  We may use third-party AI models (e.g., Fashn.ai) to process the images. These partners are bound by strict confidentiality agreements and do not retain your photos.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">5. Terms of Service</h3>
                <p>
                  By using S_FIT AI, you agree to not upload explicit, illegal, or copyrighted material without permission. We reserve the right to terminate access for violating these terms.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors"
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
