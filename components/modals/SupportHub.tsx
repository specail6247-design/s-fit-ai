'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportOpen, setSupportOpen } = useStore();
  const [issueText, setIssueText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isSupportOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    // Simulate sending issue report
    setTimeout(() => {
      setSubmitted(true);
      setIssueText('');
    }, 500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSupportOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Content */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[#0a0a0a]/90 backdrop-blur-md p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
              <span className="material-symbols-outlined text-[#007AFF]">help</span>
              Support Hub
            </h2>
            <button
              onClick={() => setSupportOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="p-6 space-y-8">

            {/* Data Safety Badge */}
            <div className="bg-[#007AFF]/10 border border-[#007AFF]/20 rounded-xl p-4 flex items-start gap-4">
              <span className="material-symbols-outlined text-[#007AFF] text-3xl">shield_lock</span>
              <div>
                <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-1">Data Safety Guarantee</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Photos are processed securely and not shared. Biometric landmarks are ephemeral and discarded instantly after generation.
                </p>
              </div>
            </div>

            {/* How to Fit / FAQ */}
            <section className="space-y-4">
              <h3 className="text-white text-xs font-bold tracking-widest uppercase border-b border-white/10 pb-2">
                Frequently Asked Questions
              </h3>

              <details className="group border border-white/10 rounded-lg bg-white/5 overflow-hidden">
                <summary className="p-4 cursor-pointer text-sm font-bold text-gray-200 hover:text-white flex justify-between items-center list-none [&::-webkit-details-marker]:hidden">
                  What kind of photo works best?
                  <span className="text-[#007AFF] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/10 mt-2">
                  For the best results, upload a well-lit, full-body photo facing straight forward against a plain background. Avoid baggy clothing that obscrurs your natural silhouette.
                </div>
              </details>

              <details className="group border border-white/10 rounded-lg bg-white/5 overflow-hidden">
                <summary className="p-4 cursor-pointer text-sm font-bold text-gray-200 hover:text-white flex justify-between items-center list-none [&::-webkit-details-marker]:hidden">
                  Why does my generation look warped?
                  <span className="text-[#007AFF] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/10 mt-2">
                  Complex poses or overlapping limbs can confuse the 3D meshing engine. Try uploading a photo with your arms slightly apart from your body (A-pose).
                </div>
              </details>
            </section>

            {/* Report Issue Form */}
            <section className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="text-white text-xs font-bold tracking-widest uppercase">
                Report an Issue
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center"
                >
                  <span className="material-symbols-outlined text-green-500 text-3xl mb-2">check_circle</span>
                  <p className="text-green-400 text-sm font-bold">Report Received</p>
                  <p className="text-gray-400 text-xs mt-1">Our engineering team has been notified. Thank you for your feedback.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs text-gray-400 hover:text-white underline"
                  >
                    Submit another issue
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <p className="text-xs text-gray-400 mb-2">
                    Help us catch bugs early. Describe the issue you encountered during generation or navigation.
                  </p>
                  <textarea
                    value={issueText}
                    onChange={(e) => setIssueText(e.target.value)}
                    placeholder="Describe what went wrong..."
                    className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] resize-none h-32"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Submit Report
                  </button>
                </form>
              )}
            </section>

            {/* Footer Contact */}
            <div className="pt-8 text-center text-xs text-gray-500">
              Need immediate assistance?<br/>
              <a href="mailto:support@sfit.ai" className="text-[#007AFF] hover:underline mt-1 inline-block">support@sfit.ai</a>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}