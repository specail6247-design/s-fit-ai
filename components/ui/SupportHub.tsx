import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SupportHub: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (issue.trim()) {
      // Here you would normally send to a backend
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setIssue('');
      }, 2000);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black/50 backdrop-blur-md border border-white/20 hover:border-[#007AFF] text-white p-3 rounded-full shadow-lg transition-all"
        title="Support & Feedback"
      >
        <span className="text-xl">💬</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-20 right-6 z-50 w-80 bg-[var(--color-secondary)] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h3 className="font-mono text-sm font-bold text-white tracking-widest uppercase">Support Hub</h3>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">✕</button>
            </div>

            <div className="p-4">
              {submitted ? (
                <div className="text-center py-8 text-[#00FF00]">
                  <div className="text-3xl mb-2">✓</div>
                  <div className="text-sm font-bold">Issue Reported</div>
                  <div className="text-xs text-white/50 mt-1">Thank you for your feedback!</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-xs text-white/70">Found a bug or have a suggestion? Let us know!</p>
                  <textarea
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Describe the issue..."
                    className="w-full h-24 bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-[#007AFF] resize-none"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Submit Report
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
