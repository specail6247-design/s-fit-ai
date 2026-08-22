import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportIssueModal({ isOpen, onClose }: ReportIssueModalProps) {
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend or logging service
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setDescription('');
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div className="relative bg-gray-900 border border-gray-700 p-6 rounded-2xl max-w-md w-full" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>

          <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            <span>🚨</span> Report an Issue
          </h2>

          {isSubmitted ? (
            <div className="py-8 text-center text-green-400 flex flex-col items-center gap-2">
              <span className="text-4xl">✅</span>
              <p className="font-medium">Thanks for your feedback!</p>
              <p className="text-sm text-gray-400">Our team will look into it.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Issue Type</label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="bug">🐛 Bug / Glitch</option>
                  <option value="fit">👕 Fitting Result Issue</option>
                  <option value="performance">🐌 Slow Performance</option>
                  <option value="other">💬 Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe what happened..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white h-32 resize-none focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors">
                  Submit Report
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
