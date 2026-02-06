import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-black/90 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold font-mono tracking-wider text-white">SUPPORT HUB</h2>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Report Issues & Feedback</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            {success ? (
              <div className="py-12 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-3xl mb-4 border border-green-500/50"
                >
                  ✓
                </motion.div>
                <h3 className="text-white font-bold text-lg">Report Submitted!</h3>
                <p className="text-gray-400 text-xs mt-2">Thank you for helping us improve S_FIT NEO.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Issue Type</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] focus:outline-none transition-colors appearance-none">
                    <option>🐛 Bug Report</option>
                    <option>💡 Feature Request</option>
                    <option>💬 General Feedback</option>
                    <option>🛡️ Privacy Concern</option>
                  </select>
                </div>

                <div>
                   <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Email (Optional)</label>
                   <input
                     type="email"
                     placeholder="your@email.com"
                     className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] focus:outline-none transition-colors"
                   />
                </div>

                <div>
                   <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Description</label>
                   <textarea
                     rows={4}
                     required
                     placeholder="Please describe the issue or feedback..."
                     className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] focus:outline-none transition-colors resize-none"
                   />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all mt-2 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <span>📨</span> SUBMIT REPORT
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
