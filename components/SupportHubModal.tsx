import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHubModal({ isOpen, onClose }: SupportHubModalProps) {
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setDescription('');
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h2 className="text-xl font-bold text-white">Support Hub</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close">
                ✕
              </button>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-center py-10"
              >
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-white font-bold mb-2">Report Submitted</h3>
                <p className="text-sm text-gray-400">Thanks for helping us improve S_FIT.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Issue Type</label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] focus:outline-none transition-colors appearance-none"
                    aria-label="Select issue type"
                  >
                    <option value="bug">🐛 Report a Bug</option>
                    <option value="quality">🖼️ Image Quality Issue</option>
                    <option value="feature">✨ Feature Request</option>
                    <option value="other">📝 Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What went wrong?"
                    required
                    rows={4}
                    className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] focus:outline-none transition-colors resize-none"
                    aria-label="Issue description"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !description.trim()}
                  className="w-full py-3 bg-[#007AFF] text-white rounded-lg font-bold hover:bg-[#005bb5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Submit Report"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
