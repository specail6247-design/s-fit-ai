import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } },
};

export function PrivacyTermsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
          <motion.div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div className="relative w-full max-w-lg glass-card overflow-hidden max-h-[80vh] flex flex-col bg-[#050505] border border-white/10 rounded-2xl" variants={modalVariants}>
            <div className="p-8 overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Privacy Policy & Terms</h2>

              <div className="space-y-6 text-sm text-white/80">
                <section>
                  <h3 className="text-lg font-semibold text-white mb-2">1. Data Processing</h3>
                  <p>Your photos are securely processed to generate your virtual fitting experience. We prioritize your privacy and ensure that images are not stored permanently unless explicitly saved by you.</p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-2">2. Data Safety</h3>
                  <p>All uploaded images are processed securely and are strictly not shared with any third parties or used for training other models without your explicit consent.</p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-2">3. Terms of Service</h3>
                  <p>By using S_FIT AI, you agree to these terms. Misuse of the platform or uploading inappropriate content may result in restricted access.</p>
                </section>
              </div>

              <div className="mt-8">
                <button onClick={onClose} className="w-full py-4 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-all">
                  I Understand
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
