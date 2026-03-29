import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ReportIssueModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIssue('');
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative bg-[#111] border border-white/20 p-6 max-w-md w-full rounded-2xl shadow-2xl"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2"><span>🐞</span> Report Issue</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close">✕</button>
          </div>

          {submitted ? (
            <motion.div
              className="py-8 flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className="text-4xl mb-3">✅</span>
              <p className="text-[#007AFF] font-bold">Issue Reported Successfully!</p>
              <p className="text-xs text-gray-400 mt-2">Thank you for helping us improve S_FIT AI.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-gray-400">Please describe the bug or issue you encountered. Your feedback helps us build a better fitting experience.</p>
              <textarea
                className="w-full h-32 bg-black/50 border border-white/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#007AFF] resize-none transition-colors"
                placeholder="What went wrong?"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
              />
              <div className="flex gap-3">
                <button type="button" onClick={onClose} className="flex-1 py-3 border border-white/20 rounded-xl text-gray-300 hover:bg-white/5 transition-colors text-sm font-bold">
                  Cancel
                </button>
                <button type="submit" disabled={!issue.trim()} className="flex-1 py-3 bg-[#007AFF] text-white rounded-xl hover:bg-[#005bb5] transition-colors text-sm font-bold shadow-[0_0_15px_rgba(0,122,255,0.3)] disabled:opacity-50 disabled:shadow-none">
                  Submit Report
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
