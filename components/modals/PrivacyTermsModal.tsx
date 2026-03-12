'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function PrivacyTermsModal() {
  const { isPrivacyTermsOpen, setIsPrivacyTermsOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  if (!isPrivacyTermsOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setIsPrivacyTermsOpen(false)}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#111]">
            <h2 className="text-xl font-bold tracking-tight">Legal & Compliance</h2>
            <button
              onClick={() => setIsPrivacyTermsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 bg-[#111]">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'privacy' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'terms' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Terms of Service
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-white/10 text-gray-300 text-sm leading-relaxed space-y-6">
            {activeTab === 'privacy' && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">1. Data Collection & Processing</h3>
                  <p>
                    When you use S_FIT NEO, we collect the images you upload (user photos and garment images) solely for the purpose of generating your virtual fitting result. These images are processed securely using our cloud infrastructure.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">2. Data Safety & Storage</h3>
                  <p>
                    We prioritize your privacy. Photos uploaded are processed securely and are NOT shared with any third parties or used to train public AI models without your explicit consent. Temporary files generated during the try-on process are automatically deleted from our servers shortly after your session ends.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">3. User Rights</h3>
                  <p>
                    You have the right to request the deletion of any data associated with your account. Since our core service operates ephemerally for guest users, your images do not persist beyond the active session.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'terms' && (
              <motion.div
                key="terms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">1. Acceptance of Terms</h3>
                  <p>
                    By accessing or using S_FIT NEO, you agree to be bound by these Terms of Service. If you do not agree, please do not use our application.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">2. Acceptable Use</h3>
                  <p>
                    You agree to only upload images for which you have the legal right to use. You must not upload offensive, illegal, or inappropriate content. We reserve the right to terminate access for users who violate these guidelines.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">3. Intellectual Property</h3>
                  <p>
                    The generated fitting results are for personal use. S_FIT AI retains the rights to the underlying technology, algorithms, and branding elements included in exported materials.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-4 border-t border-white/10 bg-[#0a0a0a] flex justify-end">
             <button
              onClick={() => setIsPrivacyTermsOpen(false)}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors text-sm"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
