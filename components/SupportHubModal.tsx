import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHubModal({ isOpen, onClose }: SupportHubModalProps) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setIssue('');
      }, 2000);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#111] border border-white/20 p-6 rounded-2xl max-w-sm w-full text-white shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-[#007AFF]">Report Issue</h2>

            {submitted ? (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <span className="text-4xl mb-2">✅</span>
                <p className="text-green-400 font-bold">Issue Reported Successfully!</p>
                <p className="text-xs text-gray-400 mt-2">Our team will look into it.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Describe the problem</label>
                  <textarea
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#007AFF] resize-none h-32"
                    placeholder="E.g., The garment image didn't upload properly..."
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 border border-white/20 hover:bg-white/10 rounded-xl font-bold transition-colors text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#007AFF] hover:bg-blue-600 rounded-xl font-bold transition-colors text-xs"
                  >
                    Submit Report
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
