'use client';

import React, { useState } from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { LegalModal } from '@/components/LegalModal';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [showLegal, setShowLegal] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');

  // Form State
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // API call would go here
      setIsSubmitting(false);
      setSubmitStatus('success');
      setSubject('');
      setDescription('');

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  const openLegal = (tab: 'privacy' | 'terms') => {
    setLegalTab(tab);
    setShowLegal(true);
  };

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} title="Support Hub">
        <div className="space-y-8">

          {/* Section: Report Issue */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyber-lime">Report an Issue</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief summary of the issue"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyber-lime outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe what happened..."
                  rows={4}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyber-lime outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                  submitStatus === 'success'
                    ? 'bg-green-500 text-black'
                    : 'bg-white text-black hover:bg-gray-200 disabled:opacity-50'
                }`}
              >
                {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Report Sent!' : 'Submit Report'}
              </button>
            </form>
          </section>

          <hr className="border-white/10" />

          {/* Section: Help & Legal */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyber-lime">Help & Legal</h3>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => openLegal('privacy')}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <span className="text-sm text-gray-300 group-hover:text-white">Privacy Policy</span>
                <span className="text-gray-500">→</span>
              </button>
              <button
                onClick={() => openLegal('terms')}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <span className="text-sm text-gray-300 group-hover:text-white">Terms of Service</span>
                <span className="text-gray-500">→</span>
              </button>
            </div>
          </section>

          <hr className="border-white/10" />

          {/* Footer Info */}
          <div className="text-center space-y-2">
             <p className="text-xs text-gray-500">S_FIT AI Version 1.0.0 (Beta)</p>
             <p className="text-[10px] text-gray-600">© 2024 S_FIT AI. All rights reserved.</p>
          </div>

        </div>
      </Drawer>

      <LegalModal
        isOpen={showLegal}
        onClose={() => setShowLegal(false)}
        initialTab={legalTab}
      />
    </>
  );
}
