import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ReportIssueModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

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
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div className="relative bg-[#111] border border-white/20 p-6 rounded-2xl max-w-sm w-full text-white shadow-2xl" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
          <h2 className="text-xl font-bold mb-4">Report an Issue</h2>
          {submitted ? (
            <div className="text-center py-8 text-[#007AFF] font-bold">
              Thank you! Issue reported successfully.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Describe the problem</label>
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm focus:border-[#007AFF] outline-none min-h-[100px]"
                  placeholder="What went wrong?"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={onClose} className="flex-1 py-2 border border-white/20 rounded-xl text-sm font-bold text-gray-300 hover:bg-white/10 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-xl text-sm font-bold transition-colors">Submit</button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
