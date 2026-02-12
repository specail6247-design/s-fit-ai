'use client';

// S_FIT AI - Support Hub
// Allows users to report issues or request features

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useStore } from '@/store/useStore';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    x: '100%',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.3,
    },
  },
};

export function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen } = useStore();
  const [formData, setFormData] = useState({
    subject: 'bug',
    email: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = () => {
    setSupportHubOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Support Ticket Submitted:', formData);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex justify-end"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div>
                <h2 className="text-xl font-bold font-mono tracking-wider text-pure-white">
                  SUPPORT HUB
                </h2>
                <p className="text-xs text-soft-gray mt-1">
                  We appreciate your feedback
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-3xl mb-2">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-pure-white">
                    Ticket Received
                  </h3>
                  <p className="text-soft-gray text-sm max-w-[250px]">
                    Thank you for helping us improve S_FIT AI. We&apos;ll review your report shortly.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 px-6 py-2 border border-white/20 rounded hover:bg-white/10 text-sm font-bold"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-gray uppercase">
                      Topic
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['bug', 'feature', 'other'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, subject: type })
                          }
                          className={`py-2 px-1 text-xs font-bold border rounded transition-colors uppercase ${
                            formData.subject === type
                              ? 'bg-luxury-gold text-void-black border-luxury-gold'
                              : 'bg-transparent text-soft-gray border-white/20 hover:border-white/40'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-gray uppercase">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded p-3 text-pure-white text-sm focus:border-luxury-gold focus:outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-gray uppercase">
                      Description
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded p-3 text-pure-white text-sm focus:border-luxury-gold focus:outline-none transition-colors resize-none"
                      placeholder="Describe the issue or idea in detail..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-luxury-gold hover:bg-yellow-500 text-void-black font-bold rounded flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Sending...</span>
                    ) : (
                      <>
                        <span>Submit Report</span>
                        <span>→</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-gray-600 mt-4">
                    By submitting, you agree to our Privacy Policy regarding data handling.
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
