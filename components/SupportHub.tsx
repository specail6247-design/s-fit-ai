'use client';

import React, { useState } from 'react';
import { BottomSheet } from './ui/BottomSheet';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportHub: React.FC<SupportHubProps> = ({ isOpen, onClose }) => {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (issue.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIssue('');
        onClose();
      }, 2000);
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Support Hub">
      <div className="space-y-6 text-sm text-gray-300">
        <section className="space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Legal & Compliance</h4>
          <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-xs">
            <h5 className="font-bold text-white mb-1">Privacy Policy & Terms</h5>
            <p className="mb-2">Your photos are processed securely for virtual try-on purposes only. We do not store or share your personal images without explicit consent. By using S_FIT AI, you agree to our Terms of Service.</p>
          </div>
        </section>

        <section className="space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Feedback Loop</h4>
          {submitted ? (
             <div className="bg-[#007AFF]/20 border border-[#007AFF] text-[#007AFF] rounded-xl p-4 text-center text-xs font-bold">
               Issue reported successfully. Thank you!
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Describe the issue you encountered..."
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF] transition-colors resize-none h-24 text-xs"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-white/10 hover:bg-[#007AFF] hover:border-[#007AFF] border border-white/20 text-white font-bold rounded-xl transition-all text-xs uppercase tracking-widest"
              >
                Report Issue
              </button>
            </form>
          )}
        </section>
      </div>
    </BottomSheet>
  );
};
