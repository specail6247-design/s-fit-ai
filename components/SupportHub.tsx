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
    if (!issue.trim()) return;

    // Simulate sending report
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIssue('');
      onClose();
    }, 2000);
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Support Hub">
      {submitted ? (
        <div className="text-center py-8 text-green-400">
          <span className="text-4xl block mb-4">✓</span>
          <p>Thank you. Your issue has been reported.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Report Issue
            </label>
            <textarea
              className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-white placeholder-gray-500 focus:border-[#007AFF] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-colors"
              rows={4}
              placeholder="Describe the issue you're facing..."
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors disabled:opacity-50"
            disabled={!issue.trim()}
          >
            Submit Report
          </button>
        </form>
      )}
    </BottomSheet>
  );
};
