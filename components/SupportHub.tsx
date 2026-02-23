'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const drawerVariants = {
  hidden: { x: '100%', opacity: 0.5 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function SupportHub() {
  const { showSupportHub, setShowSupportHub, supportTab, setSupportTab } = useStore();
  const [reportText, setReportText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => setShowSupportHub(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setReportText('');
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  const tabs = [
    { id: 'guide', label: 'Guide', icon: '📖' },
    { id: 'caution', label: 'Caution', icon: '⚠️' },
    { id: 'qa', label: 'Q&A', icon: '❓' },
    { id: 'issue', label: 'Report', icon: '🐞' },
  ] as const;

  return (
    <AnimatePresence>
      {showSupportHub && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div>
                <h2 className="text-xl font-bold text-white">Support Hub</h2>
                <p className="text-xs text-gray-400">We&apos;re here to help</p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSupportTab(tab.id)}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                    supportTab === tab.id
                      ? 'border-[#007AFF] text-[#007AFF] bg-white/5'
                      : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <span className="block text-lg mb-1">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {supportTab === 'guide' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">How to use S_FIT NEO</h3>
                  <div className="space-y-4 text-sm text-gray-400">
                    <p>1. <strong className="text-white">Upload User Photo:</strong> Use a clear, front-facing photo with good lighting.</p>
                    <p>2. <strong className="text-white">Select Garment:</strong> Upload or choose a garment image you want to try on.</p>
                    <p>3. <strong className="text-white">Try On:</strong> Click the &quot;Try It On&quot; button and wait for the AI to process.</p>
                    <p>4. <strong className="text-white">Share:</strong> Use the share button to post your look to social media.</p>
                  </div>
                </div>
              )}

              {supportTab === 'caution' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-yellow-500">Important Usage Tips</h3>
                  <div className="space-y-4 text-sm text-gray-400">
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
                      <strong className="text-yellow-500 block mb-2">Photo Quality Matters</strong>
                      Blurry or dark photos will produce poor results. Ensure the subject is clearly visible.
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                      <strong className="text-red-500 block mb-2">Prohibited Content</strong>
                      Do not upload explicit, offensive, or illegal content. Your account may be banned.
                    </div>
                  </div>
                </div>
              )}

              {supportTab === 'qa' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <details className="bg-white/5 rounded-xl p-4 cursor-pointer group">
                      <summary className="text-sm font-bold text-white group-hover:text-[#007AFF] transition-colors">Is this service free?</summary>
                      <p className="mt-2 text-xs text-gray-400 leading-relaxed">Yes, you have 5 free tries per day. Upgrade to Premium for unlimited access.</p>
                    </details>
                    <details className="bg-white/5 rounded-xl p-4 cursor-pointer group">
                      <summary className="text-sm font-bold text-white group-hover:text-[#007AFF] transition-colors">How accurate is the sizing?</summary>
                      <p className="mt-2 text-xs text-gray-400 leading-relaxed">The AI simulates visual fit. For precise sizing, please refer to the brand&apos;s size chart.</p>
                    </details>
                    <details className="bg-white/5 rounded-xl p-4 cursor-pointer group">
                      <summary className="text-sm font-bold text-white group-hover:text-[#007AFF] transition-colors">Can I use side-profile photos?</summary>
                      <p className="mt-2 text-xs text-gray-400 leading-relaxed">Front-facing photos work best. Side profiles may result in distorted garment rendering.</p>
                    </details>
                  </div>
                </div>
              )}

              {supportTab === 'issue' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">Report an Issue</h3>
                  <p className="text-sm text-gray-400">Found a bug? Let us know so we can fix it.</p>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-500/20 border border-green-500/50 p-6 rounded-xl text-center"
                    >
                      <div className="text-4xl mb-2">✅</div>
                      <h4 className="text-green-500 font-bold">Report Sent!</h4>
                      <p className="text-xs text-gray-300 mt-1">Thank you for helping us improve.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmitReport} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Describe the issue</label>
                        <textarea
                          value={reportText}
                          onChange={(e) => setReportText(e.target.value)}
                          required
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-[#007AFF] outline-none min-h-[150px] resize-none"
                          placeholder="What happened? What were you doing when it occurred?"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending Report...' : 'Submit Report'}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5 text-center text-[10px] text-gray-600">
                S_FIT NEO Support System v2.0
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
