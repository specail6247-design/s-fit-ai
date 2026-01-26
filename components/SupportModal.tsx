import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [issueType, setIssueType] = useState('bug');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Support Ticket Submitted:', { issueType, email, description });
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
          setIsSuccess(false);
          onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Support Hub</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        {isSuccess ? (
            <div className="py-10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 text-3xl">✓</div>
                <h3 className="text-lg font-bold text-white mb-2">Ticket Submitted!</h3>
                <p className="text-gray-400 text-sm">We'll get back to you shortly.</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Issue Type</label>
                    <select
                        value={issueType}
                        onChange={(e) => setIssueType(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none"
                    >
                        <option value="bug">Report a Bug</option>
                        <option value="account">Account Issue</option>
                        <option value="billing">Billing</option>
                        <option value="feature">Feature Request</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</label>
                    <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the issue..."
                        rows={4}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                           <span>Sending...</span>
                        </>
                    ) : (
                        'Submit Report'
                    )}
                </button>
            </form>
        )}
      </motion.div>
    </div>
  );
}
