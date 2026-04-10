import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

export function SupportHubModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [issueType, setIssueType] = useState('bug');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setMessage('');
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-md bg-[#111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 text-white p-8"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              ✕
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-black tracking-tighter italic text-white uppercase mb-1">Support Hub</h2>
              <p className="text-xs text-gray-400 uppercase tracking-widest">Report an Issue</p>
            </div>

            {isSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#007AFF]/20 flex items-center justify-center text-[#007AFF] text-3xl mb-2">
                  ✓
                </div>
                <h3 className="text-lg font-bold">Report Submitted</h3>
                <p className="text-sm text-gray-400">Our engineering team will review your feedback.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#007AFF] uppercase">Issue Type</label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#007AFF] transition-colors"
                  >
                    <option value="bug">Bug / Glitch</option>
                    <option value="quality">Poor Generation Quality</option>
                    <option value="ui">UI / Layout Issue</option>
                    <option value="other">Other Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#007AFF] uppercase">Description</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe the issue you encountered..."
                    className="w-full h-32 bg-black/40 border border-white/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#007AFF] transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="w-full py-4 mt-4 bg-[#007AFF] hover:bg-[#005bb5] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
