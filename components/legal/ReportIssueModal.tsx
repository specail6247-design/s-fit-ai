import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportIssueModal({ isOpen, onClose }: ReportIssueModalProps) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the issue to your backend/support system
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#007AFF]">🐞</span> Report Issue
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="text-4xl">✅</div>
                  <p className="text-white font-medium">Issue Reported</p>
                  <p className="text-sm text-gray-400">Thank you for helping us improve S_FIT AI.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Describe the problem
                    </label>
                    <textarea
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[#007AFF] transition-colors resize-none h-32"
                      placeholder="What went wrong? Please be as detailed as possible..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
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
  );
}