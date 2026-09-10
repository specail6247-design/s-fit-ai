import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export default function PrivacyTermsModal({ isOpen, onClose, type }: PrivacyTermsModalProps) {
  const content = {
    privacy: {
      title: "Privacy Policy",
      body: (
        <div className="space-y-4 text-sm text-gray-300">
          <p>At S_FIT NEO, your privacy is our priority. We are committed to protecting your personal data.</p>
          <h3 className="text-white font-bold mt-4">1. Data Collection</h3>
          <p>We only collect the photos you explicitly upload for the virtual try-on process. These photos are temporarily processed to generate your fitting result.</p>
          <h3 className="text-white font-bold mt-4">2. Data Usage & Storage</h3>
          <p>Your uploaded images are processed securely and are <strong>not stored permanently</strong> or shared with third parties for marketing. They are deleted immediately after your session ends.</p>
          <h3 className="text-white font-bold mt-4">3. Security</h3>
          <p>We employ industry-standard security measures to ensure your data is safe during transit and processing.</p>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      body: (
        <div className="space-y-4 text-sm text-gray-300">
          <p>Welcome to S_FIT NEO. By using our service, you agree to these terms.</p>
          <h3 className="text-white font-bold mt-4">1. Use of Service</h3>
          <p>Our service is provided for personal, non-commercial use. You agree not to misuse the virtual try-on technology.</p>
          <h3 className="text-white font-bold mt-4">2. User Content</h3>
          <p>You retain rights to the photos you upload. You must have the right to use any images you provide to our service.</p>
          <h3 className="text-white font-bold mt-4">3. Limitation of Liability</h3>
          <p>S_FIT NEO is provided "as is". We are not liable for any generated content that you may find unsatisfactory or offensive.</p>
        </div>
      )
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[#111] border border-white/20 rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">{content[type].title}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>
            <div className="prose prose-invert">
              {content[type].body}
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
