'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SupportHubModalProps {
  onClose: () => void;
}

export default function SupportHubModal({ onClose }: SupportHubModalProps) {
  const [issueText, setIssueText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    // In a real app, send to backend
    console.log("Issue reported:", issueText);

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-[#111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>💬</span> Support Hub
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
             <div className="py-8 text-center space-y-4">
                <div className="text-4xl">✅</div>
                <div className="text-white font-bold">Issue Reported</div>
                <div className="text-gray-400 text-sm">Thank you for your feedback! We&apos;ll look into this immediately.</div>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Report an Issue or Feedback
                </label>
                <textarea
                  value={issueText}
                  onChange={(e) => setIssueText(e.target.value)}
                  placeholder="Describe the bug you encountered or share your feedback..."
                  className="w-full h-32 bg-black/50 border border-white/20 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF] transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Submit Report
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
