import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LegalModal({ isOpen, onClose }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-black/90 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold font-mono tracking-wider">LEGAL & COMPLIANCE</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'privacy' ? 'bg-white/10 text-[#007AFF]' : 'hover:bg-white/5 text-gray-500'}`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'terms' ? 'bg-white/10 text-[#007AFF]' : 'hover:bg-white/5 text-gray-500'}`}
              >
                Terms of Service
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto text-sm text-gray-300 leading-relaxed font-sans">
              {activeTab === 'privacy' ? (
                <div className="space-y-4">
                  <h3 className="text-white font-bold text-lg mb-4">Privacy Policy</h3>
                  <p>Effective Date: {new Date().toLocaleDateString()}</p>
                  <p>
                    At S_FIT NEO, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information, specifically regarding your photos and body data.
                  </p>
                  <h4 className="text-white font-bold mt-4">1. Data Collection</h4>
                  <p>
                    We collect images you upload solely for the purpose of generating virtual try-on results. We do not store your original photos permanently on our servers after the processing is complete.
                  </p>
                  <h4 className="text-white font-bold mt-4">2. Usage of Data</h4>
                  <p>
                    Your photos are processed by our secure AI engine to map garments onto your body. No data is shared with third parties for marketing purposes.
                  </p>
                  <h4 className="text-white font-bold mt-4">3. Data Retention</h4>
                  <p>
                    All uploaded images and generated results are automatically deleted from our temporary storage within 24 hours.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-white font-bold text-lg mb-4">Terms of Service</h3>
                  <p>Last Updated: {new Date().toLocaleDateString()}</p>
                  <h4 className="text-white font-bold mt-4">1. Acceptance of Terms</h4>
                  <p>
                    By accessing and using S_FIT NEO, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                  </p>
                  <h4 className="text-white font-bold mt-4">2. Use License</h4>
                  <p>
                    Permission is granted to temporarily use the S_FIT NEO platform for personal, non-commercial transitory viewing and virtual try-on experimentation.
                  </p>
                  <h4 className="text-white font-bold mt-4">3. Disclaimer</h4>
                  <p>
                    The materials on S_FIT NEO are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, regarding the accuracy or reliability of the virtual fitting results.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-black/50 text-center">
              <button onClick={onClose} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors">
                Close Document
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
