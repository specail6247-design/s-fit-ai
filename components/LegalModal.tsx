'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function LegalModal() {
  const { isLegalModalOpen, setLegalModalOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  if (!isLegalModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLegalModalOpen(false)}
        />
        <motion.div
          className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#141414]">
            <h2 className="text-xl font-bold tracking-tight text-white">Legal Information</h2>
            <button
              onClick={() => setLegalModalOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'privacy' ? 'border-[#007AFF] text-[#007AFF]' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex-1 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'terms' ? 'border-[#007AFF] text-[#007AFF]' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              Terms of Service
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 text-sm text-gray-300 leading-relaxed space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {activeTab === 'privacy' ? (
              <>
                <h3 className="text-white font-bold text-lg mb-2">Privacy Policy</h3>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>
                  At S_FIT AI, we prioritize the privacy and security of your personal data. This Privacy Policy outlines how we collect, use, and protect your information when you use our virtual fitting services.
                </p>

                <h4 className="text-white font-bold mt-4">1. Data Collection</h4>
                <p>
                  We collect user-uploaded photos solely for the purpose of generating virtual try-on results. These photos are processed securely and are not used for training our models without explicit consent.
                </p>

                <h4 className="text-white font-bold mt-4">2. Data Security</h4>
                <p>
                  All images are processed in volatile memory and are automatically deleted from our processing servers after the fitting session is complete. We implement industry-standard encryption protocols to protect data in transit.
                </p>

                <h4 className="text-white font-bold mt-4">3. Third-Party Services</h4>
                <p>
                  We may use trusted third-party cloud providers for GPU processing. These providers are bound by strict data processing agreements to ensure your privacy.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-white font-bold text-lg mb-2">Terms of Service</h3>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>
                  By accessing or using S_FIT AI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>

                <h4 className="text-white font-bold mt-4">1. Acceptable Use</h4>
                <p>
                  You agree to use our services only for lawful purposes. You must not upload images that are illegal, offensive, or infringe upon the rights of others.
                </p>

                <h4 className="text-white font-bold mt-4">2. Intellectual Property</h4>
                <p>
                  The technology and software underlying the S_FIT AI services are the property of S_FIT AI. The images you generate are licensed to you for personal use.
                </p>

                <h4 className="text-white font-bold mt-4">3. Disclaimer of Warranties</h4>
                <p>
                  The services are provided &quot;as is&quot; without warranties of any kind. While we strive for realism, virtual fitting results are simulations and may not perfectly reflect physical garments.
                </p>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 bg-[#141414] text-center">
             <button
               onClick={() => setLegalModalOpen(false)}
               className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors text-sm"
             >
               I Understand
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
