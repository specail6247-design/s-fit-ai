import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportIssueModal({ isOpen, onClose }: ReportIssueModalProps) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIssue('');
        onClose();
      }, 2000);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🛠️</span> Report Issue
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white text-xl" aria-label="Close">&times;</button>
            </div>

            {submitted ? (
              <div className="py-8 text-center text-green-400 font-bold">
                Thank you! Your issue has been reported.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="issue-desc" className="block text-xs font-bold text-gray-400 uppercase mb-2">Issue Description</label>
                  <textarea
                    id="issue-desc"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Describe the bug or issue you encountered..."
                    aria-label="Issue Description"
                    className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white h-32 focus:outline-none focus:border-[#007AFF] resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={onClose} className="px-4 py-2 border border-white/20 text-gray-300 rounded-lg hover:bg-white/10 transition-colors text-sm font-bold">
                    Cancel
                  </button>
                  <button type="submit" aria-busy={isSubmitting} className="px-4 py-2 bg-[#007AFF] text-white rounded-lg hover:bg-[#005bb5] transition-colors text-sm font-bold disabled:opacity-50" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
