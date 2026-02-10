import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function LegalModal() {
  const { isLegalModalOpen, toggleLegalModal } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  if (!isLegalModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={() => toggleLegalModal(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#111]">
            <h2 className="text-xl font-bold font-mono text-white">Legal & Compliance</h2>
            <button
              onClick={() => toggleLegalModal(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close Modal"
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
          <div className="flex-1 overflow-y-auto p-6 text-gray-300 text-sm leading-relaxed space-y-4">
            {activeTab === 'privacy' ? (
              <>
                <h3 className="text-lg font-bold text-white mb-2">Data Privacy & Security</h3>
                <p>
                  At S_FIT NEO, we take your privacy seriously. This policy outlines how we handle your data, specifically your photos and personal measurements.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Photo Processing:</strong> Your uploaded photos are processed temporarily for the sole purpose of generating the virtual try-on result. They are not stored permanently on our servers after the session expires.</li>
                  <li><strong>Data Sharing:</strong> We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</li>
                  <li><strong>Security:</strong> We implement a variety of security measures to maintain the safety of your personal information when you upload a photo.</li>
                </ul>
                <p className="mt-4 text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-white mb-2">Terms of Service</h3>
                <p>
                  By accessing S_FIT NEO, you agree to be bound by these Terms of Service.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Usage:</strong> You agree to use the service only for lawful purposes and in accordance with these Terms.</li>
                  <li><strong>Intellectual Property:</strong> All content, features, and functionality are the exclusive property of S_FIT NEO and its licensors.</li>
                  <li><strong>Limitation of Liability:</strong> In no event shall S_FIT NEO be liable for any indirect, incidental, special, consequential or punitive damages.</li>
                </ul>
                <p className="mt-4 text-xs text-gray-500">Effective Date: {new Date().toLocaleDateString()}</p>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 bg-[#111] flex justify-end">
            <button
              onClick={() => toggleLegalModal(false)}
              className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-lg font-bold text-sm transition-colors"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
