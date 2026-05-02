'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportIssueModal({ isOpen, onClose }: ReportIssueModalProps) {
  const [issueText, setIssueText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send issueText to the backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIssueText('');
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          className="relative w-full max-w-md bg-[#111] border border-white/20 rounded-2xl overflow-hidden shadow-2xl p-6"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Report an Issue</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-lg font-bold text-white mb-2">Thank you!</h3>
              <p className="text-sm text-gray-400">Your report has been submitted to our support team.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">What went wrong?</label>
                <textarea
                  value={issueText}
                  onChange={(e) => setIssueText(e.target.value)}
                  placeholder="Please describe the issue..."
                  className="w-full h-32 bg-black/50 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF] resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-lg font-medium transition-colors"
              >
                Submit Report
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
