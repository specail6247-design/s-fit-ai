"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'privacy' | 'terms' | 'report'>('menu');
  const [reportIssue, setReportIssue] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportIssue.trim()) {
      setReportSubmitted(true);
      setTimeout(() => {
        setReportSubmitted(false);
        setReportIssue('');
        setActiveTab('menu');
      }, 2000);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white shadow-lg transition-all"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[101] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight">
                  {activeTab === 'menu' && 'Support & Policies'}
                  {activeTab === 'privacy' && 'Privacy Policy'}
                  {activeTab === 'terms' && 'Terms of Service'}
                  {activeTab === 'report' && 'Report Issue'}
                </h2>
                <div className="flex gap-4">
                  {activeTab !== 'menu' && (
                    <button
                      onClick={() => setActiveTab('menu')}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Back"
                    >
                      <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => setActiveTab('menu'), 300);
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 text-sm text-gray-300">
                {activeTab === 'menu' && (
                  <div className="space-y-4">
                    <button
                      onClick={() => setActiveTab('privacy')}
                      className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 transition-all flex items-center justify-between"
                    >
                      <span>Privacy Policy</span>
                      <span className="material-symbols-outlined text-gray-500">chevron_right</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('terms')}
                      className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 transition-all flex items-center justify-between"
                    >
                      <span>Terms of Service</span>
                      <span className="material-symbols-outlined text-gray-500">chevron_right</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('report')}
                      className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 transition-all flex items-center justify-between"
                    >
                      <span>Report Issue</span>
                      <span className="material-symbols-outlined text-gray-500">chevron_right</span>
                    </button>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-4 leading-relaxed">
                    <h3 className="text-white font-bold mb-2">Privacy Policy</h3>
                    <p>Your privacy is important to us. This policy explains how we collect, use, and protect your data.</p>
                    <p><strong>1. Data Collection:</strong> We collect uploaded photos temporarily to process the virtual try-on.</p>
                    <p><strong>2. Data Usage:</strong> Photos are not shared, sold, or used for training AI without explicit consent.</p>
                    <p><strong>3. Data Retention:</strong> Processing occurs securely and images are discarded after your session.</p>
                  </div>
                )}

                {activeTab === 'terms' && (
                  <div className="space-y-4 leading-relaxed">
                    <h3 className="text-white font-bold mb-2">Terms of Service</h3>
                    <p>Welcome to S_FIT AI. By using our service, you agree to these terms.</p>
                    <p><strong>1. Use of Service:</strong> The service is provided &quot;as is&quot; for personal, non-commercial use.</p>
                    <p><strong>2. User Content:</strong> You retain ownership of uploaded photos but grant us temporary license to process them.</p>
                    <p><strong>3. Restrictions:</strong> Do not upload offensive, illegal, or unauthorized content.</p>
                  </div>
                )}

                {activeTab === 'report' && (
                  <div>
                    {reportSubmitted ? (
                      <div className="text-center py-10 space-y-4">
                        <span className="material-symbols-outlined text-4xl text-green-400">check_circle</span>
                        <p className="text-white font-bold">Issue Reported</p>
                        <p className="text-gray-400">Thank you for your feedback.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleReportSubmit} className="space-y-4">
                        <p className="mb-4">Describe the issue you&apos;re facing. We appreciate your feedback to help us improve.</p>
                        <textarea
                          value={reportIssue}
                          onChange={(e) => setReportIssue(e.target.value)}
                          className="w-full h-32 bg-black/40 border border-white/20 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF] transition-colors"
                          placeholder="What went wrong?"
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
          </>
        )}
      </AnimatePresence>
    </>
  );
}
