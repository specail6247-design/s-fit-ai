"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LegalModal } from './ui/modals/LegalModal';
import { ReportIssueModal } from './ui/modals/ReportIssueModal';

export const SupportHub: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'none' | 'privacy' | 'terms' | 'report'>('none');

  const PrivacyContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-2">1. Data Collection</h3>
      <p>When you use S_FIT AI, we collect photos you upload strictly for the purpose of generating virtual try-on results.</p>

      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 my-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-green-500 mt-0.5">verified_user</span>
        <div>
          <h4 className="font-bold text-green-500 text-sm">Data Safety Guarantee</h4>
          <p className="text-xs text-green-400/80 mt-1">Photos are processed securely and not shared. All uploaded images are automatically deleted from our servers after 24 hours.</p>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 mt-6">2. Third-Party Services</h3>
      <p>We use industry-leading AI providers (like Replicate and Fashn.ai) to process your images. These providers are bound by strict confidentiality agreements and do not use your photos to train their models.</p>

      <h3 className="text-lg font-bold text-white mb-2 mt-6">3. Your Rights</h3>
      <p>You have the right to request immediate deletion of any data associated with your session by contacting our support team.</p>
    </div>
  );

  const TermsContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h3>
      <p>By accessing and using S_FIT AI, you accept and agree to be bound by the terms and provision of this agreement.</p>

      <h3 className="text-lg font-bold text-white mb-2 mt-6">2. Acceptable Use</h3>
      <p>You agree to only upload photos that you have the right to use. Do not upload explicit, offensive, or inappropriate content.</p>

      <h3 className="text-lg font-bold text-white mb-2 mt-6">3. Service Modifications</h3>
      <p>S_FIT AI reserves the right to modify or discontinue, temporarily or permanently, the service with or without notice.</p>
    </div>
  );

  return (
    <>
      {/* Floating Support Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors z-40 group shadow-lg"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined text-[var(--color-text-secondary)] group-hover:text-white transition-colors">help</span>
      </button>

      {/* Support Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-[var(--color-surface)] border-l border-[var(--border-color)] shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
                <h2 className="text-xl font-bold font-[family-name:var(--font-display)] text-white">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Legal</h3>
                  <button
                    onClick={() => { setIsOpen(false); setActiveModal('privacy'); }}
                    className="w-full text-left px-4 py-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group"
                  >
                    <span className="text-sm font-medium text-white group-hover:text-[var(--color-primary)] transition-colors">Privacy Policy</span>
                    <span className="material-symbols-outlined text-[var(--color-text-secondary)] text-sm">chevron_right</span>
                  </button>
                  <button
                    onClick={() => { setIsOpen(false); setActiveModal('terms'); }}
                    className="w-full text-left px-4 py-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group"
                  >
                    <span className="text-sm font-medium text-white group-hover:text-[var(--color-primary)] transition-colors">Terms of Service</span>
                    <span className="material-symbols-outlined text-[var(--color-text-secondary)] text-sm">chevron_right</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Feedback</h3>
                  <button
                    onClick={() => { setIsOpen(false); setActiveModal('report'); }}
                    className="w-full text-left px-4 py-3 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/20 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[var(--color-primary)] text-sm">bug_report</span>
                      <span className="text-sm font-medium text-[var(--color-primary)]">Report Issue</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="p-6 border-t border-[var(--border-color)] bg-black/20">
                <div className="flex items-center gap-2 justify-center text-[var(--color-text-secondary)]">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span className="text-xs">Secure & Encrypted Processing</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LegalModal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal('none')}
        title="Privacy Policy"
        content={PrivacyContent}
      />
      <LegalModal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal('none')}
        title="Terms of Service"
        content={TermsContent}
      />
      <ReportIssueModal
        isOpen={activeModal === 'report'}
        onClose={() => setActiveModal('none')}
      />
    </>
  );
};
