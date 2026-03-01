'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export const PrivacyModal: React.FC = () => {
  const { isPrivacyOpen, setIsPrivacyOpen, privacyActiveTab, setPrivacyActiveTab } = useStore();

  if (!isPrivacyOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-void-black border border-white/10 w-full max-w-2xl max-h-[80vh] rounded-2xl flex flex-col relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex gap-4">
              <button
                onClick={() => setPrivacyActiveTab('privacy')}
                className={`text-sm font-bold transition-colors ${
                  privacyActiveTab === 'privacy' ? 'text-white' : 'text-soft-gray hover:text-white'
                }`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setPrivacyActiveTab('terms')}
                className={`text-sm font-bold transition-colors ${
                  privacyActiveTab === 'terms' ? 'text-white' : 'text-soft-gray hover:text-white'
                }`}
              >
                Terms of Service
              </button>
            </div>
            <button
              onClick={() => setIsPrivacyOpen(false)}
              className="text-soft-gray hover:text-white transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-soft-gray">
            {privacyActiveTab === 'privacy' ? (
              <>
                <h2 className="text-xl font-bold text-white mb-4">Privacy Policy</h2>
                <p>
                  At S_FIT AI, we take your privacy seriously. This policy outlines how we collect, use, and protect your data.
                </p>
                <h3 className="text-lg font-bold text-white mt-6 mb-2">1. Data Collection</h3>
                <p>
                  We collect photos and basic biometric data (height, weight) solely for the purpose of providing virtual fitting services.
                </p>
                <h3 className="text-lg font-bold text-white mt-6 mb-2">2. Data Processing & Security</h3>
                <p>
                  Photos are processed securely in real-time. We do not use your personal images to train our core AI models without explicit consent. All data is encrypted in transit and at rest.
                </p>
                <h3 className="text-lg font-bold text-white mt-6 mb-2">3. Data Retention</h3>
                <p>
                  Uploaded images are automatically deleted from our processing servers after the fitting session is complete, unless you explicitly choose to save them to your Digital Wardrobe (Vault).
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-white mb-4">Terms of Service</h2>
                <p>
                  Welcome to S_FIT AI. By using our service, you agree to these terms.
                </p>
                <h3 className="text-lg font-bold text-white mt-6 mb-2">1. Acceptable Use</h3>
                <p>
                  You agree to upload only images for which you have the right to use. Do not upload explicit, illegal, or offensive content. Our system actively monitors and blocks inappropriate uploads.
                </p>
                <h3 className="text-lg font-bold text-white mt-6 mb-2">2. Service Limitations</h3>
                <p>
                  While our AI provides highly accurate fitting simulations, results are indicative. We do not guarantee exact physical fits.
                </p>
                <h3 className="text-lg font-bold text-white mt-6 mb-2">3. Subscription & Credits</h3>
                <p>
                  Free users receive a limited number of daily generations. Premium subscriptions provide extended access. Subscriptions can be canceled at any time.
                </p>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 flex justify-end">
            <button
              onClick={() => setIsPrivacyOpen(false)}
              className="bg-white text-black px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
