'use client';

// S_FIT AI - Support Hub
// Slide-out drawer for user support, feedback, and issue reporting

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    x: '100%',
    transition: {
      ease: 'easeInOut'
    }
  }
} as const;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function SupportHub() {
  const { showSupportHub, setShowSupportHub } = useStore();
  const [reportState, setReportState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    email: ''
  });

  const handleClose = () => {
    setShowSupportHub(false);
    // Reset form after a delay so it's clean next time
    setTimeout(() => {
      setReportState('idle');
      setFormData({ subject: '', description: '', email: '' });
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportState('submitting');

    // Simulate API call
    setTimeout(() => {
      console.log('Report Submitted:', formData);
      setReportState('success');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {showSupportHub && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-void-black/50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#007AFF]">help</span>
                Support Hub
              </h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">

              {/* Quick Actions */}
              <div className="space-y-4">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Quick Help</h3>
                 <div className="grid grid-cols-2 gap-3">
                   <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left border border-white/5 hover:border-white/20 transition-all group">
                     <span className="material-symbols-outlined text-[#007AFF] mb-2 group-hover:scale-110 transition-transform">school</span>
                     <div className="text-sm font-bold text-white">How to Fit</div>
                     <div className="text-[10px] text-gray-400">Step-by-step guide</div>
                   </button>
                   <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left border border-white/5 hover:border-white/20 transition-all group">
                     <span className="material-symbols-outlined text-green-500 mb-2 group-hover:scale-110 transition-transform">verified_user</span>
                     <div className="text-sm font-bold text-white">FAQ</div>
                     <div className="text-[10px] text-gray-400">Common questions</div>
                   </button>
                 </div>
              </div>

              {/* Report Issue Form */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Report an Issue</h3>

                {reportState === 'success' ? (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center animate-fade-in-up">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400 text-3xl">
                      <span className="material-symbols-outlined">check</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Report Sent!</h4>
                    <p className="text-sm text-gray-400">Thanks for helping us improve S_FIT AI. We&apos;ll look into this right away.</p>
                    <button
                      onClick={() => setReportState('idle')}
                      className="mt-6 text-sm text-[#007AFF] hover:text-white underline"
                    >
                      Send another report
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Issue Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] focus:outline-none transition-colors"
                        placeholder="e.g. Try-on failed..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] focus:outline-none transition-colors"
                        placeholder="Describe what happened..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Your Email (Optional)</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] focus:outline-none transition-colors"
                        placeholder="For updates on this issue"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={reportState === 'submitting'}
                      className="w-full py-3 bg-[#007AFF] hover:bg-[#0066cc] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                    >
                      {reportState === 'submitting' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Report</span>
                          <span className="material-symbols-outlined text-sm">send</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Version Info */}
              <div className="pt-8 border-t border-white/5 text-center">
                 <p className="text-[10px] text-gray-600 font-mono">S_FIT AI v1.0.0-beta</p>
                 <p className="text-[10px] text-gray-600 font-mono">Build: 2024.05.21</p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
