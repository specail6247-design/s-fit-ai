import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function PrivacyModal() {
  const { isPrivacyOpen, setIsPrivacyOpen, privacyActiveTab, setPrivacyActiveTab } = useStore();

  if (!isPrivacyOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setIsPrivacyOpen(false)}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex gap-4">
              <button
                onClick={() => setPrivacyActiveTab('privacy')}
                className={`text-lg font-bold tracking-tight transition-colors ${
                  privacyActiveTab === 'privacy' ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                Privacy Policy
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => setPrivacyActiveTab('terms')}
                className={`text-lg font-bold tracking-tight transition-colors ${
                  privacyActiveTab === 'terms' ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                Terms of Service
              </button>
            </div>
            <button
              onClick={() => setIsPrivacyOpen(false)}
              className="text-white/50 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 overflow-y-auto custom-scrollbar">
            {privacyActiveTab === 'privacy' ? (
              <div className="space-y-6 text-sm text-white/70 leading-relaxed">
                <section>
                  <h3 className="text-white font-bold mb-2">1. Information We Collect</h3>
                  <p>
                    When you use S_FIT AI, we may collect photos you upload, garment images, and basic device metrics to provide the virtual fitting service. Your photos are processed securely.
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold mb-2">2. How We Use Your Data</h3>
                  <p>
                    The uploaded images are exclusively used to generate your virtual try-on results. We do not use your personal photos for AI model training without explicit consent.
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold mb-2">3. Data Security</h3>
                  <p>
                    We implement industry-standard security measures. Your uploaded images are processed securely and deleted from our active servers shortly after processing. They are not shared with third parties for marketing purposes.
                  </p>
                </section>
              </div>
            ) : (
              <div className="space-y-6 text-sm text-white/70 leading-relaxed">
                <section>
                  <h3 className="text-white font-bold mb-2">1. Acceptance of Terms</h3>
                  <p>
                    By accessing and using S_FIT AI, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold mb-2">2. Use License</h3>
                  <p>
                    Permission is granted to temporarily use the materials and features on S_FIT AI&apos;s application for personal, non-commercial transitory viewing only.
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold mb-2">3. Disclaimer</h3>
                  <p>
                    The materials on S_FIT AI are provided on an &apos;as is&apos; basis. S_FIT AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </section>
              </div>
            )}
          </div>

          {/* Footer Badge */}
          <div className="p-4 border-t border-white/10 bg-black/50 flex items-center justify-center gap-2 text-xs text-white/50">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Photos are processed securely and not shared.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
