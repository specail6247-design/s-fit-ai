'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function LegalModal() {
  const { isLegalModalOpen, setLegalModalOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <AnimatePresence>
      {isLegalModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLegalModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-2xl h-[80vh] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50">
              <h2 className="text-xl font-bold tracking-tight text-white">
                Legal & Compliance
              </h2>
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
                className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'privacy' ? 'text-[#007AFF]' : 'text-gray-400 hover:text-white'
                }`}
              >
                Privacy Policy
                {activeTab === 'privacy' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'terms' ? 'text-[#007AFF]' : 'text-gray-400 hover:text-white'
                }`}
              >
                Terms of Service
                {activeTab === 'terms' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]"
                  />
                )}
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 text-gray-300 text-sm leading-relaxed space-y-6">
              {activeTab === 'privacy' ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Last Updated: March 2025</p>

                  <div className="space-y-2">
                    <h4 className="font-bold text-white">1. Data Collection & Usage</h4>
                    <p>
                      At S_FIT AI, we take your privacy seriously. We collect images solely for the purpose of virtual try-on processing.
                      Uploaded photos (user photos and garment images) are processed securely and are temporarily stored for the duration of your session.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-white">2. Image Processing Security</h4>
                    <p>
                      Our image processing is powered by secure cloud services. We do not use your personal photos for model training without your explicit consent.
                      All processing happens in isolated environments.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-white">3. Data Retention</h4>
                    <p>
                      User-uploaded images are automatically deleted from our processing servers after 24 hours.
                      You have full control to clear your session data at any time using the &quot;Reset Session&quot; feature.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Terms of Service</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Effective Date: March 2025</p>

                  <div className="space-y-2">
                    <h4 className="font-bold text-white">1. Acceptance of Terms</h4>
                    <p>
                      By accessing and using S_FIT AI, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-white">2. Use of Service</h4>
                    <p>
                      S_FIT AI provides virtual fitting room technology for personal use. You agree not to misuse the service or attempt to bypass any security measures.
                      Uploading illegal or offensive content is strictly prohibited.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-white">3. Intellectual Property</h4>
                    <p>
                      The generated images are for your personal use. S_FIT AI retains rights to the underlying technology and AI models.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-white">4. Disclaimer</h4>
                    <p>
                      The virtual try-on results are AI-generated simulations and may not perfectly reflect real-world fit or appearance.
                      We are not responsible for purchase decisions made based on these simulations.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/50 flex justify-end">
              <button
                onClick={() => setLegalModalOpen(false)}
                className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
