import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [type, setType] = useState('bug');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      console.log('Report submitted:', { type, description, email });
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={onClose}
          />
          <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
              <div className="p-6 border-b border-white/10 bg-[#1a1a1a] flex justify-between items-center">
                  <h3 className="text-white font-bold text-lg">Report Issue / Feedback</h3>
                  <button onClick={onClose} className="text-gray-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
              </div>

              <div className="p-6">
                  {submitted ? (
                      <div className="text-center py-10">
                          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                              <span className="material-symbols-outlined text-3xl">check</span>
                          </div>
                          <h4 className="text-white font-bold text-xl mb-2">Thank You!</h4>
                          <p className="text-gray-400 text-sm">Your feedback has been received. We&apos;ll look into it shortly.</p>
                          <button onClick={onClose} className="mt-6 text-[#007AFF] hover:underline text-sm font-bold">Close</button>
                      </div>
                  ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Issue Type</label>
                              <div className="flex gap-2">
                                  {['bug', 'feedback', 'other'].map((t) => (
                                      <button
                                          key={t}
                                          type="button"
                                          onClick={() => setType(t)}
                                          className={`flex-1 py-2 rounded-lg border text-sm font-bold uppercase ${
                                              type === t
                                              ? 'bg-[#007AFF] border-[#007AFF] text-white'
                                              : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30'
                                          }`}
                                      >
                                          {t}
                                      </button>
                                  ))}
                              </div>
                          </div>

                          <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</label>
                              <textarea
                                  required
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none min-h-[100px]"
                                  placeholder="Please describe the issue or your feedback..."
                              />
                          </div>

                          <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email (Optional)</label>
                              <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none"
                                  placeholder="If you'd like a follow-up"
                              />
                          </div>

                          <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-xl font-bold uppercase tracking-wider mt-4 disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                              {isSubmitting ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span className="material-symbols-outlined">send</span>}
                              Submit Report
                          </button>
                      </form>
                  )}
              </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
