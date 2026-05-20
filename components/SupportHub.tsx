'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'policy' | 'terms' | 'report'>('policy');

  const tabs = [
    { id: 'policy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms' },
    { id: 'report', label: 'Report Issue' }
  ] as const;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-40 border border-white/20"
        aria-label="Open Support Hub"
      >
        <span className="text-xl font-bold">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            <motion.div
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
                <h2 className="text-xl font-bold text-white tracking-tight">Support & Trust Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  ✕
                </button>
              </div>

              {/* Data Safety Badge */}
              <div className="bg-[#111] p-4 flex items-center justify-center gap-3 border-b border-white/5">
                <span className="text-green-500 text-xl">🔒</span>
                <p className="text-xs font-mono text-gray-300">
                  <strong className="text-white">DATA SAFETY:</strong> Photos are processed securely and not shared.
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-white/10 bg-black/30">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                      activeTab === tab.id
                        ? 'text-white border-b-2 border-white bg-white/5'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300 bg-black/20">
                {activeTab === 'policy' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white mb-2">Privacy Policy</h3>
                    <p>Last updated: Today</p>
                    <p>
                      At S_FIT AI, your privacy is our priority. We temporarily process your photos to generate virtual try-on results.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                      <li>Photos are encrypted in transit and at rest.</li>
                      <li>We automatically delete images from our processing servers immediately after generation.</li>
                      <li>We do not sell or share your biometric data or images with third parties.</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'terms' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white mb-2">Terms of Service</h3>
                    <p>
                      By using S_FIT AI, you agree to these terms:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                      <li>You must only upload images you have the right to use.</li>
                      <li>The virtual fitting results are for personal visualization and not a guarantee of actual fit.</li>
                      <li>Abuse of the platform, including uploading explicit content, will result in immediate termination of access.</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'report' && (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Issue reported. Thank you!'); setIsOpen(false); }}>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Email (Optional)</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Description</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Please describe the issue..."
                        className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors text-sm resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Submit Report
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
