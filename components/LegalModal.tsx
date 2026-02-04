'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export default function LegalModal({ isOpen, onClose, initialTab = 'privacy' }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-[#111] border border-white/10 w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#151515]">
              <h2 className="text-xl font-bold text-white tracking-tight">Legal & Compliance</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-xl">
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 bg-[#151515]">
              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'privacy' ? 'border-[#007AFF] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'terms' ? 'border-[#007AFF] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
              >
                Terms of Service
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 text-gray-300 space-y-6 text-sm leading-relaxed custom-scrollbar">
              {activeTab === 'privacy' ? (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Privacy Policy</h3>
                  <p className="text-xs text-gray-500">Effective Date: {new Date().toLocaleDateString()}</p>

                  <section>
                    <h4 className="text-white font-bold mb-2 text-[#007AFF]">1. Data Collection & Usage</h4>
                    <p>S_FIT AI collects user-uploaded photos solely for the purpose of generating virtual try-on visualizations. We do not store your biometric data permanently. All processing is transient.</p>
                  </section>

                  <section>
                    <h4 className="text-white font-bold mb-2 text-[#007AFF]">2. Photo Processing Security</h4>
                    <p>Your photos are processed on secure servers. Once the virtual try-on session is complete or after a short retention period for caching (max 24 hours), your source images are automatically deleted from our processing pipeline.</p>
                  </section>

                  <section>
                    <h4 className="text-white font-bold mb-2 text-[#007AFF]">3. Third-Party Services</h4>
                    <p>We use trusted third-party AI providers (e.g., Replicate, RunwayML) to power our technology. Data sent to these services is ephemeral and strictly used for the requested generation task.</p>
                  </section>

                  <section>
                    <h4 className="text-white font-bold mb-2 text-[#007AFF]">4. User Rights</h4>
                    <p>You have the right to request deletion of any data associated with your session immediately by contacting support. Since we minimize data retention, most data is self-clearing.</p>
                  </section>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Terms of Service</h3>

                  <section>
                    <h4 className="text-white font-bold mb-2 text-[#007AFF]">1. Acceptance of Terms</h4>
                    <p>By accessing or using S_FIT AI, you agree to be bound by these Terms. If you do not agree to all the terms and conditions, then you may not access the service.</p>
                  </section>

                  <section>
                    <h4 className="text-white font-bold mb-2 text-[#007AFF]">2. User Content License</h4>
                    <p>You retain ownership of any photos you upload. By uploading, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and modify your content solely for the purpose of operating the service and generating your try-on results.</p>
                  </section>

                  <section>
                    <h4 className="text-white font-bold mb-2 text-[#007AFF]">3. Prohibited Conduct</h4>
                    <p>You agree not to upload content that is illegal, offensive, pornographic, or infringes on the rights of others. We reserve the right to ban users and report illegal content to authorities.</p>
                  </section>

                  <section>
                    <h4 className="text-white font-bold mb-2 text-[#007AFF]">4. Disclaimer of Warranties</h4>
                    <p>The virtual try-on results are AI-generated simulations. They are for visualization purposes only and may not perfectly reflect real-world fit, fabric texture, or appearance. S_FIT AI is provided &quot;AS IS&quot; without warranties of any kind.</p>
                  </section>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-[#151515] text-right flex justify-end">
              <button onClick={onClose} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-bold transition-colors">
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
