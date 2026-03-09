'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function PrivacyTermsModal() {
  const { showPrivacyModal, setShowPrivacyModal } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  if (!showPrivacyModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-black/60">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/40">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-[#007AFF]">⚖️</span> Legal & Compliance
            </h2>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10 bg-black/20">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === 'privacy' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
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
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === 'terms' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
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
          <div className="flex-1 overflow-y-auto p-6 text-sm text-gray-300 space-y-6">
            {activeTab === 'privacy' ? (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white">Privacy Policy</h3>
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <section>
                  <h4 className="font-semibold text-white mt-4 mb-2">1. Data Collection</h4>
                  <p>We collect images you upload specifically for the virtual fitting process. These images are processed securely and are NOT used to train our core AI models without explicit consent.</p>
                </section>

                <section>
                  <h4 className="font-semibold text-white mt-4 mb-2">2. Data Processing</h4>
                  <p>Your photos are sent to our secure servers for the sole purpose of generating the fitting result. We use state-of-the-art encryption during transit and at rest.</p>
                </section>

                <section>
                  <h4 className="font-semibold text-white mt-4 mb-2">3. Data Retention</h4>
                  <p>Images uploaded for fitting are automatically deleted from our active servers within 24 hours after the session ends. We do not maintain a permanent database of user photos.</p>
                </section>
              </motion.div>
            ) : (
              <motion.div
                key="terms"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white">Terms of Service</h3>
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <section>
                  <h4 className="font-semibold text-white mt-4 mb-2">1. Acceptance of Terms</h4>
                  <p>By accessing and using S_FIT AI, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
                </section>

                <section>
                  <h4 className="font-semibold text-white mt-4 mb-2">2. Acceptable Use</h4>
                  <p>You agree to only upload images for which you have the legal right or explicit permission to use. Uploading explicit, offensive, or copyrighted material without authorization is strictly prohibited.</p>
                </section>

                <section>
                  <h4 className="font-semibold text-white mt-4 mb-2">3. Service Limitations</h4>
                  <p>While we strive for accuracy, the virtual fitting results are AI-generated representations and may not perfectly reflect the physical garment&apos;s exact fit, color, or material properties.</p>
                </section>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end">
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-semibold rounded-lg transition-colors"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
