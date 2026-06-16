import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | null;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen || !type) return null;

  const content = {
    privacy: {
      title: "Privacy Policy",
      body: (
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-[family-name:var(--font-sans)]">
          <p>Last Updated: October 2023</p>
          <p>
            At S_FIT AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal data when you use our virtual fitting room services.
          </p>
          <h4 className="text-white font-bold mt-4">1. Data Collection</h4>
          <p>
            We collect the photos you upload solely for the purpose of generating your 3D digital twin and performing virtual try-ons. We also collect basic usage data to improve our services.
          </p>
          <h4 className="text-white font-bold mt-4">2. Data Security</h4>
          <p>
            Your photos are processed securely. We employ industry-standard encryption protocols during transmission and processing.
          </p>
          <h4 className="text-white font-bold mt-4">3. Data Sharing</h4>
          <p>
            We do not sell, rent, or share your personal photos or biometric data with third-party advertisers.
          </p>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      body: (
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-[family-name:var(--font-sans)]">
          <p>Last Updated: October 2023</p>
          <p>
            Welcome to S_FIT AI. By accessing or using our application, you agree to be bound by these Terms of Service.
          </p>
          <h4 className="text-white font-bold mt-4">1. Use of Service</h4>
          <p>
            You agree to use S_FIT AI only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that any images you upload do not violate any third-party rights.
          </p>
          <h4 className="text-white font-bold mt-4">2. Intellectual Property</h4>
          <p>
            The S_FIT AI platform, including its original content, features, and functionality, are owned by S_FIT AI and are protected by international copyright and trademark laws.
          </p>
          <h4 className="text-white font-bold mt-4">3. Limitation of Liability</h4>
          <p>
            S_FIT AI shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service.
          </p>
        </div>
      )
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          className="relative w-full max-w-lg bg-[#101622] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
            <h3 className="text-lg font-bold text-white tracking-wider font-[family-name:var(--font-display)]">
              {content[type].title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto overscroll-contain">
            {content[type].body}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 bg-black/40 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors text-sm"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
