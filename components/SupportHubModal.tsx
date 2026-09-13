import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportHubModal: React.FC<SupportHubModalProps> = ({ isOpen, onClose }) => {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;

    // In a real app, this would send data to an API
    console.log('Issue reported:', issue);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-md m-4 overflow-hidden shadow-2xl text-white"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-red-900/20 to-transparent">
              <h2 className="text-xl font-bold font-sans flex items-center gap-2">
                <span>🛠️</span> Support Hub
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                ✕
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="text-4xl">✅</div>
                  <h3 className="text-xl font-bold">Issue Reported</h3>
                  <p className="text-gray-400 text-sm">Thank you for helping us improve S_FIT AI.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Report an Issue</label>
                    <textarea
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      placeholder="Describe what went wrong (e.g., 'The try-on result was distorted' or 'App crashed when uploading photo')"
                      className="w-full h-32 bg-black/50 border border-white/20 rounded-xl p-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#007AFF] resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
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
  );
};
