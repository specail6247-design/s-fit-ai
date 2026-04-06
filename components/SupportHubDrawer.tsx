import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHubDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIssue('');
      onClose();
    }, 2000);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[400px] max-w-full bg-[#0a0a0a] border-l border-white/10 z-50 p-6 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold font-mono text-white">Support Hub</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-2xl leading-none">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
                <h3 className="text-[#007AFF] font-bold text-sm mb-2 uppercase tracking-wider">Report Issue</h3>
                <p className="text-xs text-gray-400 mb-4">Found a bug or have feedback? Let us know.</p>

                {submitted ? (
                  <div className="text-green-400 text-sm py-4 text-center border border-green-400/20 rounded-lg bg-green-400/10">
                    Thank you! Your issue has been reported.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      placeholder="Describe the issue you encountered..."
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#007AFF] min-h-[120px] resize-none"
                      required
                    />
                    <button type="submit" className="w-full py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-lg text-sm font-bold transition-colors">
                      Submit Report
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
