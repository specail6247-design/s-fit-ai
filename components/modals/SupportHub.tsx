import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [reportIssueData, setReportIssueData] = useState({ issueType: 'bug', description: '', email: '' });
  const [submitStatus, setSubmitStatus] = useState<null | 'submitting' | 'success' | 'error'>(null);

  const handleSubmitIssue = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setTimeout(() => {
      // Simulate API call
      setSubmitStatus('success');
      setReportIssueData({ issueType: 'bug', description: '', email: '' });
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="support-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="support-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0f0f0f] border-l border-white/10 z-50 p-6 overflow-y-auto text-white"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Support Hub</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                ✕
              </button>
            </div>

            <div className="space-y-8">
              {/* Visual Carousel Guide - Placeholder */}
              <section>
                <h3 className="text-sm font-bold text-[#007AFF] uppercase mb-4 tracking-wider">Quick Start Guide</h3>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-center h-32 text-gray-400 text-sm">
                  [Carousel Guide: Upload Selfie -&gt; Choose Clothes -&gt; Wait 10s]
                </div>
              </section>

              {/* Tips */}
              <section className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center text-center">
                  <span className="text-2xl mb-2">💡</span>
                  <span className="text-xs font-semibold text-gray-300">Good Lighting</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center text-center">
                  <span className="text-2xl mb-2">📸</span>
                  <span className="text-xs font-semibold text-gray-300">Clear Face</span>
                </div>
              </section>

              {/* FAQ Accordion - Placeholder */}
              <section>
                <h3 className="text-sm font-bold text-[#007AFF] uppercase mb-4 tracking-wider">FAQ</h3>
                <div className="space-y-2">
                  <div className="bg-white/5 p-3 rounded-lg text-sm text-gray-300 border border-white/10">
                    <p className="font-semibold text-white mb-1">Why is my result blurry?</p>
                    <p className="text-xs">Ensure your uploaded photo is high resolution and well-lit.</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg text-sm text-gray-300 border border-white/10">
                    <p className="font-semibold text-white mb-1">Can I use side profile photos?</p>
                    <p className="text-xs">Front-facing photos yield the best virtual fitting results.</p>
                  </div>
                </div>
              </section>

              {/* Report Issue Form */}
              <section>
                <h3 className="text-sm font-bold text-red-500 uppercase mb-4 tracking-wider">Report an Issue</h3>
                <form onSubmit={handleSubmitIssue} className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Issue Type</label>
                    <select
                      value={reportIssueData.issueType}
                      onChange={(e) => setReportIssueData({ ...reportIssueData, issueType: e.target.value })}
                      className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-sm text-white focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none"
                    >
                      <option value="bug">Bug / Glitch</option>
                      <option value="result">Bad Generation Result</option>
                      <option value="feedback">General Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={reportIssueData.description}
                      onChange={(e) => setReportIssueData({ ...reportIssueData, description: e.target.value })}
                      className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-sm text-white focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none resize-none"
                      placeholder="Please describe what went wrong..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      value={reportIssueData.email}
                      onChange={(e) => setReportIssueData({ ...reportIssueData, email: e.target.value })}
                      className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-sm text-white focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none"
                      placeholder="For follow-up"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting' || !reportIssueData.description.trim()}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitStatus === 'submitting' ? 'Submitting...' : submitStatus === 'success' ? 'Sent!' : 'Submit Report'}
                  </button>
                </form>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
