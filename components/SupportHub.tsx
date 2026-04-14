'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [issueText, setIssueText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setIssueText('');
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 bg-[#050505] border-l border-[#C9B037]/30 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black">
              <h2 className="font-serif text-2xl text-[#C9B037] uppercase tracking-widest">Support Hub</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-2">Report an Issue</h3>
                <p className="text-xs text-gray-400 mb-4">Help us improve the fitting experience.</p>

                {submitted ? (
                  <div className="bg-[#C9B037]/10 border border-[#C9B037]/30 text-[#C9B037] p-4 rounded-xl text-center">
                    Thank you. Your report has been submitted.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                      value={issueText}
                      onChange={(e) => setIssueText(e.target.value)}
                      placeholder="Describe the bug or issue..."
                      className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C9B037] transition-colors"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#C9B037] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-[#A0882A] transition-colors"
                    >
                      Submit Report
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
