'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen, activeSupportTab, setActiveSupportTab } = useStore();
  const [issueText, setIssueText] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    setIsSubmitting(true);
    // Simulate API call - In production, this would POST to /api/support
    console.log('Support Report:', { email, issueText });
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSuccess(true);
    setIssueText('');
    setTimeout(() => {
        setSuccess(false);
        setSupportHubOpen(false);
    }, 2000);
  };

  if (!isSupportHubOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSupportHubOpen(false)}
        />

        {/* Drawer */}
        <motion.div
          className="relative w-full max-w-md h-full bg-[#111] border-l border-white/10 shadow-2xl flex flex-col"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-[#141414] flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🛡️</span> Support Hub
              </h2>
              <p className="text-xs text-gray-400 mt-1">We&apos;re here to help.</p>
            </div>
            <button
              onClick={() => setSupportHubOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <div className="flex border-b border-white/10 bg-[#0f0f0f]">
            <button
              onClick={() => setActiveSupportTab('qa')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${activeSupportTab === 'qa' ? 'border-[#007AFF] text-[#007AFF] bg-white/5' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            >
              Q&A
            </button>
            <button
              onClick={() => setActiveSupportTab('report')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${activeSupportTab === 'report' ? 'border-[#007AFF] text-[#007AFF] bg-white/5' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            >
              Report Issue
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10">
            {activeSupportTab === 'qa' ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white">How do I upload a photo?</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Click on the user photo area in the left sidebar. We support JPG and PNG formats up to 5MB. Ensure your full body is visible for the best results.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white">Is my data secure?</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Absolutely. Your photos are processed securely in memory and are deleted immediately after your session. We do not store your personal photos.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white">Why does the fit look different?</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Our AI simulates how the garment would drape on your body shape. While highly accurate, it is a simulation. Check the fit heatmap for detailed analysis.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                {success ? (
                   <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
                   >
                     <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-3xl mb-2">✓</div>
                     <h3 className="text-lg font-bold text-white">Issue Reported</h3>
                     <p className="text-sm text-gray-400 max-w-[80%]">Thank you for your feedback. Our team will investigate immediately.</p>
                   </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex gap-3">
                       <span className="text-yellow-500 text-xl">⚠️</span>
                       <p className="text-[10px] text-yellow-200/80 leading-tight">Found a bug? Let us know the details so we can squash it.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase">Your Email (Optional)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="fashionista@example.com"
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[#007AFF] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase">Issue Description</label>
                      <textarea
                        value={issueText}
                        onChange={(e) => setIssueText(e.target.value)}
                        placeholder="Describe what happened..."
                        rows={6}
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[#007AFF] focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !issueText.trim()}
                      className="w-full py-4 bg-[#007AFF] hover:bg-[#0066cc] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>🚀</span> Submit Report
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
