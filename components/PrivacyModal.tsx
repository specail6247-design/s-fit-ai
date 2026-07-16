import React from 'react';
import { motion } from 'framer-motion';

interface PrivacyModalProps {
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl max-h-[80vh] flex flex-col bg-[#111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold tracking-tighter">Privacy Policy & Terms</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-300">
          <section>
            <h3 className="text-white font-bold mb-2">1. Data Privacy</h3>
            <p>
              Your privacy is critically important to us. S_FIT AI does not store, share, or sell your personal photos.
              All uploaded images are processed securely for the sole purpose of generating your virtual try-on result
              and are immediately discarded after processing.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold mb-2">2. Terms of Service</h3>
            <p>
              By using S_FIT AI, you agree to not use the service for generating inappropriate, explicit, or harmful content.
              The service is provided &quot;as is&quot; and we reserve the right to limit or terminate access for violations of these terms.
            </p>
          </section>

           <section>
            <h3 className="text-white font-bold mb-2">3. Subscription & Billing</h3>
            <p>
              Premium subscriptions are billed monthly. You may cancel at any time through your account settings.
              Refunds are not provided for partial months.
            </p>
          </section>
        </div>

        <div className="p-6 border-t border-white/10 flex justify-end bg-black/40">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors"
          >
            I Understand
          </button>
        </div>
      </motion.div>
    </div>
  );
};
