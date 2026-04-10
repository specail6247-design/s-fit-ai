import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

export function LegalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-2xl max-h-[80vh] flex flex-col bg-[#111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 text-white"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex border-b border-white/10">
              <button
                className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'privacy' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('privacy')}
              >
                Privacy Policy
              </button>
              <button
                className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'terms' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('terms')}
              >
                Terms of Service
              </button>
              <button onClick={onClose} className="px-6 text-gray-400 hover:text-white transition-colors border-l border-white/10">
                ✕
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 font-mono text-xs text-gray-300 space-y-6 leading-relaxed">
              {activeTab === 'privacy' ? (
                <>
                  <h2 className="text-xl font-bold text-white font-sans uppercase mb-4">Privacy Policy</h2>
                  <p>Last updated: {new Date().toLocaleDateString()}</p>
                  <p>1. <strong>Data Collection:</strong> We collect uploaded photos exclusively for the purpose of generating virtual fitting results.</p>
                  <p>2. <strong>Data Safety:</strong> Photos are processed securely on our servers and are not shared with third parties or used for model training without explicit consent.</p>
                  <p>3. <strong>Data Retention:</strong> Temporary session data, including uploaded images, is automatically deleted from our processing servers within 24 hours.</p>
                  <p>4. <strong>User Rights:</strong> You may request immediate deletion of your data by contacting support.</p>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-white font-sans uppercase mb-4">Terms of Service</h2>
                  <p>Last updated: {new Date().toLocaleDateString()}</p>
                  <p>1. <strong>Acceptance:</strong> By using Masterpiece Fit / S_FIT, you agree to these terms.</p>
                  <p>2. <strong>Usage Restrictions:</strong> The generated images are for personal use. You may not use the service to generate inappropriate, explicit, or copyright-infringing content.</p>
                  <p>3. <strong>Service Availability:</strong> We strive for 99.9% uptime, but the service is provided &quot;as is&quot; without warranties.</p>
                  <p>4. <strong>Liability:</strong> We are not liable for decisions made based on virtual fitting representations.</p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
