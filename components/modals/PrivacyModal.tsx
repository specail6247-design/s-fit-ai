import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy'
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0a0a0a]">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('privacy')}
                className={`text-lg font-bold tracking-tight transition-colors ${
                  activeTab === 'privacy' ? 'text-white' : 'text-white/40 hover:text-white/80'
                }`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`text-lg font-bold tracking-tight transition-colors ${
                  activeTab === 'terms' ? 'text-white' : 'text-white/40 hover:text-white/80'
                }`}
              >
                Terms of Service
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1 scrollbar-hide text-sm text-white/70 space-y-6">
            {activeTab === 'privacy' ? (
              <div className="space-y-6">
                <section>
                  <h3 className="text-white font-bold mb-2">1. Data Collection & Usage</h3>
                  <p>
                    We collect photos you upload solely for the purpose of generating virtual try-on results.
                    <span className="text-[#007AFF] font-bold block mt-2 flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      Data Safety Badge: Photos are processed securely and NEVER shared with third parties.
                    </span>
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold mb-2">2. Data Retention</h3>
                  <p>Uploaded images and generated results are automatically deleted from our processing servers after your session ends (typically within 1 hour). We do not train AI models on your personal photos.</p>
                </section>
                <section>
                  <h3 className="text-white font-bold mb-2">3. Third-Party Services</h3>
                  <p>We use external AI providers (like Replicate) to process the images. These providers are strictly bound by agreements not to store or use your images beyond the immediate processing request.</p>
                </section>
              </div>
            ) : (
              <div className="space-y-6">
                <section>
                  <h3 className="text-white font-bold mb-2">1. Acceptance of Terms</h3>
                  <p>By using S_FIT AI, you agree to these Terms of Service. If you do not agree, please do not use our service.</p>
                </section>
                <section>
                  <h3 className="text-white font-bold mb-2">2. Acceptable Use</h3>
                  <p>You agree to only upload images you have the right to use. Do not upload inappropriate, offensive, or copyrighted material without permission.</p>
                </section>
                <section>
                  <h3 className="text-white font-bold mb-2">3. Limitation of Liability</h3>
                  <p>S_FIT AI provides virtual fitting results &quot;as is&quot;. We do not guarantee 100% accuracy in fit, color, or texture representation compared to the physical garment.</p>
                </section>
              </div>
            )}
          </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            I Understand
          </button>
        </div>
      </motion.div>
    </div>
  );
};
