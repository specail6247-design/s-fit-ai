import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ isOpen, onClose }) => {
  const [issueText, setIssueText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIssueText('');
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-[#111] border border-white/20 rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🐛</span> Report an Issue
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
            </div>

            {submitted ? (
              <div className="py-8 text-center text-green-400">
                <div className="text-4xl mb-2">✅</div>
                <p>Thank you for your feedback!</p>
                <p className="text-xs text-gray-400 mt-2">Our team will look into this.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">What went wrong?</label>
                  <textarea
                    value={issueText}
                    onChange={(e) => setIssueText(e.target.value)}
                    placeholder="Describe the bug, weird fitting result, or other issue..."
                    className="w-full h-32 bg-black/50 border border-white/20 rounded-xl p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#007AFF] resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !issueText.trim()}
                  className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
