import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportHub: React.FC<SupportHubProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[400px] max-w-[90vw] bg-[#111] border-l border-white/10 z-[100] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white tracking-wider">SUPPORT HUB</h2>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 text-white/80">

              {/* Report Issue Form */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-wider">Report an Issue</h3>
                <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Issue reported! Thank you.'); }}>
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-sm text-white placeholder-white/40 focus:border-[#007AFF] focus:outline-none transition-colors"
                  />
                  <textarea
                    placeholder="Describe the issue..."
                    rows={4}
                    required
                    className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-sm text-white placeholder-white/40 focus:border-[#007AFF] focus:outline-none transition-colors resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#007AFF]/20 text-[#007AFF] border border-[#007AFF]/50 rounded-lg text-sm font-bold hover:bg-[#007AFF] hover:text-white transition-all"
                  >
                    SUBMIT REPORT
                  </button>
                </form>
              </div>


              {/* Legal & Compliance */}
              <div className="space-y-4 border-t border-white/10 pt-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Legal & Compliance</h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => alert('Privacy Policy Modal Opened (Mock)')}
                    className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/10 hover:border-white/30 transition-colors text-left"
                  >
                    <span className="text-sm text-gray-300">Privacy Policy</span>
                    <span className="text-gray-500">→</span>
                  </button>
                  <button
                    onClick={() => alert('Terms of Service Modal Opened (Mock)')}
                    className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/10 hover:border-white/30 transition-colors text-left"
                  >
                    <span className="text-sm text-gray-300">Terms of Service</span>
                    <span className="text-gray-500">→</span>
                  </button>
                </div>
              </div>

              {/* Content will go here */}


            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
