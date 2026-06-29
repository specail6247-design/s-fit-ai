import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    // In a real app, send to backend/support ticket system
    console.log('Submitting issue:', { type: issueType, description });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDescription('');
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment key="support-modal-container">
          <motion.div
            key="support-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              key="support-content"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md flex flex-col overflow-hidden shadow-2xl relative"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
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
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-white font-bold text-lg mb-2">Issue Reported</h3>
                    <p className="text-gray-400 text-sm">Thank you for helping us improve M_FIT.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#007AFF] uppercase mb-2">Issue Type</label>
                      <select
                        value={issueType}
                        onChange={(e) => setIssueType(e.target.value)}
                        className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-all"
                      >
                        <option value="bug">Report a Bug / Error</option>
                        <option value="fit">Fit / Visual Fidelity Issue</option>
                        <option value="feature">Feature Request</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#007AFF] uppercase mb-2">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please describe what happened..."
                        rows={4}
                        className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-all resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!description.trim()}
                      className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors flex justify-center items-center gap-2"
                    >
                      Submit Report
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}