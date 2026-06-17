'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'issue' | 'legal'>('guide');
  const [legalModalOpen, setLegalModalOpen] = useState<'privacy' | 'terms' | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'guide':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">User Guide & FAQ</h3>
            <div className="space-y-2">
              <details className="bg-white/5 rounded p-2">
                <summary className="font-semibold cursor-pointer">How to take a good photo?</summary>
                <p className="text-sm mt-2 text-gray-300">Ensure good lighting, stand straight, and face the camera directly. Avoid wearing baggy clothes for the best fit analysis.</p>
              </details>
              <details className="bg-white/5 rounded p-2">
                <summary className="font-semibold cursor-pointer">How long does it take?</summary>
                <p className="text-sm mt-2 text-gray-300">Analysis usually takes under 10 seconds depending on your connection and the complexity of the garment.</p>
              </details>
              <details className="bg-white/5 rounded p-2">
                <summary className="font-semibold cursor-pointer">Lighting & Camera Cautions</summary>
                <p className="text-sm mt-2 text-gray-300">Avoid strong backlighting or deep shadows on your face. Make sure your camera lens is clean.</p>
              </details>
            </div>
          </div>
        );
      case 'issue':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Report an Issue</h3>
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Issue reported!'); }}>
              <div>
                <label className="block text-xs mb-1">Describe the problem</label>
                <textarea
                  className="w-full bg-black/50 border border-white/20 rounded p-2 text-sm text-white focus:outline-none focus:border-[#007AFF]"
                  rows={4}
                  placeholder="e.g., The garment didn't fit my avatar correctly..."
                  required
                />
              </div>
              <button type="submit" className="w-full py-2 bg-[#007AFF] hover:bg-blue-600 rounded font-bold text-sm transition-colors">
                Submit Report
              </button>
            </form>
          </div>
        );
      case 'legal':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Legal & Compliance</h3>
            <div className="space-y-2 flex flex-col">
              <button onClick={() => setLegalModalOpen('privacy')} className="text-left p-3 bg-white/5 hover:bg-white/10 rounded transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => setLegalModalOpen('terms')} className="text-left p-3 bg-white/5 hover:bg-white/10 rounded transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#111] border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold italic tracking-tight">Support Hub</h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">✕</button>
              </div>

              {/* Navigation */}
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 p-3 text-sm font-semibold transition-colors ${activeTab === 'guide' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-400 hover:text-white'}`}
                >
                  Guide
                </button>
                <button
                  onClick={() => setActiveTab('issue')}
                  className={`flex-1 p-3 text-sm font-semibold transition-colors ${activeTab === 'issue' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-400 hover:text-white'}`}
                >
                  Report Issue
                </button>
                <button
                  onClick={() => setActiveTab('legal')}
                  className={`flex-1 p-3 text-sm font-semibold transition-colors ${activeTab === 'legal' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-400 hover:text-white'}`}
                >
                  Legal
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto text-white">
                {renderContent()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Legal Modal */}
      <AnimatePresence>
        {legalModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setLegalModalOpen(null)}
          >
            <div
              className="bg-[#1a1a1a] border border-white/10 p-6 rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setLegalModalOpen(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4 text-white">
                {legalModalOpen === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
              <div className="text-sm text-gray-300 space-y-4">
                {legalModalOpen === 'privacy' ? (
                  <>
                    <p>Your privacy is important to us. It is S_FIT AI's policy to respect your privacy regarding any information we may collect from you across our website.</p>
                    <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
                    <p>We don't share any personally identifying information publicly or with third-parties, except when required to by law. <strong>Your uploaded photos are processed securely and not shared.</strong></p>
                  </>
                ) : (
                  <>
                    <p>By accessing the website at S_FIT AI, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
                    <p>Permission is granted to temporarily download one copy of the materials (information or software) on S_FIT AI's website for personal, non-commercial transitory viewing only.</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
