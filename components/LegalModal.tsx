import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  // Update active tab if initialTab changes when opening
  React.useEffect(() => {
    if (isOpen) {
        setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold tracking-tight text-white">Legal & Compliance</h2>
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
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeTab === 'privacy'
                    ? 'bg-[#007AFF]/10 text-[#007AFF] border-b-2 border-[#007AFF]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeTab === 'terms'
                    ? 'bg-[#007AFF]/10 text-[#007AFF] border-b-2 border-[#007AFF]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Terms of Service
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 text-gray-300 space-y-4 text-sm leading-relaxed">
              {activeTab === 'privacy' ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
                  <p>Last updated: October 2023</p>
                  <p>
                    <strong>1. Data Collection:</strong> We collect only the images you upload for the purpose of generating the virtual try-on result. We do not store biometric data.
                  </p>
                  <p>
                    <strong>2. Data Usage:</strong> Your photos are processed securely using our AI pipeline and are automatically deleted after the session or within 24 hours.
                  </p>
                  <p>
                    <strong>3. Third Parties:</strong> We use trusted third-party providers (e.g., Replicate, Google Cloud) for image processing. Data is transmitted securely via TLS 1.3.
                  </p>
                  <p>
                    <strong>4. Your Rights:</strong> You have the right to request deletion of any data associated with your session by contacting support.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Terms of Service</h3>
                  <p>
                    <strong>1. Acceptance:</strong> By using S_FIT NEO, you agree to these terms.
                  </p>
                  <p>
                    <strong>2. Usage:</strong> This tool is for personal, non-commercial use. Do not upload illegal or offensive content.
                  </p>
                  <p>
                    <strong>3. Disclaimer:</strong> The AI-generated results are simulations and may not perfectly reflect reality. We are not liable for purchasing decisions made based on these images.
                  </p>
                  <p>
                    <strong>4. Intellectual Property:</strong> You retain ownership of your photos. S_FIT retains ownership of the AI models and interface.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/20 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
