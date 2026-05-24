'use client';

import React, { useState } from 'react';
import { BottomSheet } from './BottomSheet';

export const SupportHub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'hub' | 'privacy' | 'terms' | 'report'>('hub');

  const openSheet = () => {
    setActiveTab('hub');
    setIsOpen(true);
  };

  const closeSheet = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={openSheet}
        className="fixed bottom-6 right-6 z-[900] w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--border-color)] shadow-[var(--shadow-premium)] flex items-center justify-center text-[var(--color-text-primary)] hover:scale-105 transition-transform"
        aria-label="Support Hub"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
      </button>

      <BottomSheet isOpen={isOpen} onClose={closeSheet} title={
        activeTab === 'hub' ? "Trust & Growth" :
        activeTab === 'privacy' ? "Privacy Policy" :
        activeTab === 'terms' ? "Terms of Service" : "Report Issue"
      }>

        {activeTab === 'hub' && (
          <div className="space-y-6">
            <div className="bg-[var(--color-secondary)] border border-[var(--border-color)] rounded-xl p-4 flex items-center gap-4">
              <div className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--color-text-primary)] text-sm">Data Safety</h4>
                <p className="text-[var(--color-text-secondary)] text-xs mt-1">Photos are processed securely and not shared.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setActiveTab('privacy')} className="p-4 border border-[var(--border-color)] rounded-xl text-left hover:bg-[var(--color-secondary)] transition-colors">
                <h5 className="font-semibold text-sm mb-1">Privacy Policy</h5>
                <p className="text-xs text-[var(--color-text-secondary)]">How we protect you</p>
              </button>
              <button onClick={() => setActiveTab('terms')} className="p-4 border border-[var(--border-color)] rounded-xl text-left hover:bg-[var(--color-secondary)] transition-colors">
                <h5 className="font-semibold text-sm mb-1">Terms of Service</h5>
                <p className="text-xs text-[var(--color-text-secondary)]">Rules of engagement</p>
              </button>
            </div>

            <button onClick={() => setActiveTab('report')} className="w-full p-4 border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/5 rounded-xl text-left hover:bg-[var(--color-danger)]/10 transition-colors flex items-center justify-between">
              <div>
                <h5 className="font-semibold text-sm text-[var(--color-danger)] mb-1">Report Issue</h5>
                <p className="text-xs text-[var(--color-text-secondary)]">Help us improve</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-danger)]"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <button onClick={() => setActiveTab('hub')} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-4 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Back
            </button>
            <div className="prose prose-invert prose-sm">
              <p>Your privacy is our top priority. All uploaded photos are processed securely to generate your virtual try-on experience.</p>
              <p>We do not store, sell, or share your personal photos with third parties. Processing happens in real-time, and data is deleted immediately after the session ends.</p>
            </div>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <button onClick={() => setActiveTab('hub')} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-4 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Back
            </button>
            <div className="prose prose-invert prose-sm">
              <p>By using S_FIT AI, you agree to our terms of service.</p>
              <p>You may only upload photos you have the right to use. Do not upload inappropriate or offensive content.</p>
              <p>The virtual try-on results are for visualization purposes only. Actual garment fit may vary.</p>
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="space-y-4">
            <button onClick={() => setActiveTab('hub')} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-4 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Back
            </button>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setActiveTab('hub'); }}>
              <div>
                <label className="block text-xs font-semibold mb-1">Issue Type</label>
                <select className="w-full bg-[var(--color-surface)] border border-[var(--border-color)] rounded-lg p-2 text-sm focus:outline-none focus:border-[var(--color-primary)]">
                  <option>Bug/Glitch</option>
                  <option>Bad Fit Result</option>
                  <option>Feature Request</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Description</label>
                <textarea className="w-full bg-[var(--color-surface)] border border-[var(--border-color)] rounded-lg p-2 text-sm h-24 focus:outline-none focus:border-[var(--color-primary)]" placeholder="Describe the issue..."></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-[var(--color-primary)] text-[var(--color-surface)] font-bold rounded-lg hover:opacity-90 transition-opacity">
                Submit Report
              </button>
            </form>
          </div>
        )}

      </BottomSheet>
    </>
  );
};
