'use client';

import React, { useState } from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';

export const SupportHub: React.FC = () => {
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [issueText, setIssueText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;
    console.log('Issue reported:', issueText);
    setSubmitted(true);
    setTimeout(() => {
      setIsHubOpen(false);
      setSubmitted(false);
      setIssueText('');
    }, 2000);
  };

  return (
    <>
      {/* Floating Support Button */}
      <button
        onClick={() => setIsHubOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow-lg"
        aria-label="Support Hub"
      >
        <span>❓</span>
      </button>

      {/* Support Hub Modal */}
      <BottomSheet isOpen={isHubOpen} onClose={() => setIsHubOpen(false)} title="Support Hub">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-white font-bold">Report an Issue</h3>
            {submitted ? (
              <div className="p-4 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-lg text-center text-sm font-bold">
                Thank you! Your feedback has been received.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                  value={issueText}
                  onChange={(e) => setIssueText(e.target.value)}
                  placeholder="Describe the bug or issue you encountered..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[var(--color-accent)] outline-none min-h-[100px] resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-bold transition-colors"
                >
                  Submit Report
                </button>
              </form>
            )}
          </div>

          <div className="pt-4 border-t border-[var(--border-color)]">
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="text-sm text-[var(--color-text-secondary)] hover:text-white underline transition-colors"
            >
              View Privacy Policy & Terms
            </button>
          </div>
        </div>
      </BottomSheet>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  );
};
