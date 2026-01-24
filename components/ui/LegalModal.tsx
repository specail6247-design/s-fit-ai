import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export function LegalModal({ isOpen, onClose, initialTab = 'privacy' }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#1a1a1a]">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                    activeTab === 'privacy' ? 'text-[#007AFF]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                    activeTab === 'terms' ? 'text-[#007AFF]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Terms of Service
                </button>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto text-gray-300 text-sm leading-relaxed space-y-4">
              {activeTab === 'privacy' ? (
                <>
                  <h3 className="text-white font-bold text-lg mb-2">Privacy Policy</h3>
                  <p>Last updated: {new Date().toLocaleDateString()}</p>
                  <p>
                    At S_FIT AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information, specifically regarding the photos you upload for virtual try-on.
                  </p>
                  <h4 className="text-white font-bold mt-4">1. Information We Collect</h4>
                  <p>
                    We collect images you upload solely for the purpose of generating virtual try-on results. We also collect basic usage data to improve our services.
                  </p>
                  <h4 className="text-white font-bold mt-4">2. How We Use Your Photos</h4>
                  <p>
                    Photos uploaded are processed by our AI engine to overlay garments. <strong>We do not store your photos permanently.</strong> They are processed in temporary sessions and deleted shortly after processing.
                  </p>
                  <h4 className="text-white font-bold mt-4">3. Data Security</h4>
                  <p>
                    We use industry-standard encryption to protect your data during transmission. Your photos are not shared with third parties for marketing purposes.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-white font-bold text-lg mb-2">Terms of Service</h3>
                  <p>Last updated: {new Date().toLocaleDateString()}</p>
                  <p>
                    Welcome to S_FIT AI. By using our service, you agree to these Terms.
                  </p>
                  <h4 className="text-white font-bold mt-4">1. Usage License</h4>
                  <p>
                    S_FIT AI grants you a personal, non-exclusive license to use the software for personal virtual try-on purposes.
                  </p>
                  <h4 className="text-white font-bold mt-4">2. User Content</h4>
                  <p>
                    You retain all rights to the photos you upload. By uploading, you grant us a temporary license to process the image for the service.
                  </p>
                  <h4 className="text-white font-bold mt-4">3. Disclaimers</h4>
                  <p>
                    The service is provided &quot;as is&quot;. Virtual try-on results are simulations and may not perfectly reflect real-world fit.
                  </p>
                </>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-[#1a1a1a] flex justify-end">
              <button onClick={onClose} className="px-4 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-lg font-bold text-xs uppercase tracking-wider">
                Understood
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
