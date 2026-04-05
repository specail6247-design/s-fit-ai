import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportHubModal: React.FC<SupportHubModalProps> = ({ isOpen, onClose }) => {
  const [issueText, setIssueText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setIssueText('');

      // Auto close after success
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="support-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="support-modal-content"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md relative shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-2 text-white">Support Hub</h2>
            <p className="text-sm text-gray-400 mb-6">Found a bug or need help? Let us know.</p>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-center font-medium"
              >
                Thank you! Your issue has been reported.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="issue" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Report Issue
                  </label>
                  <textarea
                    id="issue"
                    value={issueText}
                    onChange={(e) => setIssueText(e.target.value)}
                    placeholder="Describe the problem you encountered..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] transition-colors resize-none h-32"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !issueText.trim()}
                  className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all"
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
