import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIssue('');
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md bg-[#111] border border-white/20 rounded-2xl p-8 relative shadow-2xl"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white">✕</button>
            <h2 className="text-2xl font-bold text-white mb-2">Support Hub</h2>
            <p className="text-xs text-gray-400 mb-6">Report an issue or send feedback.</p>

            {submitted ? (
              <div className="text-center py-8 text-[#007AFF] font-bold">
                Thank you! Your feedback has been received.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#007AFF] uppercase block mb-2">Describe the issue</label>
                  <textarea
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className="w-full h-32 bg-black/40 border border-white/20 rounded-xl p-3 text-white text-sm focus:border-[#007AFF] outline-none resize-none transition-colors"
                    placeholder="Tell us what went wrong..."
                    required
                  />
                </div>
                <button type="submit" className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors">
                  Submit Report
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
