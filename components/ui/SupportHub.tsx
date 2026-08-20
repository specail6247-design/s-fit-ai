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

    // Here we would typically send this to a backend/webhook
    console.log(`Issue Reported [${issueType}]:`, description);

    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        setSubmitted(false);
        setDescription('');
        setIssueType('bug');
      }, 500);
    }, 2000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black/50 hover:bg-[#007AFF] text-white p-3 rounded-full border border-white/20 backdrop-blur-md transition-all shadow-lg group flex items-center justify-center"
        aria-label="Support Hub"
      >
        <span className="text-xl">💬</span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out text-sm font-bold opacity-0 group-hover:opacity-100">
          Support / Report Issue
        </span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="flex justify-between items-center p-5 border-b border-white/10 bg-black/40">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>💬</span> Support Hub
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="text-4xl">✅</div>
                    <h3 className="text-white font-bold text-lg">Report Received</h3>
                    <p className="text-gray-400 text-sm">Thank you for your feedback. We&apos;ll look into this right away.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#007AFF] uppercase mb-2">Issue Type</label>
                      <select
                        value={issueType}
                        onChange={(e) => setIssueType(e.target.value)}
                        className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] focus:outline-none focus:ring-1 focus:ring-[#007AFF] appearance-none"
                      >
                        <option value="bug">🐛 Report a Bug</option>
                        <option value="fitting">👕 Fitting Quality Issue</option>
                        <option value="feature">✨ Feature Request</option>
                        <option value="other">📝 Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#007AFF] uppercase mb-2">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What happened? Please provide details..."
                        className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] focus:outline-none focus:ring-1 focus:ring-[#007AFF] min-h-[120px] resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!description.trim()}
                      className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:opacity-50 disabled:hover:bg-[#007AFF] text-white font-bold rounded-xl shadow-[0_0_15px_rgba(0,122,255,0.3)] transition-all flex items-center justify-center gap-2"
                    >
                      Submit Report
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
