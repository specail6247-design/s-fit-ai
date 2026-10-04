import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <div className="p-6">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="text-green-500 text-5xl mb-4">✓</div>
                  <h3 className="text-white font-bold text-lg mb-2">Report Submitted</h3>
                  <p className="text-gray-400 text-sm">Thank you! Our team will look into this issue.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Issue Type</label>
                    <select
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-[#007AFF] focus:outline-none transition-colors"
                    >
                      <option value="bug">Bug / Glitch</option>
                      <option value="quality">Poor Fitting Quality</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      placeholder="Please describe the issue in detail..."
                      className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-[#007AFF] focus:outline-none transition-colors h-32 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !description.trim()}
                    className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
