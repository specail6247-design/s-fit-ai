import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export default function PrivacyTermsModal({ isOpen, onClose, initialTab = 'privacy' }: PrivacyTermsModalProps) {
  const [activeTab, setActiveTab] = React.useState<'privacy' | 'terms'>(initialTab);

  // Update tab if prop changes
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="relative w-full max-w-2xl max-h-[85vh] bg-[#111] border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
            <h2 className="text-xl font-bold text-white tracking-tight">Legal Hub</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors relative ${
                activeTab === 'privacy' ? 'text-[#007AFF]' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Privacy Policy
              {activeTab === 'privacy' && (
                <motion.div layoutId="legal-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors relative ${
                activeTab === 'terms' ? 'text-[#007AFF]' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Terms of Service
              {activeTab === 'terms' && (
                <motion.div layoutId="legal-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto text-sm text-gray-300 space-y-6 flex-1 custom-scrollbar">
            {activeTab === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <section>
                  <h3 className="text-white font-bold text-base mb-2">1. Data Collection & Processing</h3>
                  <p>
                    We collect photos you upload strictly for the purpose of providing the virtual try-on experience.
                    Your photos are processed securely via encrypted channels and are deleted from our active servers
                    immediately after the try-on result is generated.
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold text-base mb-2">2. Facial Recognition</h3>
                  <p>
                    Our AI models do not perform facial recognition to identify individuals. The models only analyze
                    body posture and clothing boundaries to synthesize the final image.
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold text-base mb-2">3. Third-Party Services</h3>
                  <p>
                    We utilize third-party AI compute providers (e.g., Replicate). These providers are contractually
                    bound to not use your images for training their foundational models without explicit consent.
                  </p>
                </section>
              </motion.div>
            )}

            {activeTab === 'terms' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <section>
                  <h3 className="text-white font-bold text-base mb-2">1. Acceptable Use</h3>
                  <p>
                    By using S_FIT AI, you agree not to upload inappropriate, offensive, or copyrighted materials.
                    The service is intended for personal, non-commercial fashion preview purposes.
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold text-base mb-2">2. Intellectual Property</h3>
                  <p>
                    The generated try-on images are for your personal use. The underlying technology, branding,
                    and UI/UX remain the intellectual property of S_FIT AI.
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold text-base mb-2">3. Limitation of Liability</h3>
                  <p>
                    While we strive for hyper-realistic results, the generated images are approximations. We are not
                    liable for purchasing decisions made based solely on the virtual try-on representation.
                  </p>
                </section>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 shrink-0 bg-black/20 text-center">
            <p className="text-[10px] text-gray-500 font-mono">LAST UPDATED: MARCH 2024</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
