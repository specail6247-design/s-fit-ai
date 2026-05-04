import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    // In a real app, this would send to a backend/Discord webhook
    console.log(`Issue Reported [${issueType}]: ${description}`);

    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        setSubmitted(false);
        setDescription('');
      }, 300);
    }, 2000);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/10 hover:border-white/40 hover:scale-110 transition-all shadow-lg"
        title="Report Issue / Support"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </button>

      {/* Support Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !submitted && setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Support Hub</h2>
                {!submitted && (
                  <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">✕</button>
                )}
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                  <h3 className="text-white font-bold mb-2">Report Received</h3>
                  <p className="text-sm text-gray-400">Thank you for helping us improve S_FIT AI.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Issue Type</label>
                    <select
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#007AFF] transition-colors"
                    >
                      <option value="bug">🐛 Report a Bug</option>
                      <option value="fitting">👕 Fitting Accuracy Issue</option>
                      <option value="suggestion">💡 Suggestion / Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please describe what happened..."
                      className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white text-sm h-32 resize-none focus:outline-none focus:border-[#007AFF] transition-colors"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Submit Report
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
