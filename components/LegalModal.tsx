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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed z-50 w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
              <h2 className="text-xl font-bold tracking-tight text-white">
                Legal & Compliance
              </h2>
              <button
                onClick={() => setLegalModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'privacy'
                    ? 'bg-[#007AFF]/10 text-[#007AFF] border-b-2 border-[#007AFF]'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'terms'
                    ? 'bg-[#007AFF]/10 text-[#007AFF] border-b-2 border-[#007AFF]'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                Terms of Service
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-gray-300 text-sm leading-relaxed">
              {activeTab === 'privacy' ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
                  <p>Effective Date: {new Date().toLocaleDateString()}</p>

                  <section>
                    <h4 className="font-bold text-white mt-4 mb-2">1. Introduction</h4>
                    <p>Welcome to S_FIT AI. We value your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your information when you use our virtual fitting services.</p>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mt-4 mb-2">2. Data We Collect</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>User-uploaded photos for virtual fitting purposes.</li>
                      <li>Device information and usage data to improve our services.</li>
                      <li>Account information if you choose to register.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mt-4 mb-2">3. How We Use Your Data</h4>
                    <p>Your photos are processed solely for the purpose of generating virtual try-on results. We do not use your photos for model training without your explicit consent. Images are processed securely and deleted from our active processing servers shortly after generation.</p>
                  </section>

                   <section>
                    <h4 className="font-bold text-white mt-4 mb-2">4. Data Security</h4>
                    <p>We implement industry-standard security measures to protect your data. All transmissions are encrypted using SSL/TLS protocols.</p>
                  </section>
                </div>
              ) : (
                <div className="space-y-4">
                   <h3 className="text-lg font-bold text-white">Terms of Service</h3>
                   <p>Last Updated: {new Date().toLocaleDateString()}</p>

                   <section>
                    <h4 className="font-bold text-white mt-4 mb-2">1. Acceptance of Terms</h4>
                    <p>By accessing or using S_FIT AI, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mt-4 mb-2">2. Use of Service</h4>
                    <p>You agree to use S_FIT AI only for lawful purposes. You must not upload content that is illegal, offensive, or violates the rights of others.</p>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mt-4 mb-2">3. Intellectual Property</h4>
                    <p>The technology, code, and design of S_FIT AI are owned by us. The images you generate are for your personal use.</p>
                  </section>

                  <section>
                    <h4 className="font-bold text-white mt-4 mb-2">4. Disclaimer</h4>
                    <p>The service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the virtual fitting results will be 100% accurate to real-life fit.</p>
                  </section>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
              <button
                onClick={() => setLegalModalOpen(false)}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#0066cc] text-white rounded-lg font-bold text-sm transition-colors"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
