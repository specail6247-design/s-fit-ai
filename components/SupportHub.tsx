import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen } = useStore();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Report submitted:', { subject, description });
      setSubmitSuccess(true);
      setIsSubmitting(false);

      // Reset after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setSubject('');
        setDescription('');
        setSupportHubOpen(false);
      }, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSupportHubOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Support Hub</h2>
                <p className="text-xs text-gray-400 mt-1">We're here to help.</p>
              </div>
              <button
                onClick={() => setSupportHubOpen(false)}
                className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">

              {/* Report Issue Form */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-[#007AFF]">
                  <span className="text-xl">🛠️</span>
                  <h3 className="font-bold text-sm uppercase tracking-wider">Report an Issue</h3>
                </div>

                {submitSuccess ? (
                  <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
                    <span className="text-4xl block mb-2">✅</span>
                    <h4 className="text-green-500 font-bold">Report Sent!</h4>
                    <p className="text-xs text-gray-400 mt-2">Thank you for your feedback.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Subject</label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Image upload failed"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                      <textarea
                        required
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please describe what happened..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#007AFF] hover:bg-[#0066cc] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin text-lg">↻</span> Sending...
                        </>
                      ) : (
                        <>
                          <span>🚀</span> Submit Report
                        </>
                      )}
                    </button>
                  </form>
                )}
              </section>

              <div className="w-full h-px bg-white/10" />

              {/* Quick Links / FAQ */}
              <section className="space-y-4 opacity-50 pointer-events-none grayscale">
                <div className="flex items-center gap-2 text-white">
                  <span className="text-xl">📚</span>
                  <h3 className="font-bold text-sm uppercase tracking-wider">Help Center</h3>
                </div>
                <div className="space-y-2">
                   <div className="p-3 border border-white/10 rounded-lg text-sm text-gray-300">
                     How to get the best fit?
                   </div>
                   <div className="p-3 border border-white/10 rounded-lg text-sm text-gray-300">
                     Supported garment types
                   </div>
                </div>
                <p className="text-xs text-center text-gray-500 mt-2 italic">Coming Soon</p>
              </section>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
