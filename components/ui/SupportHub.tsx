import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SupportHub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#007AFF] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors z-40"
      >
        <span className="text-xl">💬</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 bg-[#111] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 bg-black/50 flex justify-between items-center">
              <h3 className="font-bold text-white text-sm">Support Hub & Feedback</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
            </div>
            <div className="p-4">
              {isSubmitted ? (
                <div className="py-8 text-center text-green-400 flex flex-col items-center gap-2">
                  <span className="text-3xl">✅</span>
                  <p className="text-sm font-medium">Thank you for your feedback!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Issue Type</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-[#007AFF] outline-none">
                      <option>Bug Report</option>
                      <option>Feature Request</option>
                      <option>Fit Issue</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-[#007AFF] outline-none min-h-[100px] resize-none"
                      placeholder="Tell us what went wrong..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#007AFF] text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors"
                  >
                    Submit Report
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
