'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function PrivacyTermsModal() {
  const { isPrivacyModalOpen, setPrivacyModalOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  if (!isPrivacyModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setPrivacyModalOpen(false)}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-[#111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-[#007AFF]">S_FIT</span> LEGAL
            </h2>
            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10 bg-black/30">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${
                activeTab === 'privacy'
                  ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-[#007AFF]/5'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${
                activeTab === 'terms'
                  ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-[#007AFF]/5'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Terms of Service
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-gray-300 leading-relaxed custom-scrollbar">
            {activeTab === 'privacy' ? (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-white font-bold text-base mb-2">1. Information We Collect</h3>
                  <p>
                    We collect personal information that you voluntarily provide to us when you register on the
                    Services, express an interest in obtaining information about us or our products and Services,
                    when you participate in activities on the Services, or otherwise when you contact us. This includes
                    photos uploaded for virtual try-on, which are temporarily processed and immediately deleted.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-2">2. How We Use Your Information</h3>
                  <p>
                    We process your information to provide, improve, and administer our Services, communicate with you,
                    for security and fraud prevention, and to comply with law. We do not use your personal photos for
                    training AI models without your explicit consent.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-2">3. Data Security</h3>
                  <p>
                    We have implemented appropriate and reasonable technical and organizational security measures designed
                    to protect the security of any personal information we process. However, despite our safeguards and
                    efforts to secure your information, no electronic transmission over the Internet or information
                    storage technology can be guaranteed to be 100% secure.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="terms"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-white font-bold text-base mb-2">1. Agreement to Terms</h3>
                  <p>
                    By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any
                    part of the terms, you may not access the Service.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-2">2. User Guidelines</h3>
                  <p>
                    You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages,
                    impairs or renders the Service less efficient. You are solely responsible for the content of the
                    photos you upload and must ensure you have the right to use them.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-2">3. Intellectual Property</h3>
                  <p>
                    The Service and its original content, features, and functionality are and will remain the exclusive
                    property of S_FIT AI and its licensors. Our trademarks and trade dress may not be used in connection
                    with any product or service without the prior written consent of S_FIT AI.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 bg-black/50 text-center text-xs text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
