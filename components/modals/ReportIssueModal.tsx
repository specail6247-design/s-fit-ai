import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportIssueModal({ isOpen, onClose }: ReportIssueModalProps) {
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setDescription('');
        setIssueType('bug');
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/20 rounded-2xl overflow-hidden flex flex-col"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-2xl font-black italic tracking-tighter text-white">Report an Issue</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={isSubmitting}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            {submitted ? (
              <div className="p-12 text-center flex flex-col items-center space-y-4">
                <div className="text-4xl">✅</div>
                <h3 className="text-xl font-bold text-white">Thank you!</h3>
                <p className="text-sm text-gray-400">Your report has been submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="issueType" className="text-xs font-bold text-[#007AFF] uppercase">
                    Issue Type
                  </label>
                  <select
                    id="issueType"
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-white focus:border-[#007AFF] outline-none"
                  >
                    <option value="bug">🐛 Bug Report</option>
                    <option value="ui">🎨 UI/Visual Issue</option>
                    <option value="feedback">💡 General Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-xs font-bold text-[#007AFF] uppercase">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please describe the issue..."
                    rows={4}
                    required
                    className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-white focus:border-[#007AFF] outline-none resize-none"
                  />
                </div>

                {/* Footer */}
                <div className="pt-4 flex gap-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors border border-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !description.trim()}
                    className="flex-1 py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:bg-gray-700 disabled:text-gray-400 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,122,255,0.4)] disabled:shadow-none"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
