'use client';

// S_FIT AI - Privacy & Terms Modal
// Clean, readable modal for legal compliance and trust

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
      ease: [0.16, 1, 0.3, 1] as const,
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
  const {
    showPrivacyModal,
    setShowPrivacyModal,
    privacyActiveTab,
    setPrivacyActiveTab
  } = useStore();

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
            className="relative w-full max-w-2xl max-h-[85vh] glass-card flex flex-col overflow-hidden shadow-2xl"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex gap-4">
                <button
                  onClick={() => setPrivacyActiveTab('privacy')}
                  className={`text-sm font-bold tracking-wider uppercase transition-colors ${
                    privacyActiveTab === 'privacy'
                      ? 'text-cyber-lime border-b-2 border-cyber-lime pb-1'
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setPrivacyActiveTab('terms')}
                  className={`text-sm font-bold tracking-wider uppercase transition-colors ${
                    privacyActiveTab === 'terms'
                      ? 'text-cyber-lime border-b-2 border-cyber-lime pb-1'
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  Terms of Service
                </button>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 text-sm text-gray-300 space-y-6 leading-relaxed bg-[#0a0a0a]">

              {privacyActiveTab === 'privacy' ? (
                // --- PRIVACY POLICY CONTENT ---
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Data Safety Badge */}
                  <div className="flex items-center gap-4 bg-green-900/20 border border-green-500/30 p-4 rounded-xl mb-8">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      <span className="material-symbols-outlined">lock</span>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-bold text-sm">Your Data is Secure</h4>
                      <p className="text-xs text-green-200/70">Photos are processed securely and automatically deleted after processing. We do not share your biometric data.</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">Privacy Policy</h3>
                  <p>Last updated: {new Date().toLocaleDateString()}</p>

                  <h4 className="text-lg font-bold text-white mt-6 mb-2">1. Introduction</h4>
                  <p>Welcome to S_FIT AI. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our application and tell you about your privacy rights and how the law protects you.</p>

                  <h4 className="text-lg font-bold text-white mt-6 mb-2">2. Data We Collect</h4>
                  <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li><strong>Image Data:</strong> User-uploaded photos for virtual try-on purposes.</li>
                    <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
                    <li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                  </ul>

                  <h4 className="text-lg font-bold text-white mt-6 mb-2">3. How We Use Your Data</h4>
                  <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>To provide the virtual try-on service.</li>
                    <li>To improve our website, products/services, marketing, and customer relationships.</li>
                  </ul>

                  <h4 className="text-lg font-bold text-white mt-6 mb-2">4. Data Retention</h4>
                  <p>We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. Uploaded images are transient and deleted shortly after processing.</p>

                  <h4 className="text-lg font-bold text-white mt-6 mb-2">5. Contact Us</h4>
                  <p>If you have any questions about this privacy policy or our privacy practices, please contact us via the Support Hub.</p>
                </motion.div>
              ) : (
                // --- TERMS OF SERVICE CONTENT ---
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-white mb-4">Terms of Service</h3>
                  <p>Last updated: {new Date().toLocaleDateString()}</p>

                  <h4 className="text-lg font-bold text-white mt-6 mb-2">1. Agreement to Terms</h4>
                  <p>By accessing our application, you agree to be bound by these Terms of Service and to use the application in accordance with these Terms, our Privacy Policy, and any additional terms and conditions that may apply to specific sections of the application or to products and services available through the application.</p>

                  <h4 className="text-lg font-bold text-white mt-6 mb-2">2. Use of Service</h4>
                  <p>You represent and warrant that you are of legal age to form a binding contract (or if you are a minor, that you have your parent&apos;s or legal guardian&apos;s permission to use the Services and that your parent or legal guardian has read and agrees to these Terms on your behalf).</p>

                  <h4 className="text-lg font-bold text-white mt-6 mb-2">3. Intellectual Property</h4>
                  <p>The Service and its original content, features and functionality are and will remain the exclusive property of S_FIT AI and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>

                  <h4 className="text-lg font-bold text-white mt-6 mb-2">4. Termination</h4>
                  <p>We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

                  <h4 className="text-lg font-bold text-white mt-6 mb-2">5. Limitation of Liability</h4>
                  <p>In no event shall S_FIT AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                </motion.div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end">
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Accept & Close
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
