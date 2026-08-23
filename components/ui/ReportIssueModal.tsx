import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportIssueModal({ isOpen, onClose }: ReportIssueModalProps) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (issue.trim()) {
      // Here you would typically send this to your backend
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIssue('');
        onClose();
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-void-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div className="relative glass-card p-6 max-w-sm w-full" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-pure-white">Report an Issue 🐛</h3>
            <button onClick={onClose} className="text-soft-gray hover:text-white">✕</button>
          </div>

          {submitted ? (
            <div className="py-8 text-center text-cyber-lime font-bold">
              Thanks for your feedback! We&apos;ll look into it.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white placeholder:text-soft-gray focus:border-cyber-lime focus:outline-none mb-4 resize-none h-32"
                placeholder="Describe the bug or issue you encountered..."
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
              />
              <button type="submit" className="w-full py-2 bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 rounded-lg text-sm font-bold transition-colors">
                Submit Report
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
