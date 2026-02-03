'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  // Update active tab if initialTab changes when opening (optional, but good for UX)
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

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
            className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0a0a0a]">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'privacy'
                      ? 'text-[#007AFF] bg-[#007AFF]/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'terms'
                      ? 'text-[#007AFF] bg-[#007AFF]/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Terms of Service
                </button>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto text-gray-300 text-sm leading-relaxed space-y-4">
              {activeTab === 'privacy' ? (
                <>
                  <h3 className="text-xl font-bold text-white mb-4">Privacy Policy</h3>
                  <p>Effective Date: October 26, 2023</p>

                  <h4 className="font-bold text-white mt-4">1. Information We Collect</h4>
                  <p>
                    We collect images you upload (user photos and garment photos) solely for the purpose of generating the virtual try-on result.
                    We do not store biometric data.
                  </p>

                  <h4 className="font-bold text-white mt-4">2. How We Use Information</h4>
                  <p>
                    Your photos are processed by our AI algorithms and are automatically deleted from our processing servers after the session expires.
                    We do not sell or share your personal photos with third parties for marketing purposes.
                  </p>

                  <h4 className="font-bold text-white mt-4">3. Data Security</h4>
                  <p>
                    We employ industry-standard security measures to protect your data during transmission and processing.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-4">Terms of Service</h3>
                  <p>Last Updated: October 26, 2023</p>

                  <h4 className="font-bold text-white mt-4">1. Acceptance of Terms</h4>
                  <p>
                    By accessing and using S_FIT NEO, you agree to be bound by these Terms of Service.
                  </p>

                  <h4 className="font-bold text-white mt-4">2. Use License</h4>
                  <p>
                    Permission is granted to temporarily use the materials (information or software) on S_FIT NEO for personal, non-commercial transitory viewing only.
                  </p>

                  <h4 className="font-bold text-white mt-4">3. Disclaimer</h4>
                  <p>
                    The materials on S_FIT NEO are provided on an &apos;as is&apos; basis. S_FIT NEO makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-[#0a0a0a] flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
