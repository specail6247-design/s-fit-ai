"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [issueText, setIssueText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Modal states
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  const handleReportIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setIssueText("");
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#007AFF] text-white rounded-full shadow-[0_0_15px_rgba(0,122,255,0.5)] flex items-center justify-center hover:scale-105 transition-transform z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007AFF] focus:ring-offset-[#0A0A0A]"
        aria-label="Open Support Hub"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Slide-out Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0A0A0A] border-l border-white/10 z-40 shadow-2xl flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="support-hub-title"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 id="support-hub-title" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#007AFF]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Trust & Growth
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-md"
                  aria-label="Close Support Hub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-8">

                {/* Data Safety Badge */}
                <div className="bg-[#111] border border-white/10 rounded-xl p-4 flex items-start gap-4">
                  <div className="bg-[#007AFF]/20 p-2 rounded-lg text-[#007AFF]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Data Safety</h3>
                    <p className="text-xs text-gray-400">
                      Photos are processed securely and not shared. We prioritize your privacy.
                    </p>
                  </div>
                </div>

                {/* Report Issue Form */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Report Issue
                  </h3>
                  <form onSubmit={handleReportIssue} className="space-y-3">
                    <textarea
                      value={issueText}
                      onChange={(e) => setIssueText(e.target.value)}
                      placeholder="Describe the bug or feedback here..."
                      className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] transition-all resize-none h-24"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting || submitted || !issueText.trim()}
                      className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all ${
                        submitted
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : isSubmitting
                          ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                      }`}
                    >
                      {submitted ? "Received. Thank you!" : isSubmitting ? "Submitting..." : "Submit Feedback"}
                    </button>
                  </form>
                </div>

                {/* Legal Links */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Legal</h3>
                  <button
                    onClick={() => setActiveModal('privacy')}
                    className="w-full text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 py-2 px-3 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span>Privacy Policy</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveModal('terms')}
                    className="w-full text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 py-2 px-3 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span>Terms of Service</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals for Privacy & Terms */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden"
              role="dialog"
              aria-modal="true"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 className="text-xl font-bold text-white">
                  {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                </h2>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 text-gray-300 text-sm leading-relaxed space-y-4">
                {activeModal === 'privacy' ? (
                  <>
                    <h3 className="text-white font-bold text-lg">1. Information We Collect</h3>
                    <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), delivery notes, and other information you choose to provide.</p>

                    <h3 className="text-white font-bold text-lg mt-6">2. How We Use Information</h3>
                    <p>We may use the information we collect about you to Provide, maintain, and improve our Services, including, for example, to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users and Drivers, develop safety features, authenticate users, and send product updates and administrative messages.</p>

                    <h3 className="text-white font-bold text-lg mt-6">3. Data Security</h3>
                    <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-white font-bold text-lg">1. Agreement to Terms</h3>
                    <p>By viewing or using this Website, which can be accessed at this URL, you are agreeing to be bound by these Website’s Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.</p>

                    <h3 className="text-white font-bold text-lg mt-6">2. Use License</h3>
                    <p>Permission is granted to temporarily download one copy of the materials on S_FIT&apos;s Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>modify or copy the materials;</li>
                      <li>use the materials for any commercial purpose or for any public display;</li>
                      <li>attempt to reverse engineer any software contained on S_FIT&apos;s Website;</li>
                      <li>remove any copyright or other proprietary notations from the materials; or</li>
                      <li>transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
                    </ul>

                    <h3 className="text-white font-bold text-lg mt-6">3. Disclaimer</h3>
                    <p>All the materials on S_FIT&apos;s Website are provided &quot;as is&quot;. S_FIT makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, S_FIT does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>
                  </>
                )}
              </div>
              <div className="p-4 border-t border-white/10 bg-black/40 text-right">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
