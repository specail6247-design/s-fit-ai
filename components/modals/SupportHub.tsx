import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const isSupportOpen = useStore((state) => state.isSupportOpen);
  const setIsSupportOpen = useStore((state) => state.setIsSupportOpen);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [reportIssue, setReportIssue] = useState('');
  const [reportStatus, setReportStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  if (!isSupportOpen) return null;

  const faqs = [
    { q: "How do I get the best fit?", a: "Ensure your photo is well-lit, taken straight-on, and you are wearing form-fitting clothes. Avoid baggy layers." },
    { q: "Why did my generation fail?", a: "This usually happens if the AI cannot detect your pose or if the image resolution is too low. Try another clear photo." },
    { q: "Are my photos saved?", a: "No. Your photos are processed temporarily for the AI generation and are immediately deleted from our servers. We value your privacy." }
  ];

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportIssue.trim()) return;

    setReportStatus('submitting');
    // Mock API call
    setTimeout(() => {
      setReportStatus('success');
      setReportIssue('');
      setTimeout(() => setReportStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSupportOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">Support Hub</h2>
              <p className="text-xs text-gray-400 mt-1">Help, FAQs & Feedback</p>
            </div>
            <button
              onClick={() => setIsSupportOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

            {/* Data Safety Badge */}
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3">
              <span className="material-symbols-outlined text-green-400 mt-0.5" aria-hidden="true">shield_lock</span>
              <div>
                <h4 className="text-green-400 font-medium text-sm mb-1">Data Safety Guarantee</h4>
                <p className="text-xs text-green-400/80">Photos are processed securely and not shared. Transient data is deleted after generation.</p>
              </div>
            </div>

            {/* How to Fit Section */}
            <section>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#007AFF] text-sm" aria-hidden="true">lightbulb</span>
                How to get the perfect fit
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
                <div className="min-w-[200px] p-4 bg-white/5 rounded-xl border border-white/10 snap-center">
                  <div className="text-2xl mb-2">📸</div>
                  <h4 className="text-sm font-bold text-white mb-1">Good Lighting</h4>
                  <p className="text-xs text-gray-400">Ensure subject is well-lit and clearly visible.</p>
                </div>
                <div className="min-w-[200px] p-4 bg-white/5 rounded-xl border border-white/10 snap-center">
                  <div className="text-2xl mb-2">👕</div>
                  <h4 className="text-sm font-bold text-white mb-1">Form Fitting</h4>
                  <p className="text-xs text-gray-400">Wear tight clothes to help AI detect body shape.</p>
                </div>
                <div className="min-w-[200px] p-4 bg-white/5 rounded-xl border border-white/10 snap-center">
                  <div className="text-2xl mb-2">🧍</div>
                  <h4 className="text-sm font-bold text-white mb-1">Straight Pose</h4>
                  <p className="text-xs text-gray-400">Stand straight, arms slightly apart from body.</p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#007AFF] text-sm" aria-hidden="true">help</span>
                Frequently Asked Questions
              </h3>
              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-white/10 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-200">{faq.q}</span>
                      <span className="material-symbols-outlined text-gray-400 text-sm transition-transform duration-200" style={{ transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }} aria-hidden="true">
                        expand_more
                      </span>
                    </button>
                    <AnimatePresence>
                      {activeFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 text-xs text-gray-400 border-t border-white/5 mt-2">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

            {/* Report Issue Form */}
            <section>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-red-500 text-sm" aria-hidden="true">bug_report</span>
                Report an Issue
              </h3>
              <form onSubmit={handleReportSubmit} className="space-y-3">
                <textarea
                  value={reportIssue}
                  onChange={(e) => setReportIssue(e.target.value)}
                  placeholder="Describe the bug or issue you experienced..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF] transition-colors resize-none h-24"
                  required
                />
                <button
                  type="submit"
                  disabled={reportStatus === 'submitting' || !reportIssue.trim()}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {reportStatus === 'submitting' ? (
                    <span className="material-symbols-outlined animate-spin text-sm" aria-hidden="true">progress_activity</span>
                  ) : reportStatus === 'success' ? (
                    <>
                      <span className="material-symbols-outlined text-green-400 text-sm" aria-hidden="true">check_circle</span>
                      <span className="text-green-400">Submitted</span>
                    </>
                  ) : (
                    'Submit Report'
                  )}
                </button>
              </form>
            </section>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
