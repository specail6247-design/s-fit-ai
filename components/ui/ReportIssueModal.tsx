import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportIssueModal({ isOpen, onClose }: ReportIssueModalProps) {
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setDescription('');
        setEmail('');
        onClose();
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

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
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md flex flex-col bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white tracking-tight">Report Issue</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
                  <div className="w-16 h-16 bg-[#007AFF]/20 rounded-full flex items-center justify-center text-3xl">
                    ✅
                  </div>
                  <h3 className="text-lg font-bold text-white">Thank You!</h3>
                  <p className="text-xs text-gray-400">Your report has been submitted successfully. We&apos;ll look into it right away.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="issue-description" className="text-xs font-bold text-gray-300 uppercase">Description (Required)</label>
                    <textarea
                      id="issue-description"
                      required
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="What went wrong? Please provide as much detail as possible..."
                      className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#007AFF] transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="issue-email" className="text-xs font-bold text-gray-300 uppercase">Email (Optional)</label>
                    <input
                      type="email"
                      id="issue-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="For follow-up questions"
                      className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#007AFF] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !description.trim()}
                    className="w-full py-3 mt-4 bg-[#007AFF] hover:bg-[#005bb5] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Submitting...</span>
                    ) : (
                      <>
                        <span>📤</span> Submit Report
                      </>
                    )}
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
