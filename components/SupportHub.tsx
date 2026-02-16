import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Report submitted:', { subject, description, email });
      setIsSubmitting(false);
      setSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setSuccess(false);
        setSubject('');
        setDescription('');
        setEmail('');
        onClose();
      }, 2000);
    }, 1500);
  };

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  SUPPORT HUB
                </h2>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                  Report Bugs & Feedback
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 text-3xl mb-2">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-white">Report Sent!</h3>
                  <p className="text-gray-400 text-sm max-w-[250px]">
                    Thank you for your feedback. Our engineering team has been notified.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-bold text-[#007AFF] uppercase">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g., Upload failed, Glitch in 3D view"
                      className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-white placeholder-gray-600 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-xs font-bold text-[#007AFF] uppercase">Description</label>
                    <textarea
                      id="description"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please describe the issue in detail..."
                      rows={5}
                      className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-white placeholder-gray-600 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-[#007AFF] uppercase">Email (Optional)</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="For follow-up questions"
                      className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-white placeholder-gray-600 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-all"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] ${
                        isSubmitting
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-[#007AFF] hover:bg-[#0066cc] text-white shadow-[0_0_20px_rgba(0,122,255,0.3)]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          SENDING...
                        </>
                      ) : (
                        <>
                          <span>🚀</span> SUBMIT REPORT
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-white/5 text-center text-[10px] text-gray-500 font-mono">
              S_FIT AI SUPPORT SYSTEM v1.0
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
