'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
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

export const SupportHub: React.FC<SupportHubProps> = ({ isOpen, onClose }) => {
  const [issueType, setIssueType] = useState('bug');
  const [email, setEmail] = useState('');
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
        onClose();
        // Reset form
        setEmail('');
        setDescription('');
        setIssueType('bug');
      }, 2000);
    }, 1500);
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
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-[#0a0a0a] flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Support Hub</h3>
                <p className="text-xs text-gray-400 mt-1">We&apos;re here to help. Report issues or send feedback.</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-3xl">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-white">Report Received!</h4>
                  <p className="text-gray-400 text-sm">Thanks for helping us improve S_FIT NEO.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Issue Type</label>
                    <select
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none transition-colors"
                    >
                      <option value="bug">Report a Bug</option>
                      <option value="feature">Request Feature</option>
                      <option value="billing">Billing Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none transition-colors placeholder:text-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                    <textarea
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what happened..."
                      rows={4}
                      className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none transition-colors placeholder:text-gray-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Submit Report'
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
};
