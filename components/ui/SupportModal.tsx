'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    type: 'bug',
    email: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset after success message
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ type: 'bug', email: '', description: '' });
        onClose();
      }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          {isSuccess ? (
            <div className="p-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-3xl mb-4 animate-bounce">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Report Submitted!</h3>
              <p className="text-gray-400">Thank you for your feedback. Our team will review it shortly.</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                <div>
                  <h2 className="text-xl font-bold text-white">Support Hub</h2>
                  <p className="text-xs text-gray-400 mt-1">Found a bug? Let us know.</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                  ✕
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Issue Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['bug', 'feedback', 'feature'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, type })}
                        className={`py-2 px-3 rounded-lg text-sm font-medium capitalize border transition-all ${
                          formData.type === type
                            ? 'bg-[#007AFF]/20 border-[#007AFF] text-[#007AFF]'
                            : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Description</label>
                  <textarea
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] focus:outline-none transition-colors min-h-[100px]"
                    placeholder="Describe what happened..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.description}
                    className="w-full py-3 bg-[#007AFF] hover:bg-[#0060c9] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>🚀</span>
                        <span>Submit Report</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
