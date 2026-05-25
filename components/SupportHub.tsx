'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'privacy' | 'terms' | 'report'>('home');

  const [issueText, setIssueText] = useState('');
  const [issueSubmitted, setIssueSubmitted] = useState(false);

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (issueText.trim()) {
      // Mock submit
      setIssueSubmitted(true);
      setTimeout(() => {
        setIssueSubmitted(false);
        setIssueText('');
        setActiveTab('home');
      }, 2000);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-black text-white p-3 rounded-full shadow-lg border border-white/20 hover:bg-gray-900 transition-colors"
        aria-label="Support Hub"
      >
        <span className="text-xl px-1 font-bold">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed top-0 left-0 h-full w-full max-w-sm bg-black border-r border-white/10 z-50 shadow-2xl flex flex-col text-white"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gray-900">
              <h2 className="text-xl font-bold tracking-widest uppercase">Support Hub</h2>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-[#0a0a0a]">
              {activeTab === 'home' && (
                <div className="space-y-6">
                  {/* Data Safety Badge */}
                  <div className="bg-gray-900 p-4 rounded-xl border border-white/10 flex items-start gap-4">
                    <span className="text-[#007AFF] text-2xl">🛡️</span>
                    <div>
                      <h3 className="font-bold text-sm mb-1">Data Safety</h3>
                      <p className="text-xs text-gray-400">Photos are processed securely and not shared. We prioritize your privacy above all.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Legal & Compliance</h3>
                    <button
                      onClick={() => setActiveTab('privacy')}
                      className="w-full text-left p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800 border border-transparent hover:border-white/10 transition-all text-sm font-medium"
                    >
                      Privacy Policy
                    </button>
                    <button
                      onClick={() => setActiveTab('terms')}
                      className="w-full text-left p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800 border border-transparent hover:border-white/10 transition-all text-sm font-medium"
                    >
                      Terms of Service
                    </button>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Feedback</h3>
                    <button
                      onClick={() => setActiveTab('report')}
                      className="w-full text-left p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800 border border-transparent hover:border-[#007AFF]/30 transition-all text-sm font-medium flex items-center justify-between"
                    >
                      <span>Report Issue</span>
                      <span className="text-[#007AFF]">💬</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-4">
                  <button onClick={() => setActiveTab('home')} className="text-xs text-gray-500 hover:text-white mb-4">← Back</button>
                  <h3 className="font-bold text-lg mb-4">Privacy Policy</h3>
                  <div className="text-sm text-gray-400 space-y-4 leading-relaxed">
                    <p>At S_FIT AI, your privacy is our priority. We collect only the data necessary to provide our virtual try-on service.</p>
                    <p><strong>Photo Processing:</strong> Uploaded images are processed temporarily on our secure servers solely for generating the try-on result. They are not stored permanently or shared with third parties.</p>
                    <p><strong>Data Security:</strong> We implement industry-standard security measures to protect your personal information.</p>
                  </div>
                </div>
              )}

              {activeTab === 'terms' && (
                <div className="space-y-4">
                  <button onClick={() => setActiveTab('home')} className="text-xs text-gray-500 hover:text-white mb-4">← Back</button>
                  <h3 className="font-bold text-lg mb-4">Terms of Service</h3>
                  <div className="text-sm text-gray-400 space-y-4 leading-relaxed">
                    <p>By using S_FIT AI, you agree to these terms.</p>
                    <p><strong>Usage:</strong> The service is provided for personal, non-commercial use. You agree not to misuse the platform or upload inappropriate content.</p>
                    <p><strong>Intellectual Property:</strong> Generated images are yours to use, but the underlying technology and brand remain our property.</p>
                  </div>
                </div>
              )}

              {activeTab === 'report' && (
                <div className="space-y-4">
                  <button onClick={() => setActiveTab('home')} className="text-xs text-gray-500 hover:text-white mb-4">← Back</button>
                  <h3 className="font-bold text-lg mb-4">Report an Issue</h3>
                  <p className="text-sm text-gray-400 mb-4">Found a bug or have a suggestion? Let us know.</p>

                  {issueSubmitted ? (
                    <div className="p-4 bg-[#007AFF]/20 text-[#007AFF] rounded-xl border border-[#007AFF]/30 text-center font-bold">
                      Thanks for your feedback!
                    </div>
                  ) : (
                    <form onSubmit={handleIssueSubmit} className="space-y-4">
                      <textarea
                        value={issueText}
                        onChange={(e) => setIssueText(e.target.value)}
                        placeholder="Describe the issue in detail..."
                        className="w-full h-32 bg-gray-900 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#007AFF] transition-colors resize-none"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors"
                      >
                        Submit Report
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
