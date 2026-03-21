import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportFormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [issueDesc, setIssueDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueDesc.trim()) return;
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIssueDesc('');
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-lg bg-[#111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <h2 className="text-xl font-bold text-white tracking-wide">Report Issue</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors focus:outline-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8 text-green-400 font-medium">
                  Issue reported successfully. Thank you!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="issue" className="block text-sm font-medium text-gray-300 mb-2">
                      Describe the problem you encountered:
                    </label>
                    <textarea
                      id="issue"
                      rows={4}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] resize-none"
                      placeholder="e.g. Try-on failed with error X..."
                      value={issueDesc}
                      onChange={(e) => setIssueDesc(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !issueDesc.trim()}
                    className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Issue'}
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
