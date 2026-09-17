import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function ReportIssueModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!issue.trim()) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setIssue(''); onClose(); }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-[#111] border border-white/20 p-6 rounded-2xl max-w-md w-full z-10 text-white">
        <h2 className="text-xl font-bold mb-4">Report an Issue</h2>
        {submitted ? (
          <div className="text-green-400 font-bold text-center py-8">Issue reported successfully! Thank you.</div>
        ) : (
          <>
            <textarea value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Describe the bug or issue..." className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-sm h-32 focus:border-[#007AFF] outline-none resize-none mb-4" />
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-3 border border-white/20 rounded-xl hover:bg-white/10 font-bold text-xs uppercase tracking-wider">Cancel</button>
              <button onClick={handleSubmit} className="flex-1 py-3 bg-red-600 rounded-xl hover:bg-red-700 font-bold text-white text-xs uppercase tracking-wider">Submit</button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
