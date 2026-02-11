'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen } = useStore();
  const [formData, setFormData] = useState({
    type: 'bug',
    email: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after delay
    setTimeout(() => {
      setSupportHubOpen(false);
      setIsSuccess(false);
      setFormData({ type: 'bug', email: '', description: '' });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-end pointer-events-none"
        >
           {/* Backdrop */}
           <div
             className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
             onClick={() => setSupportHubOpen(false)}
           />

           {/* Slide-out Drawer */}
           <motion.div
             initial={{ x: '100%' }}
             animate={{ x: 0 }}
             exit={{ x: '100%' }}
             transition={{ type: 'spring', damping: 30, stiffness: 300 }}
             className="w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl relative pointer-events-auto flex flex-col"
             onClick={(e) => e.stopPropagation()}
           >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#111]">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
                  <p className="text-xs text-gray-400 mt-1">We&apos;re here to help.</p>
                </div>
                <button
                  onClick={() => setSupportHubOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {isSuccess ? (
                   <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                         <span className="material-symbols-outlined text-green-500 text-3xl">check_circle</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">Report Received!</h3>
                      <p className="text-gray-400 text-sm max-w-xs">Thank you for your feedback. Our team will look into it shortly.</p>
                   </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Issue Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase">Issue Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['bug', 'feature'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, type })}
                            className={`p-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                              formData.type === type
                                ? 'bg-[#007AFF]/20 border-[#007AFF] text-[#007AFF]'
                                : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30'
                            }`}
                          >
                            {type === 'bug' ? '🐛 Bug Report' : '💡 Feature Request'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Email (Optional) */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase">Contact Email (Optional)</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#007AFF] transition-colors"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-xs font-bold text-gray-400 uppercase">Description</label>
                      <textarea
                        id="description"
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Please describe the issue or idea..."
                        rows={6}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#007AFF] transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#007AFF] hover:bg-[#0062cc] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,122,255,0.2)] transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                           <span>🚀</span> Send Report
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-gray-500 text-center">
                      By submitting, you agree to our Terms of Service.
                    </p>
                  </form>
                )}
              </div>
           </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
