import React, { useState } from 'react';
import { BottomSheet } from './ui/BottomSheet';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Report an Issue">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">Issue Type</label>
            <select className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-white text-sm focus:border-[#007AFF] outline-none">
              <option>Visual Glitch in Try-On</option>
              <option>App Crash / Freeze</option>
              <option>Incorrect Size Recommendation</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">Description</label>
            <textarea
              required
              className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-white text-sm focus:border-[#007AFF] outline-none h-24"
              placeholder="Please describe the issue..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#007AFF] text-white font-bold rounded-xl hover:bg-[#005bb5] transition-colors"
          >
            Submit Report
          </button>
        </form>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">✅</div>
          <h4 className="text-lg font-bold text-white mb-2">Report Submitted</h4>
          <p className="text-sm text-gray-400">Thank you for helping us improve S_FIT AI.</p>
        </div>
      )}
    </BottomSheet>
  );
};
