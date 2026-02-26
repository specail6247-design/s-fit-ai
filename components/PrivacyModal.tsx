'use client';

// S_FIT AI - Privacy & Terms Modal
// Displays legal information and data safety details

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
  const { isPrivacyOpen, setPrivacyOpen, privacyActiveTab, setPrivacyActiveTab } = useStore();

  const handleClose = () => {
    setPrivacyOpen(false);
  };

  return (
    <AnimatePresence>
      {isPrivacyOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
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
            className="relative w-full max-w-2xl glass-card overflow-hidden flex flex-col max-h-[80vh]"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <div className="flex gap-4">
                <button
                  onClick={() => setPrivacyActiveTab('privacy')}
                  className={`text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-colors ${
                    privacyActiveTab === 'privacy'
                      ? 'bg-luxury-gold text-void-black'
                      : 'text-soft-gray hover:text-white'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setPrivacyActiveTab('terms')}
                  className={`text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-colors ${
                    privacyActiveTab === 'terms'
                      ? 'bg-luxury-gold text-void-black'
                      : 'text-soft-gray hover:text-white'
                  }`}
                >
                  Terms of Service
                </button>
              </div>
              <button
                onClick={handleClose}
                className="text-soft-gray hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="p-8 overflow-y-auto custom-scrollbar">
              {privacyActiveTab === 'privacy' ? (
                <div className="space-y-6 text-pure-white/80 text-sm leading-relaxed">
                  <div className="flex items-center gap-4 mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <span className="material-symbols-outlined text-green-400 text-3xl">shield_lock</span>
                    <div>
                      <h3 className="font-bold text-white text-lg">Your Data is Secure</h3>
                      <p className="text-xs text-soft-gray">We use enterprise-grade encryption for all image processing.</p>
                    </div>
                  </div>

                  <section>
                    <h4 className="font-bold text-white mb-2">1. Image Processing</h4>
                    <p>
                      S_FIT AI processes your uploaded photos solely for the purpose of generating virtual try-on results.
                      Images are processed on secure servers and are automatically deleted within 24 hours of generation.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mb-2">2. Data Collection</h4>
                    <p>
                      We collect minimal data necessary to provide our service, including:
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-soft-gray">
                        <li>Uploaded images (temporarily)</li>
                        <li>Device type and browser information for optimization</li>
                        <li>Usage metrics to improve our AI models</li>
                      </ul>
                    </p>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mb-2">3. No Third-Party Sharing</h4>
                    <p>
                      We do not sell, trade, or otherwise transfer your personally identifiable information or photos to outside parties.
                      This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you,
                      so long as those parties agree to keep this information confidential.
                    </p>
                  </section>
                </div>
              ) : (
                <div className="space-y-6 text-pure-white/80 text-sm leading-relaxed">
                  <section>
                    <h4 className="font-bold text-white mb-2">1. Acceptance of Terms</h4>
                    <p>
                      By accessing and using S_FIT AI, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mb-2">2. Beta Service</h4>
                    <p>
                      S_FIT AI is currently in Beta. You understand that the services may contain bugs, errors, and other problems.
                      The service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mb-2">3. User Conduct</h4>
                    <p>
                      You agree not to upload images that are illegal, offensive, or violate the rights of others.
                      We reserve the right to ban users who violate these guidelines.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mb-2">4. Intellectual Property</h4>
                    <p>
                      The generated images are for personal use. The underlying AI technology and interface design are the property of S_FIT AI.
                    </p>
                  </section>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/40 text-center">
              <p className="text-xs text-soft-gray">
                Last updated: March 15, 2025
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
