import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function SupportHub() {
  const { isSupportOpen, setIsSupportOpen } = useStore();
  const [issue, setIssue] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  if (!isSupportOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;

    setStatus('submitting');
    // Mock submission process
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setIsSupportOpen(false);
        setStatus('idle');
        setIssue('');
      }, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSupportOpen(false)}
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-[#007AFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Support Hub
            </h2>
            <button
              onClick={() => setIsSupportOpen(false)}
              className="p-2 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-8 custom-scrollbar">

            {/* Feedback Loop: Report Issue Form */}
            <section className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Report an Issue</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Notice a bug or rendering issue? Let us know so we can fix it.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="Describe what happened..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/30 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-all resize-none h-32"
                  required
                />
                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'idle' && (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Report
                    </>
                  )}
                  {status === 'submitting' && 'Sending...'}
                  {status === 'success' && 'Report Sent!'}
                </button>
              </form>
            </section>

            {/* Data Safety Badge / Trust */}
            <section className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
              <div className="bg-[#007AFF]/20 p-2 rounded-lg shrink-0">
                <svg className="w-5 h-5 text-[#007AFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Data Safety</h4>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">
                  Photos are processed securely and not shared. We adhere to strict privacy guidelines to protect your personal data during virtual try-on.
                </p>
              </div>
            </section>

            {/* FAQ Area (Placeholder) */}
            <section className="space-y-4">
               <h3 className="text-white font-bold text-sm uppercase tracking-wider">Common Questions</h3>
               <div className="space-y-2">
                 {['How do I get better fit results?', 'What file formats are supported?', 'Can I try on patterns?'].map((q, i) => (
                   <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-lg text-sm text-white/80 cursor-pointer hover:bg-white/10 transition-colors flex justify-between items-center">
                     {q}
                     <span className="text-white/30">+</span>
                   </div>
                 ))}
               </div>
            </section>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
