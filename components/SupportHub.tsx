"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'report'>('privacy');

  const [reportText, setReportText] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setReportText("");
      setIsOpen(false);
    }, 2000);
  };

  const openTab = (tab: 'privacy' | 'terms' | 'report') => {
    setActiveTab(tab);
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openTab('report')}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-400 border border-red-500/30 shadow-lg backdrop-blur-md active:scale-95 transition-colors hover:bg-red-500/30"
          aria-label="Report Issue"
        >
          <span className="material-symbols-outlined">bug_report</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openTab('privacy')}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 shadow-lg backdrop-blur-md active:scale-95 transition-colors hover:bg-white/20"
          aria-label="Privacy & Terms"
        >
          <span className="material-symbols-outlined">policy</span>
        </motion.button>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/90 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'privacy' ? 'text-[#007AFF]' : 'text-gray-500 hover:text-white'}`}
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => setActiveTab('terms')}
                    className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'terms' ? 'text-[#007AFF]' : 'text-gray-500 hover:text-white'}`}
                  >
                    Terms of Service
                  </button>
                  <button
                    onClick={() => setActiveTab('report')}
                    className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'report' ? 'text-red-400' : 'text-gray-500 hover:text-white'}`}
                  >
                    Report Issue
                  </button>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 text-gray-400 transition-colors"
                  aria-label="Close"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              {/* Content Area */}
              <div className="p-6 h-[60vh] max-h-[500px] overflow-y-auto text-sm text-gray-300">
                {activeTab === 'privacy' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
                    <p>Last updated: October 24, 2026</p>
                    <div className="space-y-4 text-xs leading-relaxed text-gray-400">
                      <p>
                        At S_FIT AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information, particularly regarding the images you upload for our virtual try-on service.
                      </p>
                      <h3 className="text-sm font-bold text-white">1. Data Collection & Usage</h3>
                      <p>
                        When you use the S_FIT AI Virtual Try-On feature, you upload personal photos and garment images. These images are processed temporarily to generate your digital fitting result.
                      </p>
                      <h3 className="text-sm font-bold text-white">2. Data Safety</h3>
                      <p>
                        <strong className="text-[#007AFF]">Photos are processed securely and not shared.</strong> We do not store your uploaded personal photos after the session ends, nor do we use them to train our AI models without explicit consent.
                      </p>
                      <h3 className="text-sm font-bold text-white">3. Third-Party Services</h3>
                      <p>
                        We may use secure third-party APIs (such as Fashn.ai or Replicate) for processing the try-on simulation. These providers are bound by strict confidentiality agreements and are prohibited from retaining or using your data for other purposes.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'terms' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white">Terms of Service</h2>
                    <p>Last updated: October 24, 2026</p>
                    <div className="space-y-4 text-xs leading-relaxed text-gray-400">
                      <p>
                        Welcome to S_FIT AI. By accessing or using our virtual try-on application, you agree to be bound by these Terms of Service.
                      </p>
                      <h3 className="text-sm font-bold text-white">1. Acceptable Use</h3>
                      <p>
                        You agree to use the service only for lawful purposes. You must not upload offensive, explicit, or copyrighted images for which you do not have permission.
                      </p>
                      <h3 className="text-sm font-bold text-white">2. Intellectual Property</h3>
                      <p>
                        The generated images belong to you, but S_FIT AI retains the right to append our branding (such as logos) to images exported from our platform (e.g., via the &quot;Share to Story&quot; feature).
                      </p>
                      <h3 className="text-sm font-bold text-white">3. Liability</h3>
                      <p>
                        Our AI generates simulations of how garments might look. We do not guarantee exact physical fit or color matching in real life.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'report' && (
                  <div className="space-y-4 h-full flex flex-col">
                    <h2 className="text-xl font-bold text-red-400">Report an Issue</h2>
                    <p className="text-xs text-gray-400 mb-4">
                      Found a bug or experiencing rendering issues? Let us know so we can fix it.
                    </p>

                    {reportSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center flex-1 space-y-2 text-green-400"
                      >
                        <span className="material-symbols-outlined text-4xl">check_circle</span>
                        <p className="font-bold">Report Submitted</p>
                        <p className="text-xs text-gray-400">Thank you for improving S_FIT AI.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleReportSubmit} className="flex flex-col flex-1 gap-4">
                        <textarea
                          value={reportText}
                          onChange={(e) => setReportText(e.target.value)}
                          placeholder="Describe the issue... (e.g., The garment sleeve looks distorted)"
                          className="flex-1 w-full resize-none rounded-xl border border-white/20 bg-black/50 p-4 text-sm text-white placeholder-gray-500 focus:border-[#007AFF] focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
                          required
                        />
                        <button
                          type="submit"
                          className="w-full rounded-xl bg-red-500/20 py-3 text-sm font-bold text-red-400 hover:bg-red-500/30 transition-colors border border-red-500/30 cursor-pointer"
                        >
                          Submit Report
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
