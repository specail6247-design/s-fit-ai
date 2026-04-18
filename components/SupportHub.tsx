"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-[#050505] border border-[#C9B037] text-[#C9B037] px-4 py-2 rounded-full font-serif uppercase text-xs tracking-widest hover:bg-[#C9B037] hover:text-[#050505] transition-colors"
      >
        Support Hub
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#050505] border-l border-[#C9B037]/30 z-[70] p-8 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-[#C9B037] font-serif uppercase text-2xl tracking-widest">Client Services</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-[#C9B037] transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-white font-serif uppercase text-sm tracking-widest mb-2 border-b border-white/10 pb-2">Report Issue</h3>
                    <p className="text-white/50 text-xs mb-4">Help us maintain the masterpiece standard.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-[#C9B037] uppercase tracking-wider mb-2">Category</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-none p-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors">
                        <option value="bug">Technical Issue / Bug</option>
                        <option value="fitting">Fitting Inaccuracy</option>
                        <option value="account">Account & Billing</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#C9B037] uppercase tracking-wider mb-2">Description</label>
                      <textarea
                        required
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-none p-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors resize-none"
                        placeholder="Please describe the issue..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className="w-full bg-[#C9B037] text-[#050505] font-serif uppercase tracking-widest py-4 text-sm hover:bg-white transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : submitted ? 'Received' : 'Submit Report'}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
