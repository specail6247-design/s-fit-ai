'use client';

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
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.3 },
  },
};

interface SupportHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHubModal({ isOpen, onClose }: SupportHubModalProps) {
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
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
        onClose();
      }, 2000);
    }, 1000);
  };

  // The button should be disabled if description is empty or if it's currently submitting.
  const isSubmitDisabled = !description.trim() || isSubmitting;

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
            className="relative w-full max-w-md bg-[#111] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
              <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Close Support Hub Modal"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="text-4xl">✅</div>
                  <h3 className="text-lg font-bold text-white">Issue Reported!</h3>
                  <p className="text-sm text-gray-400">Thank you for helping us improve S_FIT AI.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Issue Type</label>
                    <select
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none transition-colors"
                    >
                      <option value="bug">Report a Bug</option>
                      <option value="feedback">General Feedback</option>
                      <option value="fitting">Fitting Quality Issue</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please describe the issue in detail..."
                      className="w-full h-32 bg-black/40 border border-white/20 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`w-full py-3 rounded-lg font-bold transition-colors ${
                      isSubmitDisabled
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-[#007AFF] hover:bg-[#005bb5] text-white'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
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