import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ReportIssueModalProps {
  onClose: () => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ onClose }) => {
  const [issueText, setIssueText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    setIsSubmitting(true);
    // Simulate API call to support endpoint
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
        >
          ✕
        </button>

        <h2 className="text-2xl font-black italic tracking-tighter mb-2">
          REPORT AN ISSUE
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Help us improve S_FIT NEO. Describe the bug or feedback below.
        </p>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-center font-bold"
          >
            Thank you! Your report has been submitted.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                value={issueText}
                onChange={(e) => setIssueText(e.target.value)}
                placeholder="What went wrong? Please be as detailed as possible..."
                className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#007AFF] transition-colors min-h-[120px] resize-y"
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !issueText.trim()}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
