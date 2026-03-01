'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export const SupportHub: React.FC = () => {
  const { isSupportOpen, setIsSupportOpen } = useStore();
  const [reportIssue, setReportIssue] = useState('');
  const [issueSubmitted, setIssueSubmitted] = useState(false);

  if (!isSupportOpen) return null;

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportIssue.trim()) return;

    // Simulate API call for issue report
    setTimeout(() => {
      setIssueSubmitted(true);
      setReportIssue('');
      setTimeout(() => setIssueSubmitted(false), 3000);
    }, 500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 z-[70] w-full sm:w-[400px] bg-void-black border-l border-white/10 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🛡️</span> Support Hub
          </h2>
          <button
            onClick={() => setIsSupportOpen(false)}
            className="text-soft-gray hover:text-white transition-colors p-2"
            aria-label="Close Support Hub"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* How to Fit Section */}
          <section>
            <h3 className="text-sm font-bold text-cyber-lime uppercase tracking-widest mb-4">
              How to Get the Best Fit
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4 text-sm text-soft-gray">
              <div className="flex gap-3">
                <span className="text-lg" role="img" aria-label="lighting">💡</span>
                <div>
                  <p className="font-bold text-white">Good Lighting</p>
                  <p>Ensure your face and body are well-lit, avoiding harsh shadows.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-lg" role="img" aria-label="posture">🧍‍♀️</span>
                <div>
                  <p className="font-bold text-white">Clear Posture</p>
                  <p>Stand straight with arms slightly away from your body.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-lg" role="img" aria-label="clothing">👕</span>
                <div>
                  <p className="font-bold text-white">Fitted Clothing</p>
                  <p>Wear form-fitting clothes for accurate body shape detection.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Cautions */}
          <section>
            <h3 className="text-sm font-bold text-cyber-lime uppercase tracking-widest mb-4">
              Important Notes
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-soft-gray bg-white/5 border border-white/10 p-4 rounded-xl">
              <li>Results may vary depending on image quality.</li>
              <li>Extreme poses might cause rendering artifacts.</li>
              <li>Highly complex patterns on garments may blur slightly during generation.</li>
            </ul>
          </section>

          {/* Report Issue Form */}
          <section>
            <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4">
              Report an Issue
            </h3>
            <form onSubmit={handleIssueSubmit} className="space-y-4 bg-white/5 border border-white/10 p-4 rounded-xl">
              <p className="text-xs text-soft-gray">Spotted a bug or bad fit? Let us know!</p>
              <textarea
                value={reportIssue}
                onChange={(e) => setReportIssue(e.target.value)}
                placeholder="Describe the problem..."
                className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-sm text-white resize-none h-24 focus:border-cyber-lime outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                {issueSubmitted ? (
                  <span className="text-cyber-lime">Issue Reported! ✓</span>
                ) : (
                  <span>Send Report</span>
                )}
              </button>
            </form>
          </section>

        </div>
      </motion.div>

      {/* Backdrop */}
      {isSupportOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSupportOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
        />
      )}
    </AnimatePresence>
  );
};
