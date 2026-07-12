import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [issue, setIssue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIssue('');
        onClose();
      }, 2000);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#111] border border-white/20 rounded-2xl p-6 md:p-8 max-w-md w-full relative shadow-2xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close modal"
            >
              ✕
            </button>

            <h2 className="text-2xl font-black italic tracking-tighter text-white mb-2">
              SUPPORT <span className="text-[#007AFF]">HUB</span>
            </h2>
            <p className="text-xs text-gray-400 mb-6">Found a bug? Let us know below.</p>

            {isSubmitted ? (
              <motion.div
                className="py-8 text-center space-y-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-4xl">✅</div>
                <h3 className="text-[#007AFF] font-bold">Issue Reported</h3>
                <p className="text-xs text-gray-400">Thank you for helping us improve S_FIT NEO.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="issue" className="text-xs font-bold text-[#007AFF] uppercase">Report Issue</label>
                  <textarea
                    id="issue"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Describe the issue you encountered..."
                    className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] transition-colors resize-none h-32"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={!issue.trim()}
                  className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:opacity-50 disabled:hover:bg-[#007AFF] text-white font-bold rounded-xl transition-colors text-sm"
                >
                  SUBMIT REPORT
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
