'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 }
  }
};

export default function PrivacyTermsModal({ isOpen, onClose }: PrivacyTermsModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="absolute inset-0 bg-void-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            variants={modalVariants}
          >
            {/* Header / Tabs */}
            <div className="flex items-center justify-between border-b border-white/10 bg-black/40 p-4 shrink-0">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors ${activeTab === 'privacy' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors ${activeTab === 'terms' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                >
                  Terms of Service
                </button>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-2"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Content Area */}
            <div className="p-8 overflow-y-auto custom-scrollbar flex-1 relative text-sm text-gray-300 leading-relaxed space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'privacy' ? (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-black text-white mb-4">Privacy Policy</h2>
                      <p>Last Updated: {new Date().toLocaleDateString()}</p>

                      <section>
                        <h3 className="text-lg font-bold text-white mb-2">1. Data Safety & Security</h3>
                        <p>At S_FIT AI, your privacy is our highest priority. All photos uploaded for the virtual try-on experience are processed securely and <strong>are never shared</strong> with third parties. Your images are used strictly for generating your fitting results and are deleted from our servers immediately after the session concludes.</p>
                      </section>

                      <section>
                        <h3 className="text-lg font-bold text-white mb-2">2. Information Collection</h3>
                        <p>We collect minimal data required to operate the application. This includes device information and usage metrics to improve the &quot;Easy Fit&quot; and &quot;Digital Twin&quot; models. Biometric data mapping is done on-device or ephemerally and is not stored long-term.</p>
                      </section>

                      <section>
                        <h3 className="text-lg font-bold text-white mb-2">3. Cookies and Tracking</h3>
                        <p>We use essential local storage (such as Zustand persist) to remember your selected preferences and daily usage count. We do not use third-party tracking cookies for advertising purposes.</p>
                      </section>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-black text-white mb-4">Terms of Service</h2>
                      <p>Last Updated: {new Date().toLocaleDateString()}</p>

                      <section>
                        <h3 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h3>
                        <p>By accessing or using the S_FIT AI application, you agree to be bound by these Terms of Service. If you do not agree, please do not use the application.</p>
                      </section>

                      <section>
                        <h3 className="text-lg font-bold text-white mb-2">2. User Conduct</h3>
                        <p>You agree to only upload photos that you have the right to use. You must not upload offensive, explicit, or inappropriate content. The AI generation models are heavily monitored and will reject non-compliant images.</p>
                      </section>

                      <section>
                        <h3 className="text-lg font-bold text-white mb-2">3. Freemium Usage</h3>
                        <p>The free tier of S_FIT AI is subject to a daily limit of 5 try-ons. Attempts to bypass this limit mechanically or maliciously may result in a ban. Premium subscriptions provide unlimited access per the described features.</p>
                      </section>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 bg-black/40 p-4 shrink-0 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-colors"
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
