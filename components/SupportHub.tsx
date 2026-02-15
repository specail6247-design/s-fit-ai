"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';

export default function SupportHub() {
  const { isSupportHubOpen, closeSupportHub } = useStore();
  const [formData, setFormData] = useState({
    issueType: 'bug',
    description: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [sessionId, setSessionId] = useState('');

  React.useEffect(() => {
    setSessionId(Math.random().toString(36).substring(7).toUpperCase());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset form after 2 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setFormData({ issueType: 'bug', description: '', email: '' });
        closeSupportHub();
      }, 2000);
    }, 1500);
  };

  if (!isSupportHubOpen) return null;

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSupportHub}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[101] w-full max-w-md bg-[#1a1a1a] shadow-2xl border-l border-white/10"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
                <button
                  onClick={closeSupportHub}
                  className="rounded-full p-1 text-gray-500 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-8 rounded-xl bg-[#007AFF]/10 p-4 border border-[#007AFF]/20">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#007AFF]">info</span>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">We&apos;re here to help</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Encountered a bug or have a suggestion? Let us know directly.
                        Our team reviews every report to improve S_FIT AI.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="issueType" className="text-xs font-bold uppercase text-gray-500">Issue Type</label>
                    <select
                      id="issueType"
                      value={formData.issueType}
                      onChange={(e) => setFormData({...formData, issueType: e.target.value})}
                      className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#007AFF] focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
                    >
                      <option value="bug">Report a Bug</option>
                      <option value="feature">Feature Request</option>
                      <option value="feedback">General Feedback</option>
                      <option value="account">Account Issue</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase text-gray-500">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="name@example.com"
                      className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#007AFF] focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-xs font-bold uppercase text-gray-500">Description</label>
                    <textarea
                      id="description"
                      required
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Please describe the issue in detail..."
                      className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#007AFF] focus:outline-none focus:ring-1 focus:ring-[#007AFF] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold transition-all ${
                      submitStatus === 'success'
                        ? 'bg-green-600 text-white'
                        : 'bg-[#007AFF] text-white hover:bg-[#005bb5] hover:scale-[1.02]'
                    } disabled:opacity-50 disabled:hover:scale-100`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                        Sending...
                      </span>
                    ) : submitStatus === 'success' ? (
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        Report Sent!
                      </span>
                    ) : (
                      <>
                        Submit Report
                        <span className="material-symbols-outlined text-lg">send</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 bg-[#141414] px-6 py-4 text-center">
                <p className="text-[10px] text-gray-600">
                  ID: {sessionId || '...'} • v1.0.0
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
