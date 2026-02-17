'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export const SupportHub = () => {
  const { isSupportHubOpen, toggleSupportHub, activeSupportTab, setActiveSupportTab, toggleLegalModal } = useStore();
  const [reportForm, setReportForm] = useState({ type: 'bug', description: '', email: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  if (!isSupportHubOpen) return null;

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      console.log('Report Submitted:', reportForm);
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      setReportForm({ type: 'bug', description: '', email: '' });
    }, 1000);
  };

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px]"
          onClick={() => toggleSupportHub(false)}
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md bg-[#0F0F0F] border-l border-white/10 shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-bold tracking-tight">Support Hub</h2>
            <button
              onClick={() => toggleSupportHub(false)}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex overflow-x-auto border-b border-white/10 no-scrollbar">
            {['guide', 'caution', 'qa', 'report'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSupportTab(tab)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeSupportTab === tab
                    ? 'text-[#007AFF] border-[#007AFF] bg-white/5'
                    : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'guide' && 'User Guide'}
                {tab === 'caution' && 'Caution'}
                {tab === 'qa' && 'Q&A'}
                {tab === 'report' && 'Report Issue'}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {activeSupportTab === 'guide' && (
              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h3 className="font-bold text-[#007AFF] mb-2">1. Upload Photos</h3>
                  <p className="text-sm text-gray-400">Upload a clear, full-body photo of yourself and a photo of the garment you want to try on.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h3 className="font-bold text-[#007AFF] mb-2">2. Processing</h3>
                  <p className="text-sm text-gray-400">Our AI analyzes your body shape and the garment structure to create a realistic fit.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h3 className="font-bold text-[#007AFF] mb-2">3. View Result</h3>
                  <p className="text-sm text-gray-400">See yourself in the new outfit! You can share the result or try another item.</p>
                </div>
              </div>
            )}

            {activeSupportTab === 'caution' && (
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h3 className="font-bold text-yellow-500 mb-1">Image Quality</h3>
                    <p className="text-sm text-gray-400">Blurry or dark photos may result in poor quality fittings. Ensure good lighting.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <span className="text-2xl">🚫</span>
                  <div>
                    <h3 className="font-bold text-red-500 mb-1">Prohibited Content</h3>
                    <p className="text-sm text-gray-400">Do not upload explicit, offensive, or copyrighted content you do not have rights to.</p>
                  </div>
                </div>
              </div>
            )}

            {activeSupportTab === 'qa' && (
              <div className="space-y-4">
                 <div className="border border-white/10 rounded-xl overflow-hidden">
                   <div className="p-4 bg-white/5 font-bold text-sm">How long does it take?</div>
                   <div className="p-4 text-sm text-gray-400 border-t border-white/10">Usually 10-30 seconds depending on server load.</div>
                 </div>
                 <div className="border border-white/10 rounded-xl overflow-hidden">
                   <div className="p-4 bg-white/5 font-bold text-sm">Is it free?</div>
                   <div className="p-4 text-sm text-gray-400 border-t border-white/10">Yes, basic try-ons are free. Premium features may be added later.</div>
                 </div>
              </div>
            )}

            {activeSupportTab === 'report' && (
              <div className="space-y-6">
                <p className="text-sm text-gray-400">Found a bug or have a suggestion? Let us know!</p>

                <form onSubmit={handleSubmitReport} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Issue Type</label>
                    <select
                      value={reportForm.type}
                      onChange={(e) => setReportForm({...reportForm, type: e.target.value})}
                      className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-sm focus:border-[#007AFF] outline-none transition-colors"
                    >
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Description</label>
                    <textarea
                      required
                      value={reportForm.description}
                      onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                      className="w-full h-32 bg-black/40 border border-white/20 rounded-lg p-3 text-sm focus:border-[#007AFF] outline-none transition-colors resize-none"
                      placeholder="Describe the issue..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Email (Optional)</label>
                    <input
                      type="email"
                      value={reportForm.email}
                      onChange={(e) => setReportForm({...reportForm, email: e.target.value})}
                      className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-sm focus:border-[#007AFF] outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting' || submitStatus === 'success'}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                      submitStatus === 'success'
                        ? 'bg-green-500 text-white'
                        : 'bg-[#007AFF] hover:bg-[#0062cc] text-white'
                    }`}
                  >
                    {submitStatus === 'submitting' ? 'Sending...' : submitStatus === 'success' ? 'Sent Successfully!' : 'Submit Report'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-white/5">
            <button
              onClick={() => {
                toggleSupportHub(false);
                toggleLegalModal(true);
              }}
              className="text-xs text-[#007AFF] hover:underline"
            >
              Privacy Policy & Terms of Service
            </button>
            <div className="mt-2 text-[10px] text-gray-600">
              v1.0.0 • S_FIT AI
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};
