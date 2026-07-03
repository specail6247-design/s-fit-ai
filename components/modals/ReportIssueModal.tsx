import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ReportIssueModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-md flex flex-col overflow-hidden shadow-2xl"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
            <h2 className="text-xl font-bold text-white">Report Issue</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
          </div>
          <div className="p-6">
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-lg font-bold text-white mb-2">Thank you!</h3>
                <p className="text-sm text-gray-400">Your feedback helps us improve.</p>
                <button onClick={onClose} className="mt-6 w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors">
                  Close
                </button>
              </div>
            ) : (
              <>
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="Describe the bug or issue you encountered..."
                  className="w-full h-32 bg-black/50 border border-white/20 rounded-xl p-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#007AFF]"
                />
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={!issue.trim()}
                  className="mt-4 w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:opacity-50 disabled:hover:bg-[#007AFF] text-white font-bold rounded-xl transition-colors"
                >
                  Submit Report
                </button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
