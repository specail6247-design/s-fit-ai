import React from 'react';
import { motion } from 'framer-motion';

interface PrivacyModalProps {
  onClose: () => void;
}

export default function PrivacyModal({ onClose }: PrivacyModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl max-h-[80vh] flex flex-col bg-[#111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Privacy Policy & Terms</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 text-gray-300 space-y-6 text-sm">
          <section>
            <h3 className="text-white font-bold mb-2">1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us, such as photos for virtual fitting.
              <strong> All uploaded photos are processed securely and are never shared with third parties or used for training our models without explicit consent.</strong>
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold mb-2">2. How We Use Your Information</h3>
            <p>
              Your data is used solely to generate your personalized virtual try-on experience. The images are temporarily processed and then deleted from our active servers.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold mb-2">3. Data Security</h3>
            <p>
              We implement industry-standard security measures to protect your personal information and uploaded media against unauthorized access or disclosure.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold mb-2">4. Terms of Service</h3>
            <p>
              By using S_FIT NEO, you agree to not upload inappropriate, explicit, or copyrighted material without permission. We reserve the right to terminate access for violating these terms.
            </p>
          </section>
        </div>

        <div className="p-6 border-t border-white/10 bg-black/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors"
          >
            I Understand
          </button>
        </div>
      </motion.div>
    </div>
  );
}
