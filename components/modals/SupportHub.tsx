'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { showSupportHub, setShowSupportHub } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'issue'>('guide');
  const [issueText, setIssueText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!showSupportHub) return null;

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setIssueText('');
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md h-full bg-[#111] border-l border-white/10 flex flex-col shadow-2xl shadow-black/50 overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/40">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-[#007AFF]">💬</span> Support Hub
            </h2>
            <button
              onClick={() => setShowSupportHub(false)}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10 bg-black/20">
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === 'guide' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              How it Works
              {activeTab === 'guide' && (
                <motion.div
                  layoutId="supportTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('issue')}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === 'issue' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Report Issue
              {activeTab === 'issue' && (
                <motion.div
                  layoutId="supportTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]"
                />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-6">
            {activeTab === 'guide' ? (
              <motion.div
                key="guide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Best Practices</h3>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 group hover:border-white/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📸</span>
                      <h4 className="font-semibold text-white">User Photo</h4>
                    </div>
                    <ul className="text-sm text-gray-400 list-disc pl-11 space-y-1">
                      <li>Front-facing, full-body view</li>
                      <li>Well-lit, neutral background</li>
                      <li>Form-fitting clothing preferred</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 group hover:border-white/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👕</span>
                      <h4 className="font-semibold text-white">Garment Photo</h4>
                    </div>
                    <ul className="text-sm text-gray-400 list-disc pl-11 space-y-1">
                      <li>Flat-lay or ghost mannequin</li>
                      <li>High resolution (1080p+)</li>
                      <li>No wrinkles or extreme angles</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">FAQ</h3>

                  <div className="space-y-2">
                    <details className="group p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer">
                      <summary className="font-semibold text-gray-200 group-open:text-white flex justify-between items-center list-none">
                        Why does the fit look loose?
                        <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-4 text-sm text-gray-400 pl-4 border-l-2 border-[#007AFF]">
                        The AI tries to infer the garment&apos;s natural drape. Ensure your garment photo is high quality and your user photo shows clear body contours.
                      </p>
                    </details>

                    <details className="group p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer">
                      <summary className="font-semibold text-gray-200 group-open:text-white flex justify-between items-center list-none">
                        Are my photos safe?
                        <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-4 text-sm text-gray-400 pl-4 border-l-2 border-[#007AFF]">
                        Yes. Photos are strictly used for the immediate generation process and are securely discarded from our active servers within 24 hours.
                      </p>
                    </details>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="issue"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Report a Bug or Issue</h3>
                  <p className="text-sm text-gray-400">Help us improve S_FIT AI. Please describe the issue you encountered in detail.</p>
                </div>

                <form onSubmit={handleIssueSubmit} className="flex-1 flex flex-col space-y-4">
                  <textarea
                    value={issueText}
                    onChange={(e) => setIssueText(e.target.value)}
                    placeholder="e.g., &apos;The AI generated an extra arm when trying on the red jacket...&apos;"
                    className="w-full flex-1 min-h-[200px] bg-black/40 border border-white/20 rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] transition-all resize-none"
                    required
                  />

                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-center text-sm font-semibold"
                    >
                      Report submitted successfully. Thank you!
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !issueText.trim()}
                      className={`w-full py-4 rounded-xl font-bold transition-all ${
                        isSubmitting || !issueText.trim()
                          ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                          : 'bg-[#007AFF] hover:bg-[#005bb5] text-white shadow-[0_0_15px_rgba(0,122,255,0.3)] hover:scale-[1.02]'
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                  )}
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
