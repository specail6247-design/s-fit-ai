'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PrivacyTermsModal } from './PrivacyTermsModal';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrivacyTerms, setShowPrivacyTerms] = useState(false);
  const [issueText, setIssueText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReportIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;
    // In a real app, send to backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIssueText('');
    }, 3000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/5 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 hover:border-[#007AFF] transition-all z-40 group shadow-lg backdrop-blur-sm"
        aria-label="Support Hub"
      >
        <span className="text-xl opacity-80 group-hover:opacity-100 group-hover:text-[#007AFF] transition-colors">?</span>
      </button>

      {/* Support Hub Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#050505] border-l border-white/10 p-6 z-50 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold tracking-tight">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-8">
                {/* Report Issue Form */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-wider">Report Issue</h3>
                  <form onSubmit={handleReportIssue} className="space-y-3">
                    <textarea
                      value={issueText}
                      onChange={(e) => setIssueText(e.target.value)}
                      placeholder="Describe the bug or issue you encountered..."
                      className="w-full h-24 bg-black/40 border border-white/20 rounded-xl p-3 text-sm focus:outline-none focus:border-[#007AFF] transition-colors resize-none placeholder-white/30"
                      required
                    />
                    <button
                      type="submit"
                      disabled={submitted}
                      className="w-full py-2.5 bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 rounded-xl text-xs font-bold tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitted ? 'SENT ✓' : 'SUBMIT REPORT'}
                    </button>
                  </form>
                </div>

                {/* Legal & Compliance */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-wider">Legal & Compliance</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setShowPrivacyTerms(true)}
                      className="w-full text-left px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm transition-colors flex justify-between items-center"
                    >
                      <span>Privacy Policy & Terms</span>
                      <span className="opacity-50">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <PrivacyTermsModal
        isOpen={showPrivacyTerms}
        onClose={() => setShowPrivacyTerms(false)}
      />
    </>
  );
}
