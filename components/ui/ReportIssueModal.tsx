"use client";

import React, { useState } from 'react';
import { BottomSheet } from './BottomSheet';

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
            <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1">Issue Type</label>
            <select className="w-full bg-[var(--color-background)] border border-[var(--border-color)] rounded-lg p-3 text-sm text-[var(--color-text-primary)]">
              <option>Bug/Error</option>
              <option>Fitting Accuracy</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1">Description</label>
            <textarea required rows={4} className="w-full bg-[var(--color-background)] border border-[var(--border-color)] rounded-lg p-3 text-sm text-[var(--color-text-primary)]" placeholder="Describe the issue..."></textarea>
          </div>
          <button type="submit" className="w-full py-3 bg-[#007AFF] text-white font-bold rounded-xl">
            Submit Report
          </button>
        </form>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">✅</div>
          <h4 className="text-[var(--color-text-primary)] font-bold mb-2">Report Submitted</h4>
          <p className="text-sm text-[var(--color-text-secondary)]">Thank you for helping us improve S_FIT AI.</p>
        </div>
      )}
    </BottomSheet>
  );
};
