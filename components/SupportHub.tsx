import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [issue, setIssue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (issue.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIssue('');
        onClose();
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md p-6 bg-[#0a0a0a] border border-white/20 rounded-2xl shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Support Hub</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close">
                ✕
              </button>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✅</div>
                <p className="text-green-400 font-bold">Issue Reported</p>
                <p className="text-sm text-gray-400 mt-2">Thank you for your feedback.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="issue" className="block text-xs font-bold text-[#007AFF] uppercase mb-2">Report Issue</label>
                  <textarea
                    id="issue"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className="w-full p-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-[#007AFF] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-colors resize-none h-32"
                    placeholder="Describe the bug or issue you encountered..."
                    required
                  />
                </div>
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
