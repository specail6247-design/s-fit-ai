import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ReportIssueForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;

    // In a real app, send this to a backend/support system
    console.log('Issue reported:', issue);
    setSubmitted(true);

    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setIssue('');
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm border border-white/10 transition-colors z-40"
      >
        Report Issue
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="w-full max-w-md bg-[#1a1a1a] border border-white/20 rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-bold text-white">Report an Issue</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-4">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">✅</div>
                    <h4 className="font-bold text-white mb-2">Thank you!</h4>
                    <p className="text-sm text-gray-400">We&apos;ll look into it right away.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">
                        What went wrong?
                      </label>
                      <textarea
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        className="w-full h-32 bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] transition-colors resize-none"
                        placeholder="Describe the bug or issue you encountered..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!issue.trim()}
                      className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                    >
                      Submit Report
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
