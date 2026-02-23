'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

export function PrivacyModal() {
  const { showPrivacyModal, setShowPrivacyModal } = useStore();

  const handleClose = () => {
    setShowPrivacyModal(false);
  };

  return (
    <AnimatePresence>
      {showPrivacyModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[80vh] glass-card overflow-hidden flex flex-col"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h2 className="text-xl font-bold text-pure-white">Legal & Compliance</h2>
                <button onClick={handleClose} className="text-soft-gray hover:text-white transition-colors">
                    ✕
                </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto custom-scrollbar">
                <div className="space-y-8">
                    <section>
                        <h3 className="text-lg font-bold text-[#007AFF] mb-4">Privacy Policy</h3>
                        <div className="space-y-4 text-sm text-soft-gray leading-relaxed">
                            <p>
                                At S_FIT NEO, we take your privacy seriously. This policy outlines how we handle your personal data, specifically your photos and biometric information.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong className="text-white">Data Usage:</strong> Your photos are used solely for the purpose of virtual fitting. We do not sell or trade your personal images.
                                </li>
                                <li>
                                    <strong className="text-white">Data Retention:</strong> Images are processed in real-time. We do not store your photos permanently on our servers unless you explicitly save them to your &quot;Vault&quot;.
                                </li>
                                <li>
                                    <strong className="text-white">Security:</strong> All data transmission is encrypted using industry-standard protocols.
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-[#007AFF] mb-4">Terms of Service</h3>
                        <div className="space-y-4 text-sm text-soft-gray leading-relaxed">
                            <p>
                                By using S_FIT NEO, you agree to the following terms:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    You represent that you own the rights to the photos you upload.
                                </li>
                                <li>
                                    You will not upload offensive, illegal, or inappropriate content.
                                </li>
                                <li>
                                    The &quot;Virtual Try-On&quot; results are AI-generated simulations and may not perfectly reflect real-world fit.
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-white/5 text-center">
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors"
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
