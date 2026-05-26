'use client';

import React, { useState } from 'react';
import { BottomSheet } from './BottomSheet';

export const SupportHub: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'policy' | 'terms' | 'report'>('policy');
  const [reportIssueText, setReportIssueText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportIssueText.trim()) {
      setIsSubmitted(true);
      // Here you would typically send the report to a backend
      setTimeout(() => {
        setReportIssueText('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-[var(--color-surface)] border border-[var(--border-color)] text-[var(--color-text-primary)] p-3 rounded-full shadow-lg hover:bg-white/10 transition-colors flex items-center justify-center backdrop-blur-md"
        aria-label="Open Support Hub"
      >
        <span className="material-symbols-outlined">help_center</span>
      </button>

      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Support Hub">
        <div className="space-y-6 text-sm">
          {/* Data Safety Badge */}
          <div className="flex items-center gap-3 bg-[var(--color-accent)]/10 p-4 rounded-xl border border-[var(--color-accent)]/20">
            <span className="material-symbols-outlined text-[var(--color-accent)] text-2xl">shield_lock</span>
            <div>
              <p className="font-semibold text-[var(--color-accent)]">Data Safety Guarantee</p>
              <p className="text-[var(--color-text-secondary)] text-xs">Photos are processed securely and never shared.</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-[var(--border-color)] pb-2">
            <button
              onClick={() => setActiveTab('policy')}
              className={`pb-2 px-2 text-xs font-semibold uppercase tracking-wider transition-colors ${activeTab === 'policy' ? 'text-[var(--color-text-primary)] border-b-2 border-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
            >
              Privacy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`pb-2 px-2 text-xs font-semibold uppercase tracking-wider transition-colors ${activeTab === 'terms' ? 'text-[var(--color-text-primary)] border-b-2 border-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
            >
              Terms
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`pb-2 px-2 text-xs font-semibold uppercase tracking-wider transition-colors ${activeTab === 'report' ? 'text-[var(--color-text-primary)] border-b-2 border-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
            >
              Report Issue
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            {activeTab === 'policy' && (
              <div className="space-y-4 text-[var(--color-text-secondary)] leading-relaxed h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                <h4 className="text-[var(--color-text-primary)] font-semibold text-base mb-2">Privacy Policy</h4>
                <p>At S_FIT AI, your privacy is our priority. We collect only the data necessary to provide our virtual try-on services.</p>
                <p><strong>1. Information Collection:</strong> We collect uploaded photos and basic usage data to improve our models.</p>
                <p><strong>2. Photo Processing:</strong> Uploaded images are processed ephemerally for the fitting simulation and are securely deleted after processing. They are not stored permanently or shared with third parties.</p>
                <p><strong>3. Data Security:</strong> We employ industry-standard encryption to protect your data in transit and at rest.</p>
                <p><strong>4. User Rights:</strong> You have the right to request deletion of any associated account data at any time.</p>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-4 text-[var(--color-text-secondary)] leading-relaxed h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                <h4 className="text-[var(--color-text-primary)] font-semibold text-base mb-2">Terms of Service</h4>
                <p>Welcome to S_FIT AI. By using our service, you agree to these terms.</p>
                <p><strong>1. Usage Limits:</strong> Free users are allotted 5 try-ons per day. Premium users enjoy unlimited access subject to fair use.</p>
                <p><strong>2. User Content:</strong> You must own or have rights to the photos you upload. Do not upload inappropriate or explicit content.</p>
                <p><strong>3. Service Availability:</strong> While we strive for 99.9% uptime, the service is provided &quot;as is&quot; without warranties.</p>
                <p><strong>4. Liability:</strong> S_FIT AI is not responsible for style mismatches or sizing inaccuracies resulting from the virtual simulation.</p>
              </div>
            )}

            {activeTab === 'report' && (
              <div>
                <h4 className="text-[var(--color-text-primary)] font-semibold text-base mb-4">Report an Issue</h4>
                {isSubmitted ? (
                   <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl flex items-center gap-3">
                     <span className="material-symbols-outlined">check_circle</span>
                     <p>Thank you for your feedback! We will look into it.</p>
                   </div>
                ) : (
                  <form onSubmit={handleReportSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="issueText" className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">
                        Describe the bug or issue you encountered
                      </label>
                      <textarea
                        id="issueText"
                        value={reportIssueText}
                        onChange={(e) => setReportIssueText(e.target.value)}
                        className="w-full bg-[var(--color-background)] border border-[var(--border-color)] rounded-xl p-3 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                        rows={5}
                        placeholder="e.g., The garment image didn't load properly..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[var(--color-text-primary)] text-[var(--color-background)] font-bold py-3 rounded-xl hover:bg-white/90 transition-colors"
                    >
                      Submit Report
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </BottomSheet>
    </>
  );
};
