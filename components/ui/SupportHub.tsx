import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const backdropVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const drawerVariants: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
  exit: { x: '100%', transition: { type: 'spring', damping: 25, stiffness: 200 } },
};

export function SupportHub({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (issue.trim()) {
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
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="absolute inset-0 bg-[#0a0a0a]/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div className="relative w-full max-w-sm bg-[#050505] border-l border-white/10 h-full p-8 flex flex-col" variants={drawerVariants}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white">Support Hub</h2>
              <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
            </div>

            {submitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                <span className="text-4xl">✅</span>
                <h3 className="text-lg font-bold text-white">Report Submitted</h3>
                <p className="text-sm text-white/60">Thank you for helping us improve S_FIT AI.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#007AFF] uppercase mb-2 block">Report an Issue</label>
                    <textarea
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/30 focus:border-[#007AFF] focus:outline-none resize-none transition-colors"
                      placeholder="Describe the bug or issue you encountered..."
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-all">
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
