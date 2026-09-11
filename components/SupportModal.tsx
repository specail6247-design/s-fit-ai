import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setDescription('');
        onClose();
      }, 2000);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
                <span>🔧</span> Support Hub
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">✕</button>
            </div>

            {submitted ? (
              <div className="p-12 text-center text-green-400">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-lg font-bold">Issue Reported</h3>
                <p className="text-sm opacity-80 mt-2">Thank you for helping us improve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Issue Type</label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none"
                  >
                    <option value="bug">Report a Bug</option>
                    <option value="feedback">General Feedback</option>
                    <option value="fitting">Fitting Quality Issue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe the issue you encountered..."
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-bold text-sm uppercase tracking-widest mt-4"
                >
                  Submit Report
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
