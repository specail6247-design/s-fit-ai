import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportHub: React.FC<SupportHubProps> = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Avoid calling setState synchronously within an effect
    const timer = setTimeout(() => setMounted(true), 0);
    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally we would send this to a backend/analytics service
    console.log("Issue Reported:", { type: issueType, description });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDescription('');
      onClose();
    }, 2000);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative bg-[#111] border border-white/20 rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl z-10"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white tracking-wide">Support Hub</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-lg font-bold text-white mb-2">Issue Reported</h3>
                  <p className="text-sm text-gray-400">Thank you for your feedback! Our team will look into it.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-gray-400 mb-4">Encountered a problem or have a suggestion? Let us know below.</p>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#007AFF] uppercase">Issue Type</label>
                    <select
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-colors"
                    >
                      <option value="bug">Report a Bug</option>
                      <option value="fitting">Fitting Result Issue</option>
                      <option value="suggestion">Suggestion / Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#007AFF] uppercase">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please describe the issue in detail..."
                      required
                      rows={4}
                      className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl shadow-[0_0_15px_rgba(0,122,255,0.3)] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>✉️</span> Submit Report
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
