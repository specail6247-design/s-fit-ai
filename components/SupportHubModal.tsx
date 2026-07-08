import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHubModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;
    // Mock submit
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-6 max-w-md w-full relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-2 font-sans text-white">Support Hub</h2>
            <p className="text-sm text-gray-400 mb-4">Report an issue or bug to help us improve.</p>

            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-center">
                Thank you! Your issue has been reported.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="Describe the issue you encountered..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF] resize-none h-32"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors"
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
