'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportIssueFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportIssueForm: React.FC<ReportIssueFormProps> = ({ isOpen, onClose }) => {
  const [issue, setIssue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment key="report-issue-modal">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#111] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🐛</span> Report an Issue
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">✕</button>
              </div>

              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8 space-y-3"
                  >
                    <div className="text-4xl">✅</div>
                    <h3 className="text-lg font-bold text-white">Thank You!</h3>
                    <p className="text-sm text-gray-400">Your feedback helps us improve S_FIT AI.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Describe the problem</label>
                      <textarea
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        placeholder="e.g., The garment alignment looks weird on the left shoulder..."
                        className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] transition-colors min-h-[120px] resize-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !issue.trim()}
                      className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                         <><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"/> Submitting...</>
                      ) : (
                        "Submit Report"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};
