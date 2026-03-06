'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function PrivacyTermsModal() {
  const { isPrivacyOpen, setPrivacyOpen, privacyActiveTab, setPrivacyActiveTab } = useStore();

  if (!isPrivacyOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setPrivacyOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[80vh] flex flex-col bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
            <h2 className="text-xl font-bold text-white tracking-widest uppercase">Legal & Compliance</h2>
            <button
              onClick={() => setPrivacyOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setPrivacyActiveTab('privacy')}
              className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${
                privacyActiveTab === 'privacy'
                  ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-[#007AFF]/5'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setPrivacyActiveTab('terms')}
              className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${
                privacyActiveTab === 'terms'
                  ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-[#007AFF]/5'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Terms of Service
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-8 text-sm text-gray-300 leading-relaxed space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {privacyActiveTab === 'privacy' ? (
              <PrivacyContent />
            ) : (
              <TermsContent />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function PrivacyContent() {
  return (
    <>
      <section>
        <h3 className="text-white font-bold mb-2">1. Data Collection & Processing</h3>
        <p>
          We take your privacy seriously. The photos you upload for virtual try-on are processed securely to generate your fitting result.
          We do not store your personal photos permanently unless you explicitly choose to save them to your Vault.
        </p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">2. Facial Recognition Data</h3>
        <p>
          Our AI analyzes facial and body landmarks strictly for the purpose of aligning the virtual garment.
          This biometric data is processed ephemerally in memory and is instantly discarded after the result image is generated.
        </p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">3. Third-Party Sharing</h3>
        <p>
          We do not sell, rent, or share your personal data, including uploaded photos, to any third parties for marketing purposes.
          Data sent to our AI orchestration layers is anonymized and strictly bound by zero-retention policies.
        </p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">4. User Rights</h3>
        <p>
          You have the right to request deletion of any associated account data. You can clear your session data at any time from the application interface.
        </p>
      </section>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <section>
        <h3 className="text-white font-bold mb-2">1. Acceptance of Terms</h3>
        <p>
          By accessing and using S_FIT AI, you agree to be bound by these Terms of Service. If you do not agree, please do not use the application.
        </p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">2. Acceptable Use</h3>
        <p>
          You agree to only upload photos for which you have the legal right or explicit permission to use.
          Uploading inappropriate, offensive, or non-consensual images is strictly prohibited and will result in immediate ban.
        </p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">3. Service Limitations</h3>
        <p>
          The virtual try-on results are AI-generated approximations. We do not guarantee pixel-perfect accuracy regarding fabric fit, sizing, or exact color reproduction.
          S_FIT AI is a visualization tool, not a physical sizing guarantee.
        </p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">4. Intellectual Property</h3>
        <p>
          The S_FIT AI technology, interface, and branding are the intellectual property of S_FIT.
          Garments and brand names shown in the demo are for conceptual demonstration and belong to their respective copyright holders.
        </p>
      </section>
    </>
  );
}
