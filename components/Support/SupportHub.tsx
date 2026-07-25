import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [reportIssue, setReportIssue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportIssue.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setReportIssue('');
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-charcoal/90 border border-white/10 p-6 rounded-2xl max-w-sm w-full shadow-2xl"
          initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-soft-gray hover:text-white transition-colors">✕</button>
          <h3 className="text-lg font-bold text-white mb-4">Support Hub</h3>

          {isSubmitted ? (
            <div className="text-center py-8">
              <span className="text-4xl block mb-2">✅</span>
              <p className="text-cyber-lime font-bold">Issue Reported</p>
              <p className="text-xs text-soft-gray mt-2">Thank you for helping us improve S_FIT AI.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-soft-gray uppercase tracking-widest block mb-2">Report Issue</label>
                <textarea
                  value={reportIssue}
                  onChange={(e) => setReportIssue(e.target.value)}
                  className="w-full h-24 bg-void-black/50 border border-white/10 rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:border-cyber-lime/50 transition-colors"
                  placeholder="Describe the bug or issue you encountered..."
                  required
                />
              </div>
              <button type="submit" className="w-full py-3 bg-cyber-lime text-black font-bold rounded-lg hover:bg-[#b3e600] transition-colors shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                Submit Report
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
