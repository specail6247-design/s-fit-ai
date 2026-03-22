import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

export function LegalModal({ isOpen, onClose }: LegalModalProps) {
  const [activeTab, setActiveTab] = React.useState<'privacy' | 'terms'>('privacy');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white tracking-wide">
                Legal & Compliance
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
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
                    ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-[#007AFF]/5'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeTab === 'terms'
                    ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-[#007AFF]/5'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                Terms of Service
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300 leading-relaxed space-y-4">
              {activeTab === 'privacy' ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">Privacy Policy</h3>
                  <p>
                    <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
                  </p>
                  <p>
                    At S_FIT AI, your privacy is our top priority. We collect and process your uploaded photos strictly for the purpose of generating your virtual try-on results.
                  </p>
                  <p>
                    <strong>Data Processing:</strong> Photos are processed securely using our AI engine. We do not store your uploaded photos on our servers beyond the session required to generate your 3D fitting image or video.
                  </p>
                  <p>
                    <strong>Data Sharing:</strong> We do not sell or share your personal data or photos with third parties for marketing purposes.
                  </p>
                  <p>
                    <strong>Security:</strong> All data transmissions are encrypted using industry-standard protocols.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">Terms of Service</h3>
                  <p>
                    <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
                  </p>
                  <p>
                    Welcome to S_FIT AI. By using our application, you agree to comply with and be bound by the following terms of service.
                  </p>
                  <p>
                    <strong>Use License:</strong> Permission is granted to temporarily download one copy of the materials (information or software) on S_FIT AI&apos;s website for personal, non-commercial transitory viewing only.
                  </p>
                  <p>
                    <strong>Disclaimer:</strong> The materials on S_FIT AI&apos;s website are provided on an &apos;as is&apos; basis. S_FIT AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                  <p>
                    <strong>Limitations:</strong> In no event shall S_FIT AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on S_FIT AI&apos;s website.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-black/40 text-center">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors text-sm"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
