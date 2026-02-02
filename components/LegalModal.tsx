import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export default function LegalModal({ isOpen, onClose, initialTab = 'privacy' }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  // Update active tab when prop changes, if needed, or just rely on internal state after open
  // For simplicity, we stick to internal state switching.

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-tight text-white">Legal & Compliance</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'privacy'
                      ? 'bg-white/5 text-[#007AFF] border-b-2 border-[#007AFF]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'terms'
                      ? 'bg-white/5 text-[#007AFF] border-b-2 border-[#007AFF]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Terms of Service
                </button>
              </div>

              {/* Content Scroll Area */}
              <div className="p-6 overflow-y-auto custom-scrollbar text-sm text-gray-300 space-y-4">
                {activeTab === 'privacy' ? (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Last Updated: October 2023</p>

                    <section>
                      <h4 className="font-bold text-white mb-2">1. Introduction</h4>
                      <p>Welcome to S_FIT NEO. We value your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your photos and information.</p>
                    </section>

                    <section>
                      <h4 className="font-bold text-white mb-2">2. Data Collection</h4>
                      <p>We collect images you upload solely for the purpose of generating virtual try-on results. We do not store your biometric data permanently.</p>
                    </section>

                    <section>
                      <h4 className="font-bold text-white mb-2">3. Image Processing</h4>
                      <p>Your photos are processed using secure AI algorithms. Images are temporarily cached for processing and are automatically deleted after a short period (typically 24 hours).</p>
                    </section>

                    <section>
                      <h4 className="font-bold text-white mb-2">4. Third-Party Sharing</h4>
                      <p>We do not sell your data. We use trusted third-party providers (e.g., Replicate) to perform the AI processing, ensuring they adhere to strict data security standards.</p>
                    </section>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <h3 className="text-lg font-bold text-white">Terms of Service</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Last Updated: October 2023</p>

                    <section>
                      <h4 className="font-bold text-white mb-2">1. Acceptance of Terms</h4>
                      <p>By accessing S_FIT NEO, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
                    </section>

                    <section>
                      <h4 className="font-bold text-white mb-2">2. Use License</h4>
                      <p>Permission is granted to temporarily download one copy of the materials (information or software) on S_FIT NEO for personal, non-commercial transitory viewing only.</p>
                    </section>

                    <section>
                      <h4 className="font-bold text-white mb-2">3. User Conduct</h4>
                      <p>You agree not to upload any illegal, offensive, or inappropriate content. S_FIT NEO reserves the right to terminate access for any user violating these terms.</p>
                    </section>

                    <section>
                      <h4 className="font-bold text-white mb-2">4. Disclaimer</h4>
                      <p>The materials on S_FIT NEO are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, regarding the accuracy or reliability of the AI-generated results.</p>
                    </section>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
