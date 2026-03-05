import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function PrivacyModal() {
  const isPrivacyOpen = useStore((state) => state.isPrivacyOpen);
  const setIsPrivacyOpen = useStore((state) => state.setIsPrivacyOpen);
  const activeTab = useStore((state) => state.privacyActiveTab);
  const setActiveTab = useStore((state) => state.setPrivacyActiveTab);

  if (!isPrivacyOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsPrivacyOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white tracking-wide">Legal & Compliance</h2>
            <button
              onClick={() => setIsPrivacyOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">close</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                activeTab === 'privacy'
                  ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-[#007AFF]/5'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                activeTab === 'terms'
                  ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-[#007AFF]/5'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              Terms of Service
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar text-gray-300 space-y-6 text-sm leading-relaxed">
            {activeTab === 'privacy' ? (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <section>
                  <h3 className="text-lg font-semibold text-white mb-2">1. Data Collection</h3>
                  <p>We only collect the images you explicitly upload for the purpose of generating your virtual try-on experience. These images are processed securely.</p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-white mb-2">2. Data Usage & Storage</h3>
                  <p>Your uploaded photos are used strictly for AI generation. They are not stored permanently on our servers unless you explicitly save them to your Vault. Transient processing data is deleted immediately after generation.</p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-white mb-2">3. Third-Party Sharing</h3>
                  <p>We do not sell, trade, or otherwise transfer your personally identifiable information or photos to outside parties. Your privacy is our top priority.</p>
                </section>
                <section>
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3 mt-8">
                    <span className="material-symbols-outlined text-green-400 mt-0.5" aria-hidden="true">verified_user</span>
                    <div>
                      <h4 className="text-green-400 font-medium mb-1">Data Safety Guarantee</h4>
                      <p className="text-xs text-green-400/80">Photos are processed securely and not shared. We adhere to strict data protection protocols.</p>
                    </div>
                  </div>
                </section>
              </motion.div>
            ) : (
              <motion.div
                key="terms"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <section>
                  <h3 className="text-lg font-semibold text-white mb-2">1. Acceptance of Terms</h3>
                  <p>By accessing and using S_FIT NEO, you accept and agree to be bound by the terms and provision of this agreement.</p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-white mb-2">2. Acceptable Use</h3>
                  <p>You agree not to use the application to generate inappropriate, offensive, or illegal content. We reserve the right to terminate access for misuse.</p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-white mb-2">3. Intellectual Property</h3>
                  <p>The generated images are for your personal use. The underlying technology, branding, and UI elements remain the property of S_FIT AI.</p>
                </section>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end">
             <button
               onClick={() => setIsPrivacyOpen(false)}
               className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-lg text-sm font-medium transition-colors"
             >
               I Understand
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
