'use client';

// S_FIT AI - Legal & Compliance Modal
// Contains Privacy Policy and Terms of Service

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useStore } from '@/store/useStore';

type Tab = 'privacy' | 'terms';

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

export function LegalModal() {
  const { isLegalModalOpen, setLegalModalOpen } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('privacy');

  const handleClose = () => {
    setLegalModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isLegalModalOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void-black/90 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl h-[80vh] glass-card overflow-hidden flex flex-col"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
              <h2 className="text-xl font-bold font-mono tracking-wider">
                LEGAL & COMPLIANCE
              </h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 bg-black/20">
              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors relative ${
                  activeTab === 'privacy'
                    ? 'text-pure-white bg-white/5'
                    : 'text-soft-gray hover:text-pure-white'
                }`}
              >
                Privacy Policy
                {activeTab === 'privacy' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors relative ${
                  activeTab === 'terms'
                    ? 'text-pure-white bg-white/5'
                    : 'text-soft-gray hover:text-pure-white'
                }`}
              >
                Terms of Service
                {activeTab === 'terms' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
                  />
                )}
              </button>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="prose prose-invert max-w-none">
                {activeTab === 'privacy' ? (
                  <PrivacyContent />
                ) : (
                  <TermsContent />
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end">
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-pure-white text-void-black font-bold rounded hover:bg-gray-200 transition-colors"
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

function PrivacyContent() {
  return (
    <div className="space-y-6 text-sm text-soft-gray">
      <div>
        <h3 className="text-pure-white font-bold text-lg mb-2">1. Data Collection & Usage</h3>
        <p>
          S_FIT AI collects user-uploaded photos solely for the purpose of generating virtual try-on results.
          We use temporary cloud processing to analyze body pose and garment structure.
        </p>
      </div>
      <div>
        <h3 className="text-pure-white font-bold text-lg mb-2">2. Data Retention</h3>
        <p>
          Uploaded images are processed in real-time and are automatically deleted from our processing servers
          within 24 hours. We do not build permanent facial recognition databases.
        </p>
      </div>
      <div>
        <h3 className="text-pure-white font-bold text-lg mb-2">3. Third-Party Processing</h3>
        <p>
          We utilize secure third-party AI inference providers (e.g., Replicate) to perform the heavy computation.
          Data transmitted to these providers is encrypted and strictly scoped for the requested task.
        </p>
      </div>
      <div>
        <h3 className="text-pure-white font-bold text-lg mb-2">4. User Rights</h3>
        <p>
          You retain full ownership of your photos. You may request immediate deletion of any residual data
          by contacting our support team via the Support Hub.
        </p>
      </div>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="space-y-6 text-sm text-soft-gray">
      <div>
        <h3 className="text-pure-white font-bold text-lg mb-2">1. Service Description</h3>
        <p>
          S_FIT AI provides an experimental AI-driven virtual fitting service. While we strive for realism,
          results are simulations and may not perfectly reflect physical garment fit.
        </p>
      </div>
      <div>
        <h3 className="text-pure-white font-bold text-lg mb-2">2. Acceptable Use</h3>
        <p>
          You agree to upload only photos that you have the right to use. Uploading illegal, offensive,
          or non-consensual imagery is strictly prohibited and will result in a ban.
        </p>
      </div>
      <div>
        <h3 className="text-pure-white font-bold text-lg mb-2">3. Disclaimer of Warranties</h3>
        <p>
          The service is provided &quot;as is&quot; without warranties of any kind. We are not responsible for
          purchasing decisions made based on virtual try-on results.
        </p>
      </div>
      <div>
        <h3 className="text-pure-white font-bold text-lg mb-2">4. Intellectual Property</h3>
        <p>
          The S_FIT AI brand, interface, and underlying technology are protected by copyright. Generated images
          can be shared for personal, non-commercial use.
        </p>
      </div>
    </div>
  );
}
