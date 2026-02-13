'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function LegalModal() {
  const { isLegalModalOpen, setLegalModalOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  const handleClose = () => setLegalModalOpen(false);

  return (
    <AnimatePresence>
      {isLegalModalOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-void-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
              <h2 className="text-xl font-bold font-mono tracking-tight text-white">
                LEGAL DOCUMENTS
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
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
                    ? 'bg-white/5 text-[#007AFF] border-b-2 border-[#007AFF]'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'terms'
                    ? 'bg-white/5 text-[#007AFF] border-b-2 border-[#007AFF]'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                Terms of Service
              </button>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto text-sm text-gray-300 leading-relaxed space-y-4">
              {activeTab === 'privacy' ? (
                <>
                  <h3 className="text-lg font-bold text-white mb-2">1. Data Collection</h3>
                  <p>We collect images solely for the purpose of virtual fitting processing. Your photos are processed securely and are not used for training public models without explicit consent.</p>

                  <h3 className="text-lg font-bold text-white mb-2">2. Processing</h3>
                  <p>Images are processed using ephemeral instances. Original photos are deleted from our processing servers immediately after the fitting result is generated.</p>

                  <h3 className="text-lg font-bold text-white mb-2">3. User Rights</h3>
                  <p>You have the right to request deletion of any data associated with your session ID. Contact support for assistance.</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-white mb-2">1. Acceptance</h3>
                  <p>By using S_FIT AI, you agree to these terms. You must be at least 13 years old to use this service.</p>

                  <h3 className="text-lg font-bold text-white mb-2">2. Usage Limits</h3>
                  <p>Free tier users are limited to 5 try-ons per day. Automated scraping or abuse of the API is strictly prohibited.</p>

                  <h3 className="text-lg font-bold text-white mb-2">3. Disclaimer</h3>
                  <p>The virtual fitting results are AI-generated simulations and may not perfectly reflect real-world fit or drape.</p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end">
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-[#007AFF] text-white font-bold rounded-lg hover:bg-[#0062cc] transition-colors"
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
