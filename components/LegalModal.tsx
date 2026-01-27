import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LegalModal({ isOpen, onClose }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
          <h2 className="text-xl font-bold text-white tracking-wide">LEGAL & COMPLIANCE</h2>
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
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'privacy'
                ? 'bg-[#007AFF]/10 text-[#007AFF] border-b-2 border-[#007AFF]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'terms'
                ? 'bg-[#007AFF]/10 text-[#007AFF] border-b-2 border-[#007AFF]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Terms of Service
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 text-gray-300 text-sm leading-relaxed space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {activeTab === 'privacy' ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
              <p className="text-xs text-gray-500 uppercase">Last Updated: October 2023</p>

              <div className="space-y-2">
                <h4 className="font-bold text-white">1. Data Collection</h4>
                <p>We collect images you upload solely for the purpose of generating virtual try-on results. We do not store your biometric data permanently.</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white">2. Image Processing</h4>
                <p>Images are processed securely using our AI engine. Your photos are never shared with third parties for marketing purposes.</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white">3. User Rights</h4>
                <p>You retain full ownership of your photos. You can request deletion of your data at any time by contacting support.</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white">4. Cookies & Tracking</h4>
                <p>We use minimal cookies necessary for the functioning of the application and to analyze site traffic.</p>
              </div>
            </div>
          ) : (
             <div className="space-y-4 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-white">Terms of Service</h3>
              <p className="text-xs text-gray-500 uppercase">Last Updated: October 2023</p>

              <div className="space-y-2">
                <h4 className="font-bold text-white">1. Acceptance of Terms</h4>
                <p>By using S_FIT NEO, you agree to these terms. If you do not agree, please do not use the service.</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white">2. Acceptable Use</h4>
                <p>You agree not to upload illegal, offensive, or infringing content. We reserve the right to ban users who violate this policy.</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white">3. Disclaimer</h4>
                <p>The virtual fitting results are AI-generated simulations and may not perfectly reflect real-world fit. We are not responsible for purchase decisions based on these simulations.</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white">4. Intellectual Property</h4>
                <p>All content, features, and functionality are the exclusive property of S_FIT NEO and its licensors.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/40 text-center">
            <button
                onClick={onClose}
                className="px-8 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold uppercase transition-colors"
            >
                Close
            </button>
        </div>
      </motion.div>
    </div>
  );
}
