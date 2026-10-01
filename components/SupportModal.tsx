'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function SupportModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(issue.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIssue('');
        onClose();
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div className="relative bg-[#111] border border-white/10 rounded-2xl p-6 max-w-md w-full" initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
          <h2 className="text-xl font-bold mb-4 text-white">Support Hub (Report Issue)</h2>
          {submitted ? (
             <div className="text-center text-green-400 py-8">Issue reported! Thank you.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Describe the bug or issue..."
                className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-sm text-white h-32 focus:border-[#007AFF] focus:outline-none"
              />
              <button type="submit" className="w-full py-3 bg-[#007AFF] text-white rounded-xl font-bold hover:bg-[#005bb5] transition-colors">Submit Report</button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
