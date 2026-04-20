'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PrivacyTermsModal } from './PrivacyTermsModal';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [issueText, setIssueText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (issueText.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIssueText('');
      }, 3000);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#050505] border border-[#C9B037]/50 text-[#C9B037] p-3 rounded-full shadow-[0_0_15px_rgba(201,176,55,0.2)] hover:shadow-[0_0_20px_rgba(201,176,55,0.4)] transition-all flex items-center justify-center focus-visible:ring-2 outline-none"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined" aria-hidden="true">support_agent</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-[#050505] border-l border-[#C9B037]/20 z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-[#C9B037]/20 flex justify-between items-center bg-[#0a0a0a]">
                <h2 className="text-[#C9B037] font-serif uppercase tracking-widest text-lg">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white focus-visible:ring-2 outline-none" aria-label="Close Support Hub">
                  <span className="material-symbols-outlined" aria-hidden="true">close</span>
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-8">
                {/* Report Issue Form */}
                <section>
                  <h3 className="text-white font-sans font-bold uppercase text-xs tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#C9B037] text-sm" aria-hidden="true">bug_report</span>
                    Report Issue
                  </h3>
                  {submitted ? (
                    <div className="bg-[#111] border border-green-500/30 p-4 rounded text-green-400 text-sm text-center">
                      Thank you. Your feedback has been received.
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <textarea
                        value={issueText}
                        onChange={(e) => setIssueText(e.target.value)}
                        placeholder="Describe the bug or feedback..."
                        className="w-full bg-[#111] border border-white/10 rounded p-3 text-sm text-white focus:border-[#C9B037] focus:outline-none transition-colors min-h-[100px] resize-y"
                        required
                      />
                      <button type="submit" className="w-full py-2 bg-[#C9B037]/10 hover:bg-[#C9B037]/20 border border-[#C9B037]/50 text-[#C9B037] text-xs font-bold uppercase tracking-widest rounded transition-colors focus-visible:ring-2 outline-none">
                        Submit Report
                      </button>
                    </form>
                  )}
                </section>

                <hr className="border-white/5" />

                {/* Legal Links */}
                <section>
                  <h3 className="text-white font-sans font-bold uppercase text-xs tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#C9B037] text-sm" aria-hidden="true">policy</span>
                    Legal & Compliance
                  </h3>
                  <button
                    onClick={() => setShowLegal(true)}
                    className="w-full text-left p-3 bg-[#111] hover:bg-[#1a1a1a] border border-white/5 hover:border-white/20 rounded text-sm text-gray-300 transition-colors flex justify-between items-center group focus-visible:ring-2 outline-none"
                    aria-label="Privacy Policy and Terms"
                  >
                    <span>Privacy Policy & Terms</span>
                    <span className="material-symbols-outlined text-gray-500 group-hover:text-white text-sm" aria-hidden="true">chevron_right</span>
                  </button>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <PrivacyTermsModal isOpen={showLegal} onClose={() => setShowLegal(false)} />
    </>
  );
}
