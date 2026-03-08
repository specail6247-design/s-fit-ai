'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyTermsModal({ isOpen, onClose }: PrivacyTermsModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl z-[101] overflow-hidden flex flex-col max-h-[85vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`text-sm font-bold tracking-wider uppercase transition-colors ${
                    activeTab === 'privacy' ? 'text-[#007AFF]' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`text-sm font-bold tracking-wider uppercase transition-colors ${
                    activeTab === 'terms' ? 'text-[#007AFF]' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  Terms of Service
                </button>
              </div>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 text-sm text-white/70 space-y-4">
              {activeTab === 'privacy' ? (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold text-white mb-4">Privacy Policy</h2>
                  <p>
                    <strong>Last Updated:</strong> Today
                  </p>
                  <p>
                    At S_FIT AI, we prioritize your privacy and are committed to protecting your personal information.
                    This Privacy Policy outlines how we handle data collected through our virtual try-on services.
                  </p>
                  <h3 className="text-white font-bold mt-4">1. Data Collection</h3>
                  <p>
                    We collect photos you upload solely for the purpose of generating virtual try-on results.
                    We do not store your personal photos permanently unless you explicitly opt-in to save them.
                  </p>
                  <h3 className="text-white font-bold mt-4">2. Data Usage</h3>
                  <p>
                    Your uploaded photos are processed securely to provide you with the fitting experience.
                    They are not shared with third parties or used for training our AI models without your consent.
                  </p>
                  <h3 className="text-white font-bold mt-4">3. Security</h3>
                  <p>
                    We implement industry-standard security measures to ensure your data is safe during transit and processing.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="terms"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold text-white mb-4">Terms of Service</h2>
                  <p>
                    <strong>Last Updated:</strong> Today
                  </p>
                  <p>
                    Welcome to S_FIT AI. By using our application, you agree to comply with and be bound by the following terms.
                  </p>
                  <h3 className="text-white font-bold mt-4">1. User Content</h3>
                  <p>
                    You retain ownership of any photos you upload. By uploading content, you grant us a temporary license to process it solely for generating your virtual fitting result.
                  </p>
                  <h3 className="text-white font-bold mt-4">2. Acceptable Use</h3>
                  <p>
                    You agree not to upload inappropriate, explicit, or copyrighted content that you do not have permission to use.
                  </p>
                  <h3 className="text-white font-bold mt-4">3. Disclaimer</h3>
                  <p>
                    Our virtual fitting results are generated by AI and may not represent the exact physical fit.
                    We are not responsible for discrepancies between the virtual try-on and the actual garment.
                  </p>
                </motion.div>
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-black/50">
              <button
                onClick={onClose}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors text-sm"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
