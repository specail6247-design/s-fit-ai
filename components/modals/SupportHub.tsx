import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportHub: React.FC<SupportHubProps> = ({ isOpen, onClose }) => {
  const [issue, setIssue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setIssue('');

      // Auto close after 2s
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Slide-out Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-[#111] border-l border-white/10 h-full flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0a0a0a]">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Support Hub
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1 scrollbar-hide space-y-8">

            {/* FAQ Section */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest">FAQ</h3>
              <div className="space-y-3">
                <details className="group border border-white/10 bg-white/5 rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-colors">
                  <summary className="font-bold text-white text-sm list-none flex justify-between items-center">
                    Why did my try-on fail?
                    <span className="transition group-open:rotate-180">↓</span>
                  </summary>
                  <p className="text-white/60 text-xs mt-3 leading-relaxed">
                    Ensure your photo is well-lit, front-facing, and full-body. Avoid complex backgrounds or baggy clothing in the original photo for best results.
                  </p>
                </details>
                <details className="group border border-white/10 bg-white/5 rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-colors">
                  <summary className="font-bold text-white text-sm list-none flex justify-between items-center">
                    Are my photos safe?
                    <span className="transition group-open:rotate-180">↓</span>
                  </summary>
                  <p className="text-white/60 text-xs mt-3 leading-relaxed">
                    Yes. We process photos securely and never share them with third parties. Images are deleted from our servers shortly after processing.
                  </p>
                </details>
              </div>
            </section>

            {/* Report Issue Form */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-[#ff453a] uppercase tracking-widest flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Report an Issue
              </h3>

              {submitSuccess ? (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm font-bold flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Thank you! We&apos;ve received your report.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Describe the bug or issue you encountered..."
                    className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#007AFF] resize-none transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !issue.trim()}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Submit Report'
                  )}
                </button>
              </form>
            )}
          </section>
        </div>
      </motion.div>
    </div>
  );
};
