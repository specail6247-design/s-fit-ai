'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

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
      ease: [0.16, 1, 0.3, 1],
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
  const { isPrivacyOpen, togglePrivacyModal } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  const handleClose = () => {
    togglePrivacyModal(false);
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
            className="relative w-full max-w-2xl glass-card overflow-hidden max-h-[80vh] flex flex-col"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-void-black/50">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                    activeTab === 'privacy' ? 'text-cyber-lime' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                    activeTab === 'terms' ? 'text-cyber-lime' : 'text-gray-500 hover:text-white'
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

            {/* Content */}
            <div className="p-8 overflow-y-auto custom-scrollbar">
              {activeTab === 'privacy' ? (
                <div className="space-y-6 text-sm text-gray-300">
                  <section>
                    <h3 className="text-white font-bold mb-2">1. Data Collection & Usage</h3>
                    <p>
                      At S_FIT AI, we take your privacy seriously. We collect images solely for the purpose of providing the virtual try-on experience.
                      Your photos are processed securely and are not shared with third parties without your explicit consent.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2">2. Image Processing</h3>
                    <p>
                      Uploaded images are processed using our AI algorithms to generate the fitting result.
                      We do not store your original photos permanently. They are automatically deleted from our servers after the session expires or upon your request.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2">3. User Rights</h3>
                    <p>
                      You have the right to request the deletion of any data associated with your session.
                      Please use the Support Hub to report any concerns regarding your data.
                    </p>
                  </section>
                </div>
              ) : (
                <div className="space-y-6 text-sm text-gray-300">
                  <section>
                    <h3 className="text-white font-bold mb-2">1. Acceptance of Terms</h3>
                    <p>
                      By accessing and using S_FIT AI, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2">2. Use License</h3>
                    <p>
                      Permission is granted to temporarily download one copy of the materials (information or software) on S_FIT AI's website for personal, non-commercial transitory viewing only.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2">3. Disclaimer</h3>
                    <p>
                      The materials on S_FIT AI's website are provided on an 'as is' basis. S_FIT AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                  </section>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-void-black/50 text-center text-xs text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
