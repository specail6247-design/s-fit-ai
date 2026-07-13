import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } },
};

interface SupportHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHubModal({ isOpen, onClose }: SupportHubModalProps) {
  const [issueDescription, setIssueDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueDescription.trim()) return;

    // In a real app, this would be an API call to a support backend or logging service
    console.log('Issue reported:', issueDescription);
    alert('Thank you for reporting this issue. Our team will look into it.');
    setIssueDescription('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-2xl font-bold text-white tracking-tight">Support Hub</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors text-xl p-2"
                type="button"
              >
                ✕
              </button>
            </div>

            {/* Content Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="issue-description" className="block text-sm font-bold text-[#007AFF] uppercase">
                  Report an Issue
                </label>
                <p className="text-xs text-gray-400">
                  Please describe the bug or issue you encountered in detail so our team can fix it quickly.
                </p>
                <textarea
                  id="issue-description"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  className="w-full h-32 bg-black/40 border border-white/20 rounded-xl p-4 text-white text-sm focus:border-[#007AFF] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-colors resize-none"
                  placeholder="e.g., The 3D engine failed to load on my mobile device..."
                  required
                />
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!issueDescription.trim()}
                  className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors text-sm"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
