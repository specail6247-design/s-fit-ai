import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

export function ReportIssueModal({ isOpen, onClose }: ReportIssueModalProps) {
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setDescription('');
        onClose();
      }, 2000);
    }, 1000);
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
            className="absolute inset-0 bg-void-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
                  <span>🛠️</span> Report Issue
                </h2>
                <p className="text-xs text-gray-400 mt-1">Help us improve the S_FIT AI experience.</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6">
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">✅</span>
                  <h3 className="text-lg font-bold text-white mb-2">Issue Reported</h3>
                  <p className="text-sm text-gray-400">Thank you for your feedback! Our team will look into it.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Issue Type
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIssueType('bug')}
                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors ${
                          issueType === 'bug'
                            ? 'border-red-500 bg-red-500/10 text-red-400'
                            : 'border-white/10 hover:bg-white/5 text-gray-400'
                        }`}
                      >
                        🐛 Bug
                      </button>
                      <button
                        type="button"
                        onClick={() => setIssueType('feedback')}
                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors ${
                          issueType === 'feedback'
                            ? 'border-cyber-lime bg-cyber-lime/10 text-cyber-lime'
                            : 'border-white/10 hover:bg-white/5 text-gray-400'
                        }`}
                      >
                        💡 Feedback
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please describe what happened or what could be improved..."
                      className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] transition-colors min-h-[120px] resize-y"
                      required
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors text-sm border border-white/10"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !description.trim()}
                      className="flex-1 py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors text-sm"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
