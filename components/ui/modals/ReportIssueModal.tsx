import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 }
  },
};

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 2000);
    }, 1000);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-md bg-[var(--color-surface)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[var(--border-color)]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)] bg-[var(--color-secondary)]">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] font-[family-name:var(--font-display)] flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--color-accent)]">bug_report</span>
                Report an Issue
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-full hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto overscroll-contain">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Your issue has been reported. Our team will look into it immediately.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                      Issue Type
                    </label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[var(--color-accent)] outline-none transition-colors">
                      <option value="bug">Bug / Glitch</option>
                      <option value="fitting">Fitting Inaccuracy</option>
                      <option value="performance">Performance / Slowness</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                      Description
                    </label>
                    <textarea
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[var(--color-accent)] outline-none transition-colors min-h-[120px] resize-none"
                      placeholder="Please describe what happened..."
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[var(--color-primary)] text-[var(--color-secondary)] rounded-xl font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm">send</span>
                          Submit Report
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
