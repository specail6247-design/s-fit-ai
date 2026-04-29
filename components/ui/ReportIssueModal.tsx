'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ReportIssueModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;

    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIssue('');
        onClose();
      }, 2000);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-md overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/50">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>⚠️</span> Report an Issue
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="text-4xl">✅</div>
                  <h3 className="text-white font-bold">Issue Reported</h3>
                  <p className="text-sm text-gray-400">Thank you for helping us improve S_FIT.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-gray-400">Encountered a bug or have feedback? Let us know below.</p>
                  <textarea
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Describe the issue..."
                    className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-[#007AFF] transition-colors min-h-[120px] resize-none"
                    required
                  />
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white text-sm font-bold rounded-lg transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
