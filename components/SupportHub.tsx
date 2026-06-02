import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [issueText, setIssueText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (issueText.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setIssueText('');
      }, 2000);
    }
  };

  return (
    <>
      {/* Corner Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Support Hub"
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg z-40 transition-colors"
      >
        <span className="material-symbols-outlined text-white text-xl">help</span>
      </button>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-50 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white tracking-widest uppercase">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-bold text-[#007AFF] uppercase mb-4">Report Issue</h3>

                {submitted ? (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                    <span className="material-symbols-outlined text-green-500 mb-2 text-2xl">check_circle</span>
                    <p className="text-xs text-green-500 font-medium">Issue reported successfully. Thank you for your feedback!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="issue" className="block text-xs text-gray-400 mb-2">Describe the problem</label>
                      <textarea
                        id="issue"
                        value={issueText}
                        onChange={(e) => setIssueText(e.target.value)}
                        placeholder="What went wrong?"
                        className="w-full h-32 bg-black/40 border border-white/20 rounded-xl p-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#007AFF] resize-none transition-colors"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors border border-white/20"
                    >
                      Submit Report
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center text-[10px] text-gray-500 uppercase tracking-widest">
                S_FIT AI Support Team
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
