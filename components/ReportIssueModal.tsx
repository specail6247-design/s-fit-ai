import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ReportIssueModalProps {
  onClose: () => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ onClose }) => {
  const [issue, setIssue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);

    // Close after a brief delay
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-[#111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold tracking-tighter">Support Hub</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="text-4xl">✅</div>
              <h3 className="text-lg font-bold text-white">Report Submitted</h3>
              <p className="text-sm text-gray-400">Thank you for helping us improve S_FIT AI.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#007AFF] uppercase mb-2">
                  Describe the Issue
                </label>
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="What went wrong? (e.g., 'The generated image is blurry' or 'The app crashed when uploading.')"
                  className="w-full h-32 p-3 bg-black/40 border border-white/20 rounded-xl text-sm text-white placeholder-gray-500 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none resize-none transition-all"
                  required
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !issue.trim()}
                  className="px-6 py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Report Issue'}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
