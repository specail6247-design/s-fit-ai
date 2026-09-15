'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportIssueModal({ isOpen, onClose }: ReportIssueModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [issue, setIssue] = useState('');

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
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-[#111] border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white">✕</button>
            <h2 className="text-xl font-bold mb-4 text-[#007AFF]">Report an Issue</h2>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="text-4xl">✅</div>
                <p className="text-white font-bold">Report Submitted!</p>
                <p className="text-xs text-gray-400">Thank you for helping us improve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Describe the problem</label>
                  <textarea
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[#007AFF] transition-colors resize-none"
                    placeholder="What went wrong? e.g. The generation failed..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-xl font-bold transition-colors"
                >
                  Submit Report
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
