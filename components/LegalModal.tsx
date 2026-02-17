'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export const LegalModal = () => {
  const { isLegalModalOpen, toggleLegalModal, activeLegalTab, setActiveLegalTab } = useStore();

  if (!isLegalModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={() => toggleLegalModal(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
            <h2 className="text-xl font-bold tracking-tight">Legal & Compliance</h2>
            <button
              onClick={() => toggleLegalModal(false)}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveLegalTab('privacy')}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                activeLegalTab === 'privacy'
                  ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-white/5'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveLegalTab('terms')}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                activeLegalTab === 'terms'
                  ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-white/5'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Terms of Service
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto custom-scrollbar flex-1 text-gray-300 text-sm leading-relaxed space-y-4">
            {activeLegalTab === 'privacy' ? (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>
                  At S_FIT AI, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information, specifically regarding the images you upload for our virtual try-on service.
                </p>

                <h4 className="text-white font-bold mt-4">1. Information We Collect</h4>
                <p>We collect images you upload (photos of yourself and garments) solely for the purpose of generating the virtual try-on result.</p>

                <h4 className="text-white font-bold mt-4">2. How We Use Your Data</h4>
                <p>Your photos are processed by our AI algorithms to create the composite image. We do not use your photos for any other purpose, such as marketing or training public models, without your explicit consent.</p>

                <h4 className="text-white font-bold mt-4">3. Data Retention</h4>
                <p>Uploaded images are temporarily stored to perform the processing and are deleted shortly after the session ends or upon your request. We do not maintain a permanent database of user photos.</p>

                <h4 className="text-white font-bold mt-4">4. Third-Party Services</h4>
                <p>We may use trusted third-party cloud providers (e.g., Replicate, Vercel) to process and host our services. These providers adhere to strict security standards.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Terms of Service</h3>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>
                  Welcome to S_FIT AI. By using our service, you agree to these Terms. Please read them carefully.
                </p>

                <h4 className="text-white font-bold mt-4">1. Acceptance of Terms</h4>
                <p>By accessing or using S_FIT AI, you agree to be bound by these Terms and all applicable laws and regulations.</p>

                <h4 className="text-white font-bold mt-4">2. User Conduct</h4>
                <p>You agree not to upload any content that is illegal, offensive, or violates the rights of others. You must own the rights to the photos you upload.</p>

                <h4 className="text-white font-bold mt-4">3. Disclaimer</h4>
                <p>The virtual try-on results are AI-generated simulations and may not perfectly reflect real-life fit or appearance. S_FIT AI is provided &quot;as is&quot; without warranties of any kind.</p>

                <h4 className="text-white font-bold mt-4">4. Limitation of Liability</h4>
                <p>S_FIT AI shall not be liable for any indirect, incidental, or consequential damages arising from the use of our service.</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 bg-white/5 text-center">
            <button
              onClick={() => toggleLegalModal(false)}
              className="px-8 py-2 bg-[#007AFF] hover:bg-[#0062cc] text-white rounded-lg text-sm font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
