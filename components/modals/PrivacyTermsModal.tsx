'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function PrivacyTermsModal() {
  const { isPrivacyOpen, setPrivacyOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <AnimatePresence>
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPrivacyOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-bold tracking-tight">Legal & Compliance</h2>
              <button
                onClick={() => setPrivacyOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-2"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'privacy' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-400 hover:text-white'}`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'terms' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-400 hover:text-white'}`}
              >
                Terms of Service
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-gray-300 leading-relaxed">
              {activeTab === 'privacy' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
                  <p><strong>Last Updated:</strong> March 2024</p>
                  <p>At S_FIT AI, we take your privacy seriously. This policy outlines how we handle the photos you upload and the data we generate.</p>

                  <h4 className="font-bold text-white mt-4">1. Data Collection & Processing</h4>
                  <p>When you use the virtual fitting feature, the photos you upload (user photo, garment photo) are temporarily sent to our AI backend (Replicate API) solely for the purpose of generating the fitting result.</p>

                  <h4 className="font-bold text-white mt-4">2. Data Retention & Safety</h4>
                  <p><strong>We do not store or share your photos.</strong> Once the fitting image is generated and sent back to your device, the uploaded source images are immediately discarded from our servers. We do not use your photos to train our AI models.</p>

                  <h4 className="font-bold text-white mt-4">3. Third-Party Services</h4>
                  <p>We rely on trusted third-party cloud providers (like Vercel and Replicate) to run our services securely. They are bound by strict data processing agreements.</p>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Terms of Service</h3>
                  <p><strong>Last Updated:</strong> March 2024</p>
                  <p>By using S_FIT AI, you agree to the following terms and conditions.</p>

                  <h4 className="font-bold text-white mt-4">1. Acceptable Use</h4>
                  <p>You agree to only upload photos that you own or have explicit permission to use. You must not upload any explicit, offensive, or illegal content. Our system includes automated safety filters that may block such content.</p>

                  <h4 className="font-bold text-white mt-4">2. AI Generation Disclaimer</h4>
                  <p>The virtual fitting results are AI-generated estimations. S_FIT AI does not guarantee 100% accuracy in garment fit, color reproduction, or texture mapping. The generated images are for personal visualization purposes only.</p>

                  <h4 className="font-bold text-white mt-4">3. Fair Usage</h4>
                  <p>To ensure server stability, free users are limited to a certain number of AI generations per day. Attempting to bypass these limits may result in access restrictions.</p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/50 flex justify-end">
              <button
                onClick={() => setPrivacyOpen(false)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
              >
                I Understand
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
