'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'hub' | 'privacy' | 'terms' | 'report'>('hub');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined text-white">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[101] p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold tracking-widest uppercase">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {activeTab === 'hub' && (
                <div className="space-y-6">
                  {/* Data Safety Badge */}
                  <div className="bg-white/5 border border-[#007AFF]/30 p-4 rounded-xl flex items-start gap-3">
                    <span className="text-[#007AFF] text-2xl">🔒</span>
                    <div>
                      <h3 className="text-sm font-bold text-[#007AFF]">Data Safety Verified</h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Photos are processed securely and not shared. We prioritize your privacy.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setActiveTab('privacy')} className="p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-left">
                      <h4 className="text-sm font-bold">Privacy Policy</h4>
                      <p className="text-[10px] text-gray-500 mt-1">Read our data policies</p>
                    </button>
                    <button onClick={() => setActiveTab('terms')} className="p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-left">
                      <h4 className="text-sm font-bold">Terms of Service</h4>
                      <p className="text-[10px] text-gray-500 mt-1">Usage guidelines</p>
                    </button>
                  </div>

                  <button onClick={() => setActiveTab('report')} className="w-full p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-left flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-red-400">Report Issue</h4>
                      <p className="text-[10px] text-gray-500 mt-1">Help us catch bugs early</p>
                    </div>
                    <span className="text-red-400">🚨</span>
                  </button>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-4">
                  <button onClick={() => setActiveTab('hub')} className="text-xs text-gray-500 hover:text-white mb-4">← Back to Hub</button>
                  <h3 className="font-bold text-lg">Privacy Policy</h3>
                  <div className="text-xs text-gray-400 space-y-2">
                    <p>1. Data Collection: We only collect necessary image data for the purpose of generating virtual try-on results.</p>
                    <p>2. Data Storage: Images are processed securely. We do not store your personal photos permanently.</p>
                    <p>3. Third Parties: We do not share your data with unauthorized third parties.</p>
                  </div>
                </div>
              )}

              {activeTab === 'terms' && (
                <div className="space-y-4">
                  <button onClick={() => setActiveTab('hub')} className="text-xs text-gray-500 hover:text-white mb-4">← Back to Hub</button>
                  <h3 className="font-bold text-lg">Terms of Service</h3>
                  <div className="text-xs text-gray-400 space-y-2">
                    <p>1. Usage: This service is intended for personal, non-commercial use only.</p>
                    <p>2. Content: You must have the right to use the images you upload.</p>
                    <p>3. Liability: We are not responsible for the generated results or any misuse of the platform.</p>
                  </div>
                </div>
              )}

              {activeTab === 'report' && (
                <div className="space-y-4">
                  <button onClick={() => setActiveTab('hub')} className="text-xs text-gray-500 hover:text-white mb-4">← Back to Hub</button>
                  <h3 className="font-bold text-lg text-red-400">Report Issue</h3>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Issue reported! Thank you.'); setActiveTab('hub'); }}>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Issue Type</label>
                      <select className="w-full bg-black border border-white/20 rounded-lg p-2 text-sm text-white focus:border-[#007AFF] outline-none">
                        <option>Bug / Glitch</option>
                        <option>Bad Fitting Result</option>
                        <option>UI/UX Issue</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Description</label>
                      <textarea required className="w-full bg-black border border-white/20 rounded-lg p-2 text-sm text-white focus:border-[#007AFF] outline-none h-32" placeholder="Please describe the issue..." />
                    </div>
                    <button type="submit" className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/30 font-bold py-3 rounded-lg text-sm border border-red-500/50 transition-colors">
                      Submit Report
                    </button>
                  </form>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
