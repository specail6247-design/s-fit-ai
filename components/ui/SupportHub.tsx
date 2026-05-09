"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'report'>('privacy');

  // Form state
  const [reportIssue, setReportIssue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportIssue.trim() === '') return;

    // 한국어 주석: 실제 구현에서는 API를 호출하여 버그 리포트를 전송합니다.
    console.log("Bug report submitted:", reportIssue);
    setIsSubmitted(true);
    setReportIssue('');
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-[#007AFF]/20 hover:bg-[#007AFF]/40 backdrop-blur-md text-white p-3 rounded-full shadow-lg transition-all"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined text-sm">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh] shadow-2xl relative">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white p-1"
                  aria-label="Close"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Data Safety Badge */}
              <div className="bg-[#007AFF]/10 p-3 flex items-center gap-3 border-b border-[#007AFF]/20">
                <span className="material-symbols-outlined text-[#007AFF]">lock</span>
                <p className="text-xs text-blue-200">
                  <strong className="text-white">Data Safety:</strong> Photos are processed securely and not shared.
                </p>
              </div>

              {/* Navigation */}
              <div className="flex gap-2 p-4 border-b border-white/5 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-colors ${
                    activeTab === 'privacy' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-colors ${
                    activeTab === 'terms' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => setActiveTab('report')}
                  className={`px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-colors ${
                    activeTab === 'report' ? 'bg-red-500/20 text-red-200 border border-red-500/30' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Report Issue
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 text-sm text-gray-300">
                {activeTab === 'privacy' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
                    <p>Last Updated: October 2023</p>
                    <p>
                      At S_FIT AI, your privacy is our priority. We temporarily process your photos to generate virtual try-on results.
                      <strong> We do not store, share, or sell your personal images.</strong>
                      All processing is done securely, and images are deleted immediately after the session.
                    </p>
                    <h4 className="text-white font-bold mt-4">1. Information We Collect</h4>
                    <p>We only collect the minimum data necessary to provide the service: user-uploaded photos and basic device analytics.</p>
                    <h4 className="text-white font-bold mt-4">2. How We Use Data</h4>
                    <p>Data is strictly used for rendering the 3D fitting simulation. We do not use your photos for training AI models without explicit consent.</p>
                  </div>
                )}

                {activeTab === 'terms' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Terms of Service</h3>
                    <p>By using S_FIT AI, you agree to these terms.</p>
                    <h4 className="text-white font-bold mt-4">1. Acceptable Use</h4>
                    <p>You agree not to upload inappropriate, copyrighted, or non-consensual content.</p>
                    <h4 className="text-white font-bold mt-4">2. Service Limitations</h4>
                    <p>The virtual try-on is a simulation. Actual fit may vary. We are not liable for purchasing decisions based solely on the simulation.</p>
                  </div>
                )}

                {activeTab === 'report' && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Report an Issue</h3>
                    {isSubmitted ? (
                      <div className="bg-green-500/20 border border-green-500/50 p-4 rounded-xl text-green-200 flex items-center gap-3">
                        <span className="material-symbols-outlined">check_circle</span>
                        <p>Thank you! Your report has been submitted.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleReportSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="issue" className="block text-xs text-gray-400 mb-2">Describe the bug or feedback:</label>
                          <textarea
                            id="issue"
                            value={reportIssue}
                            onChange={(e) => setReportIssue(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] resize-none h-32"
                            placeholder="e.g., The 3D render failed when I selected the Zara jacket..."
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
                        >
                          Submit Report
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
