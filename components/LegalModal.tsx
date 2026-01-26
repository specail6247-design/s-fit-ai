import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export default function LegalModal({ isOpen, onClose, initialTab = 'privacy' }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'privacy' ? 'bg-[#007AFF] text-white' : 'hover:bg-white/5 text-gray-400'}`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'terms' ? 'bg-[#007AFF] text-white' : 'hover:bg-white/5 text-gray-400'}`}
          >
            Terms of Service
          </button>
          <button onClick={onClose} className="px-6 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 text-gray-300 text-sm leading-relaxed space-y-6">
          {activeTab === 'privacy' ? (
             <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
                <p>Effective Date: October 2023</p>
                <p>At S_FIT AI, we prioritize your privacy and data security. This policy outlines how we handle your personal information, specifically your photos and body measurements.</p>

                <h3 className="text-lg font-bold text-white mt-6">1. Data Collection</h3>
                <p>We collect images you upload solely for the purpose of generating virtual try-on results. We do not store your original photos permanently. They are processed in temporary secure containers and deleted after the session.</p>

                <h3 className="text-lg font-bold text-white mt-6">2. Data Usage</h3>
                <p>Your data is used to: generate 3D avatars, analyze body measurements, and render clothing items. We do not sell or share your personal biometric data with third parties for marketing purposes.</p>

                <h3 className="text-lg font-bold text-white mt-6">3. Security</h3>
                <p>We employ industry-standard encryption (AES-256) for data in transit and at rest. Our processing servers are isolated and strictly monitored.</p>
             </div>
          ) : (
             <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Terms of Service</h2>
                <p>Welcome to S_FIT AI. By using our service, you agree to these terms.</p>

                <h3 className="text-lg font-bold text-white mt-6">1. Acceptable Use</h3>
                <p>You agree to upload only photos that you have the rights to use. Do not upload offensive, illegal, or explicit content.</p>

                <h3 className="text-lg font-bold text-white mt-6">2. Service Limitations</h3>
                <p>S_FIT AI provides virtual fitting estimates. We do not guarantee 100% accuracy in sizing or fit. Use the results as a guide.</p>

                <h3 className="text-lg font-bold text-white mt-6">3. Intellectual Property</h3>
                <p>The generated images and the technology behind S_FIT AI are owned by S_FIT Inc. You are granted a license to use the generated images for personal use.</p>
             </div>
          )}
        </div>

        <div className="p-4 border-t border-white/10 flex justify-end">
           <button onClick={onClose} className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors">Close</button>
        </div>
      </motion.div>
    </div>
  );
}
