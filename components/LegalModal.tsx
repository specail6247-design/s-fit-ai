'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LegalModal({ isOpen, onClose }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                    activeTab === 'privacy' ? 'text-[#007AFF]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Privacy Policy
                </button>
                <div className="w-px h-4 bg-white/20 self-center" />
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                    activeTab === 'terms' ? 'text-[#007AFF]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Terms of Service
                </button>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="prose prose-invert prose-sm max-w-none">
                {activeTab === 'privacy' ? (
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-white font-bold text-lg mb-2">1. Data Collection & Usage</h3>
                      <p className="text-gray-400 leading-relaxed">
                        At S_FIT AI, we prioritize your privacy. We collect images solely for the purpose of generating virtual try-on results.
                        Your uploaded photos are processed ephemerally on secure GPU clusters and are automatically deleted after the session.
                      </p>
                    </section>
                    <section>
                      <h3 className="text-white font-bold text-lg mb-2">2. Facial Data Processing</h3>
                      <p className="text-gray-400 leading-relaxed">
                        We use advanced computer vision to analyze facial landmarks for accurate sizing and fit.
                        We do not store biometric templates or facial recognition data.
                      </p>
                    </section>
                    <section>
                      <h3 className="text-white font-bold text-lg mb-2">3. Third-Party Services</h3>
                      <p className="text-gray-400 leading-relaxed">
                        We partner with trusted cloud providers (e.g., Replicate, AWS) for AI processing.
                        Data sent to these partners is encrypted and strictly limited to the necessary scope for service delivery.
                      </p>
                    </section>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-white font-bold text-lg mb-2">1. Acceptance of Terms</h3>
                      <p className="text-gray-400 leading-relaxed">
                        By using S_FIT AI, you agree to these terms. Our service is intended for personal, non-commercial use unless otherwise authorized.
                      </p>
                    </section>
                    <section>
                      <h3 className="text-white font-bold text-lg mb-2">2. User Conduct</h3>
                      <p className="text-gray-400 leading-relaxed">
                        You agree not to upload explicit, offensive, or illegal content. We reserve the right to ban users who violate these guidelines.
                      </p>
                    </section>
                    <section>
                      <h3 className="text-white font-bold text-lg mb-2">3. Intellectual Property</h3>
                      <p className="text-gray-400 leading-relaxed">
                        The generated images are for your personal use. The underlying AI models and software remain the property of S_FIT AI.
                      </p>
                    </section>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#0062cc] text-white text-sm font-bold rounded-lg transition-colors"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
