"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';

export default function LegalModal() {
  const { isLegalModalOpen, activeLegalTab, closeLegalModal, setLegalTab } = useStore();

  if (!isLegalModalOpen) return null;

  return (
    <AnimatePresence>
      {isLegalModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLegalModal}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-2xl border border-white/10">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-[#141414] px-6 py-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setLegalTab('privacy')}
                    className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                      activeLegalTab === 'privacy' ? 'text-[#007AFF]' : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => setLegalTab('terms')}
                    className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                      activeLegalTab === 'terms' ? 'text-[#007AFF]' : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    Terms of Service
                  </button>
                </div>
                <button
                  onClick={closeLegalModal}
                  className="rounded-full p-1 text-gray-500 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Content */}
              <div className="h-[60vh] overflow-y-auto p-6 text-sm text-gray-300 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
                {activeLegalTab === 'privacy' ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
                    <p>Last updated: October 26, 2023</p>

                    <h4 className="font-bold text-white mt-4">1. Data Collection</h4>
                    <p>
                      We collect images you upload solely for the purpose of generating virtual try-on results.
                      Your original photos and generated images are processed securely.
                    </p>

                    <h4 className="font-bold text-white mt-4">2. Data Usage</h4>
                    <p>
                      We do not sell your personal data. Images are temporarily stored to facilitate the service
                      and are deleted after a short period unless saved to your personal vault.
                    </p>

                    <h4 className="font-bold text-white mt-4">3. AI Processing</h4>
                    <p>
                      Our service uses advanced AI algorithms to map clothing onto your photos. By using this service,
                      you consent to having your images processed by our AI models.
                    </p>

                    <h4 className="font-bold text-white mt-4">4. Security</h4>
                    <p>
                      We implement industry-standard security measures to protect your data during transmission and storage.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Terms of Service</h3>
                    <p>Last updated: October 26, 2023</p>

                    <h4 className="font-bold text-white mt-4">1. Acceptance of Terms</h4>
                    <p>
                      By accessing and using S_FIT AI, you agree to be bound by these Terms of Service.
                    </p>

                    <h4 className="font-bold text-white mt-4">2. User Conduct</h4>
                    <p>
                      You agree not to upload any illegal, offensive, or inappropriate content. We reserve the right
                      to ban users who violate this policy.
                    </p>

                    <h4 className="font-bold text-white mt-4">3. Intellectual Property</h4>
                    <p>
                      The generated images are for personal use. The underlying technology and brand assets
                      remain the property of S_FIT AI.
                    </p>

                    <h4 className="font-bold text-white mt-4">4. Disclaimer</h4>
                    <p>
                      The virtual try-on technology is experimental. Results may vary based on photo quality and lighting.
                      We make no guarantees about the accuracy of the fitting visualization.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 bg-[#141414] p-4 text-center">
                <button
                  onClick={closeLegalModal}
                  className="rounded-lg bg-[#007AFF] px-6 py-2 text-sm font-bold text-white hover:bg-[#005bb5] transition-colors"
                >
                  I Understand
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
