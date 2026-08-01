import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHubModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [reportIssueOpen, setReportIssueOpen] = useState(false);
  const [issueText, setIssueText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Issue Reported:", issueText);
    setIssueText('');
    setReportIssueOpen(false);
    alert('Thank you for reporting the issue!');
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
            className="w-full max-w-md bg-[#111] border border-white/20 rounded-2xl p-6 text-white relative shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              aria-label="Close Support Hub"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-[#007AFF]">Support Hub</h2>

            {!reportIssueOpen ? (
              <div className="space-y-4">
                <button
                  onClick={() => setReportIssueOpen(true)}
                  className="w-full text-left p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors flex justify-between items-center group"
                >
                  <div>
                    <div className="font-bold">Report Issue</div>
                    <div className="text-xs text-white/50">Found a bug? Let us know.</div>
                  </div>
                  <span className="text-[#007AFF] group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Report an Issue</h3>
                  <button type="button" onClick={() => setReportIssueOpen(false)} className="text-xs text-white/50 hover:text-white">Back</button>
                </div>
                <textarea
                  value={issueText}
                  onChange={(e) => setIssueText(e.target.value)}
                  className="w-full h-32 bg-black/50 border border-white/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#007AFF] resize-none"
                  placeholder="Describe the issue you encountered..."
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors"
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
