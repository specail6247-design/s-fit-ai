'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'legal' | 'safety' | 'report'>('legal');
  const [reportIssue, setReportIssue] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportIssue.trim()) {
      // Simulate API call
      setTimeout(() => {
        setReportSubmitted(true);
        setReportIssue('');
        setTimeout(() => setReportSubmitted(false), 3000);
      }, 500);
    }
  };

  return (
    <>
      {/* Floating Action Button to toggle Support Hub */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#111] hover:bg-[#222] border border-white/20 text-white rounded-full p-4 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center group"
        aria-label="Open Support Hub"
      >
        <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">
          support_agent
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring' as const, damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[400px] max-w-[90vw] bg-[#0A0A0A] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#111]">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Trust & Growth</h2>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Support Hub</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('legal')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === 'legal' ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-[#007AFF]/5' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Legal
                </button>
                <button
                  onClick={() => setActiveTab('safety')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === 'safety' ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-[#007AFF]/5' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Safety
                </button>
                <button
                  onClick={() => setActiveTab('report')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === 'report' ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-[#007AFF]/5' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Report
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <AnimatePresence mode="wait">
                  {/* Legal Content */}
                  {activeTab === 'legal' && (
                    <motion.div
                      key="legal"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <section>
                        <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Privacy Policy</h3>
                        <div className="text-xs text-gray-400 leading-relaxed space-y-2 bg-[#111] p-4 rounded-xl border border-white/5">
                          <p>We respect your privacy. All uploaded photos are used strictly for virtual fitting generation.</p>
                          <p>Images are processed securely on our servers and are automatically deleted within 24 hours of session end.</p>
                          <p>We do not sell your personal data or facial features to third parties.</p>
                        </div>
                      </section>
                      <section>
                        <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Terms of Service</h3>
                        <div className="text-xs text-gray-400 leading-relaxed space-y-2 bg-[#111] p-4 rounded-xl border border-white/5">
                          <p>By using S_FIT AI, you agree to not upload explicit, copyrighted, or non-consensual content.</p>
                          <p>The generated fitting results are for personal visualization purposes and may not perfectly reflect physical reality.</p>
                        </div>
                      </section>
                    </motion.div>
                  )}

                  {/* Safety Content */}
                  {activeTab === 'safety' && (
                    <motion.div
                      key="safety"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center justify-center h-full text-center space-y-6 py-10"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-[#007AFF]/20 to-transparent rounded-full flex items-center justify-center border border-[#007AFF]/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[#007AFF]/10 animate-pulse" />
                        <span className="material-symbols-outlined text-4xl text-[#007AFF] relative z-10">
                          health_and_safety
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Data Safety Certified</h3>
                        <p className="text-sm text-gray-400 max-w-[250px] mx-auto leading-relaxed">
                          Photos are processed securely via encrypted channels and are <strong>never</strong> shared publicly or used to train external models without consent.
                        </p>
                      </div>

                      <div className="w-full bg-[#111] rounded-xl p-4 border border-white/5 mt-4 text-left">
                         <div className="flex items-center gap-3 mb-2">
                           <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                           <span className="text-xs text-gray-300">End-to-End Encryption</span>
                         </div>
                         <div className="flex items-center gap-3 mb-2">
                           <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                           <span className="text-xs text-gray-300">Auto-Deletion (24h)</span>
                         </div>
                         <div className="flex items-center gap-3">
                           <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                           <span className="text-xs text-gray-300">Zero Third-Party Sharing</span>
                         </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Report Content */}
                  {activeTab === 'report' && (
                    <motion.div
                      key="report"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="mb-6">
                        <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Report an Issue</h3>
                        <p className="text-xs text-gray-400">Encountered a bug, inappropriate content, or poor fitting result? Let us know to help us improve.</p>
                      </div>

                      {reportSubmitted ? (
                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 flex flex-col items-center text-center space-y-3">
                           <span className="material-symbols-outlined text-3xl text-green-400">task_alt</span>
                           <div>
                             <h4 className="text-sm font-bold text-green-400">Report Submitted</h4>
                             <p className="text-xs text-gray-400 mt-1">Thank you for helping us improve S_FIT AI.</p>
                           </div>
                        </div>
                      ) : (
                        <form onSubmit={handleReportSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Issue Type</label>
                            <select className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none transition-colors">
                              <option value="bug">Technical Bug</option>
                              <option value="quality">Poor Fitting Quality</option>
                              <option value="content">Inappropriate Content</option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                            <textarea
                              required
                              value={reportIssue}
                              onChange={(e) => setReportIssue(e.target.value)}
                              placeholder="Please describe the issue in detail..."
                              className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none transition-colors min-h-[120px] resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors text-sm uppercase tracking-widest"
                          >
                            Submit Report
                          </button>
                        </form>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-4 border-t border-white/5 text-center">
                 <p className="text-[10px] text-gray-600 font-mono">S_FIT AI v1.0.0 &copy; {new Date().getFullYear()}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
