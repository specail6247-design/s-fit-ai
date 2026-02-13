'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen } = useStore();
  const [formState, setFormState] = useState({ subject: '', email: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setSupportHubOpen(false);
    // Reset form after close animation
    setTimeout(() => {
        setSuccess(false);
        setFormState({ subject: '', email: '', description: '' });
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    console.log('Support Ticket Submitted:', formState);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
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
            onClick={handleClose}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[100] w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
              <div>
                <h2 className="text-xl font-bold font-mono text-white">SUPPORT HUB</h2>
                <p className="text-xs text-gray-400 mt-1">We are here to help</p>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {success ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-4"
                >
                    <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center text-green-500 text-3xl mb-2">
                        ✓
                    </div>
                    <h3 className="text-xl font-bold text-white">Ticket Received</h3>
                    <p className="text-gray-400 text-sm max-w-[250px]">
                        Our team will review your report and get back to you at {formState.email} shortly.
                    </p>
                    <button
                        onClick={handleClose}
                        className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Topic</label>
                        <select
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[#007AFF] outline-none transition-colors"
                            value={formState.subject}
                            onChange={e => setFormState({...formState, subject: e.target.value})}
                        >
                            <option value="" disabled>Select a topic...</option>
                            <option value="bug">Report a Bug</option>
                            <option value="feature">Feature Request</option>
                            <option value="billing">Billing Issue</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[#007AFF] outline-none transition-colors"
                            value={formState.email}
                            onChange={e => setFormState({...formState, email: e.target.value})}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                        <textarea
                            required
                            rows={5}
                            placeholder="Please describe the issue in detail..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[#007AFF] outline-none transition-colors resize-none"
                            value={formState.description}
                            onChange={e => setFormState({...formState, description: e.target.value})}
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                                isSubmitting ? 'bg-gray-700 cursor-not-allowed' : 'bg-[#007AFF] hover:bg-[#0062cc] shadow-lg shadow-blue-900/20'
                            }`}
                        >
                            {isSubmitting ? 'SENDING...' : 'SUBMIT TICKET'}
                        </button>
                    </div>
                </form>
              )}

              {/* FAQ Section (Optional) */}
              {!success && (
                <div className="mt-12 pt-8 border-t border-white/10">
                    <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase">Quick Help</h3>
                    <div className="space-y-4">
                        <details className="group bg-white/5 rounded-lg overflow-hidden">
                            <summary className="p-4 cursor-pointer font-medium text-sm text-gray-300 flex justify-between items-center group-hover:bg-white/10 transition-colors">
                                How do I get better results?
                                <span className="transform group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed">
                                Ensure your photo has good lighting and a simple background. The garment image should be a clear front view on a flat surface or mannequin.
                            </div>
                        </details>
                        <details className="group bg-white/5 rounded-lg overflow-hidden">
                            <summary className="p-4 cursor-pointer font-medium text-sm text-gray-300 flex justify-between items-center group-hover:bg-white/10 transition-colors">
                                Is my data safe?
                                <span className="transform group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed">
                                Yes. We process images securely on ephemeral servers and delete them immediately after generation. We do not store your personal photos.
                            </div>
                        </details>
                    </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
