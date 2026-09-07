import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#111] border border-white/20 rounded-2xl p-6 w-full max-w-md relative"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Support Hub</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">✕</button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="text-4xl">✅</div>
                <h3 className="text-xl font-bold text-white">Issue Reported</h3>
                <p className="text-sm text-gray-400">Thank you for helping us improve S_FIT NEO.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#007AFF] mb-2">Report an Issue</label>
                  <textarea
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Describe the bug or issue you encountered..."
                    className="w-full h-32 bg-black/50 border border-white/20 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF] resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#007AFF] text-white font-bold rounded-xl shadow-[0_0_15px_rgba(0,122,255,0.3)] hover:bg-[#005bb5] transition-colors"
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
