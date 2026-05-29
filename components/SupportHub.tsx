'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'hub' | 'privacy' | 'terms' | 'report'>('hub');

  const openTab = (tab: 'hub' | 'privacy' | 'terms' | 'report') => {
    setActiveTab(tab);
  };

  const closeHub = () => {
    setIsOpen(false);
    setTimeout(() => setActiveTab('hub'), 300); // Reset after animation
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-full p-3 shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all transform hover:scale-[1.05]"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined flex items-center justify-center w-6 h-6 font-bold text-xl">
          ?
        </span>
      </button>

      {/* Overlay & Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeHub}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-[#111] border-l border-white/10 h-full flex flex-col text-white shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#050505]">
                <h2 className="text-xl font-bold tracking-tight">
                  {activeTab === 'hub' && 'Trust & Support'}
                  {activeTab === 'privacy' && 'Privacy Policy'}
                  {activeTab === 'terms' && 'Terms of Service'}
                  {activeTab === 'report' && 'Report an Issue'}
                </h2>
                <button
                  onClick={activeTab === 'hub' ? closeHub : () => setActiveTab('hub')}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                  aria-label={activeTab === 'hub' ? 'Close' : 'Back'}
                >
                  {activeTab === 'hub' ? '✕' : '← Back'}
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeTab === 'hub' && (
                  <div className="space-y-4">
                    <button
                      onClick={() => openTab('privacy')}
                      className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-[#007AFF] hover:bg-white/5 transition-colors flex justify-between items-center group"
                    >
                      <span className="font-medium group-hover:text-[#007AFF] transition-colors">Privacy Policy</span>
                      <span className="text-gray-500 group-hover:text-[#007AFF]">→</span>
                    </button>

                    <button
                      onClick={() => openTab('terms')}
                      className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-[#007AFF] hover:bg-white/5 transition-colors flex justify-between items-center group"
                    >
                      <span className="font-medium group-hover:text-[#007AFF] transition-colors">Terms of Service</span>
                      <span className="text-gray-500 group-hover:text-[#007AFF]">→</span>
                    </button>

                    <button
                      onClick={() => openTab('report')}
                      className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-[#007AFF] hover:bg-white/5 transition-colors flex justify-between items-center group"
                    >
                      <span className="font-medium group-hover:text-[#007AFF] transition-colors">Report Issue</span>
                      <span className="text-gray-500 group-hover:text-[#007AFF]">→</span>
                    </button>

                    <div className="mt-8 p-4 bg-black/40 rounded-xl border border-white/5 text-center space-y-2">
                       <div className="text-2xl mb-2">🛡️</div>
                       <h3 className="font-bold text-sm text-[#007AFF]">Data Safety Guarantee</h3>
                       <p className="text-xs text-gray-400">Your photos are processed securely and never shared with third parties.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="prose prose-invert prose-sm">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      At S_FIT AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our virtual fitting room service.
                    </p>
                    <h3 className="text-white font-bold mt-6 mb-2">1. Information Collection</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      We collect the photos you upload solely for the purpose of generating your virtual fitting results. We do not use your photos for any other purpose.
                    </p>
                    <h3 className="text-white font-bold mt-6 mb-2">2. Data Security</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Your photos are processed securely and are automatically deleted from our servers after the processing is complete. We do not store your photos permanently.
                    </p>
                  </div>
                )}

                {activeTab === 'terms' && (
                  <div className="prose prose-invert prose-sm">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Welcome to S_FIT AI. By using our service, you agree to these Terms of Service.
                    </p>
                    <h3 className="text-white font-bold mt-6 mb-2">1. Use of Service</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Our virtual fitting room is provided &quot;as is&quot; for your personal, non-commercial use. You agree not to misuse the service or attempt to bypass any security measures.
                    </p>
                    <h3 className="text-white font-bold mt-6 mb-2">2. Content Ownership</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      You retain all rights to the photos you upload. S_FIT AI claims no ownership over your content.
                    </p>
                  </div>
                )}

                {activeTab === 'report' && (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Issue reported successfully!'); setActiveTab('hub'); }}>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Issue Type</label>
                      <select className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-all">
                        <option>Visual Glitch</option>
                        <option>Processing Error</option>
                        <option>Performance Issue</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
                      <textarea
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm h-32 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-all resize-none"
                        placeholder="Please describe the issue..."
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors">
                      Submit Report
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
