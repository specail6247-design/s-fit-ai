'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
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
          <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

          <motion.div className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl" variants={modalVariants}>
            <div className="p-6 border-b border-white/10 bg-[#151515] flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Support Hub</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Report Sent!</h3>
                  <p className="text-gray-400">Thank you for your feedback.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Issue Type</label>
                    <select
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#007AFF] outline-none"
                    >
                      <option value="bug">🐛 Bug Report</option>
                      <option value="feedback">💡 Feature Request</option>
                      <option value="other">❓ Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      placeholder="Describe the issue..."
                      className="w-full h-32 bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#007AFF] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Report'}
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
