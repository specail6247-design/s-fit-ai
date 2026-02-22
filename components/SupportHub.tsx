"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportOpen, setSupportOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'issue'>('issue');
  const [issueType, setIssueType] = useState('bug');
  const [issueDescription, setIssueDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIssueDescription('');
        setSupportOpen(false);
      }, 2000);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isSupportOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSupportOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#111]">
              <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
              <button
                onClick={() => setSupportOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('issue')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'issue'
                    ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-white/5'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                Report Issue
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'guide'
                    ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-white/5'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                Guide
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'issue' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Something wrong?</h3>
                    <p className="text-sm text-gray-400">
                      Let us know if you encountered a bug or have feedback.
                    </p>
                  </div>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl flex flex-col items-center text-center gap-4"
                    >
                      <div className="text-4xl">✅</div>
                      <div>
                        <h4 className="font-bold text-green-400">Report Submitted</h4>
                        <p className="text-sm text-gray-400 mt-1">Thank you for helping us improve S_FIT AI.</p>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Issue Type</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['bug', 'feedback', 'feature', 'other'].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setIssueType(type)}
                              className={`p-3 rounded-lg border text-sm font-medium capitalize transition-all ${
                                issueType === type
                                  ? 'bg-[#007AFF]/20 border-[#007AFF] text-[#007AFF]'
                                  : 'bg-black border-white/10 text-gray-400 hover:border-white/30'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                        <textarea
                          required
                          value={issueDescription}
                          onChange={(e) => setIssueDescription(e.target.value)}
                          placeholder="Please describe what happened..."
                          className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#007AFF] transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={!issueDescription.trim()}
                        className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all"
                      >
                        Submit Report
                      </button>
                    </form>
                  )}
                </div>
              )}

              {activeTab === 'guide' && (
                <div className="space-y-6 text-gray-300">
                  <h3 className="text-lg font-bold text-white">Quick Guide</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <h4 className="font-bold text-white mb-1">1. Upload Photos</h4>
                      <p className="text-sm text-gray-400">Use clear, well-lit photos. Front-facing shots work best for both user and garment.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <h4 className="font-bold text-white mb-1">2. AI Processing</h4>
                      <p className="text-sm text-gray-400">Our advanced AI analyzes body shape and fabric physics to generate a realistic fit.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <h4 className="font-bold text-white mb-1">3. Interaction</h4>
                      <p className="text-sm text-gray-400">Use the Luxury Mode for high-fidelity rendering or Easy Fit for quick checks.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
