import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (issue.trim()) {
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
      {isOpen && (
        <motion.div
          key="support-hub-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="support-hub-content"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/50">
              <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                <span>🆘</span> Support Hub
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-4 py-8"
                >
                  <div className="text-4xl">✅</div>
                  <h3 className="text-lg font-bold text-white">Issue Reported</h3>
                  <p className="text-sm text-gray-400">Our team has been notified. Thank you for helping us improve.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="issue" className="block text-xs font-mono text-[#007AFF] mb-2 uppercase">
                      Describe the Issue
                    </label>
                    <textarea
                      id="issue"
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      placeholder="What went wrong? Include steps to reproduce if possible."
                      className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] transition-all min-h-[120px] resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-colors text-sm uppercase tracking-wider"
                  >
                    Submit Report
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
