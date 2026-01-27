import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
          setIsSuccess(false);
          setDescription('');
          onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-white/10 bg-black/40 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white tracking-wide">SUPPORT HUB</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <div className="p-8">
            {isSuccess ? (
                <div className="text-center py-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
                    >
                        ✓
                    </motion.div>
                    <h3 className="text-white font-bold text-lg mb-2">Report Submitted!</h3>
                    <p className="text-gray-400 text-sm">Thank you for helping us improve S_FIT NEO.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-[#007AFF] uppercase mb-2">Issue Type</label>
                        <select
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-white focus:border-[#007AFF] outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors"
                        >
                            <option value="bug">🐛 Report a Bug</option>
                            <option value="feature">✨ Feature Request</option>
                            <option value="billing">💳 Billing Issue</option>
                            <option value="other">📝 Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#007AFF] uppercase mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-white focus:border-[#007AFF] outline-none h-32 resize-none placeholder-gray-600"
                            placeholder="Please describe the issue in detail..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Submitting...</span>
                            </>
                        ) : (
                            'Submit Report'
                        )}
                    </button>
                </form>
            )}
        </div>
      </motion.div>
    </div>
  );
}
