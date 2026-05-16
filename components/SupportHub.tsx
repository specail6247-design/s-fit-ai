"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'support' | 'privacy' | 'terms'>('support');
  const [issueText, setIssueText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIssueText('');
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-10 h-10 bg-black/50 backdrop-blur-md text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-full transition-all active:scale-95"
        aria-label="Support and Information"
      >
        <span className="material-symbols-outlined text-sm">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('support')}
                    className={`text-xs font-bold uppercase tracking-widest ${activeTab === 'support' ? 'text-[#007AFF]' : 'text-gray-500 hover:text-white'}`}
                  >
                    Report Issue
                  </button>
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`text-xs font-bold uppercase tracking-widest ${activeTab === 'privacy' ? 'text-[#007AFF]' : 'text-gray-500 hover:text-white'}`}
                  >
                    Privacy
                  </button>
                  <button
                    onClick={() => setActiveTab('terms')}
                    className={`text-xs font-bold uppercase tracking-widest ${activeTab === 'terms' ? 'text-[#007AFF]' : 'text-gray-500 hover:text-white'}`}
                  >
                    Terms
                  </button>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                  ✕
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300">
                {activeTab === 'support' && (
                  <div>
                    <h3 className="text-white font-bold mb-4">Report an Issue</h3>
                    {submitted ? (
                      <div className="text-center py-8 text-[#007AFF]">
                        <span className="text-4xl block mb-2">✓</span>
                        Thank you for your feedback!
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Describe the problem</label>
                          <textarea
                            value={issueText}
                            onChange={(e) => setIssueText(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] transition-colors"
                            rows={5}
                            placeholder="e.g., The 3D model didn't load properly..."
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors active:scale-95"
                        >
                          Submit Report
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-4 text-xs leading-relaxed">
                    <h3 className="text-white font-bold text-lg mb-2">Privacy Policy</h3>
                    <p>Last updated: Today</p>
                    <p><strong>1. Data Collection</strong><br/>We temporarily process uploaded photos solely for the purpose of generating virtual try-on results. We do not store your photos permanently.</p>
                    <p><strong>2. Data Security</strong><br/>All processing is done securely. Your images are not shared with third parties or used to train AI models without explicit consent.</p>
                    <p><strong>3. Analytics</strong><br/>We may collect anonymized usage data to improve the S_FIT AI experience.</p>
                  </div>
                )}

                {activeTab === 'terms' && (
                  <div className="space-y-4 text-xs leading-relaxed">
                    <h3 className="text-white font-bold text-lg mb-2">Terms of Service</h3>
                    <p>Last updated: Today</p>
                    <p><strong>1. Usage</strong><br/>S_FIT AI is provided &quot;as is&quot;. You agree to use the service only for lawful purposes and in accordance with these Terms.</p>
                    <p><strong>2. Intellectual Property</strong><br/>You retain rights to your uploaded photos. The generated try-on images are for your personal use.</p>
                    <p><strong>3. Limitations</strong><br/>We reserve the right to limit access to the service or modify features at any time.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
