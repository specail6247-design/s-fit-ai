import React, { useState } from 'react';
import { BottomSheet } from './ui/BottomSheet';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ isOpen, onClose }) => {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;

    // Simulate API call
    console.log("Issue reported:", issue);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIssue('');
      onClose();
    }, 2000);
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Report an Issue">
      {submitted ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">✅</div>
          <h4 className="text-white font-bold mb-2">Thank you!</h4>
          <p className="text-gray-400 text-sm">Your feedback helps us improve S_FIT AI.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-sm text-gray-400">Describe the issue you are facing. This goes directly to our support team.</p>

          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="e.g., The app crashed when I uploaded my photo..."
            className="w-full h-32 p-3 bg-black/50 border border-white/20 rounded-xl text-sm text-white focus:border-[#007AFF] focus:outline-none resize-none"
          />

          <button
            type="submit"
            disabled={!issue.trim()}
            className="w-full py-3 bg-[#007AFF] disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-xl font-bold transition-colors"
          >
            Submit Report
          </button>
        </form>
      )}
    </BottomSheet>
  );
};
