import React, { useState } from 'react';
import { BottomSheet } from './BottomSheet';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ isOpen, onClose }) => {
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to a backend or logging service
    console.log(`Issue Reported: [${issueType}] ${description}`);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDescription('');
      onClose();
    }, 2000);
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={() => {
      if (!submitted) onClose();
    }} title="Report an Issue">
      <div className="pb-8">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-green-500">✓</span>
            </div>
            <h4 className="text-white font-bold text-lg mb-2">Thank you!</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">Your report has been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Issue Type</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-white text-sm focus:border-[var(--color-accent)] focus:outline-none"
              >
                <option value="bug">Bug / Glitch</option>
                <option value="fitting">Fitting Accuracy</option>
                <option value="performance">Performance / Slowness</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Description</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe the issue you encountered..."
                rows={4}
                className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-white text-sm focus:border-[var(--color-accent)] focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!description.trim()}
              className="w-full py-3 bg-[var(--color-primary)] text-black font-bold rounded-xl shadow-[var(--shadow-glow)] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Report
            </button>
          </form>
        )}
      </div>
    </BottomSheet>
  );
};
