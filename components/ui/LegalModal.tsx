'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export function LegalModal({ isOpen, onClose, initialTab = 'privacy' }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
            <h2 className="text-xl font-bold text-white">Legal & Compliance</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'privacy' ? 'bg-white/10 text-white border-b-2 border-[#007AFF]' : 'text-gray-400 hover:bg-white/5'}`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'terms' ? 'bg-white/10 text-white border-b-2 border-[#007AFF]' : 'text-gray-400 hover:bg-white/5'}`}
            >
              Terms of Service
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 text-gray-300 space-y-6 text-sm leading-relaxed custom-scrollbar">
            {activeTab === 'privacy' ? (
              <>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Last Updated: May 20, 2024</p>

                  <section>
                    <h4 className="font-bold text-white mb-2">1. Introduction</h4>
                    <p>S_FIT AI ("we", "our", "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our virtual fitting service.</p>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mb-2">2. Information We Collect</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Uploaded Photos:</strong> Images you upload for virtual try-on are processed securely.</li>
                      <li><strong>Body Measurements:</strong> Derived data points (landmarks) used for fitting.</li>
                      <li><strong>Usage Data:</strong> How you interact with our 3D tools and garment selections.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mb-2">3. How We Use Your Data</h4>
                    <p>We use your data solely to:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Generate virtual try-on results.</li>
                      <li>Improve our AI fitting algorithms.</li>
                      <li>Provide personalized size recommendations.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mb-2">4. Data Retention & Security</h4>
                    <p className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-200">
                      <strong>Important:</strong> Your original photos are processed in real-time and are NOT permanently stored on our servers after the session expires, unless you explicitly save them to your "Digital Twin" profile.
                    </p>
                    <p className="mt-2">We employ industry-standard encryption to protect data in transit and at rest.</p>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mb-2">5. Third-Party Sharing</h4>
                    <p>We do not sell your personal data. We may share anonymized data with trusted partners for:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Cloud processing (e.g., GPU providers).</li>
                      <li>Analytics (to improve app performance).</li>
                    </ul>
                  </section>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Terms of Service</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Effective Date: May 20, 2024</p>

                  <section>
                    <h4 className="font-bold text-white mb-2">1. Acceptance of Terms</h4>
                    <p>By accessing S_FIT AI, you agree to these Terms. If you do not agree, please do not use our services.</p>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mb-2">2. Use of Service</h4>
                    <p>You agree to use S_FIT AI only for lawful purposes. You must not:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Upload inappropriate or offensive content.</li>
                      <li>Attempt to reverse-engineer our AI models.</li>
                      <li>Use the service for commercial purposes without a license.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mb-2">3. Intellectual Property</h4>
                    <p>The AI models, 3D rendering engine, and UI designs are owned by S_FIT AI. The "fitting results" generated are licensed to you for personal use.</p>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mb-2">4. Disclaimers</h4>
                    <p>Our size recommendations are estimates based on computer vision. We are not responsible for actual garment fit variances.</p>
                    <p className="mt-2 text-gray-500 italic">"Virtual Try-On results are simulations and may not perfectly reflect real-world physics."</p>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mb-2">5. Termination</h4>
                    <p>We reserve the right to suspend accounts that violate these terms or compromise our system's integrity.</p>
                  </section>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
