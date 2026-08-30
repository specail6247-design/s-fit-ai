"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyTermsModal({ isOpen, onClose }: PrivacyTermsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white tracking-tight">Privacy Policy & Terms of Service</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300 space-y-6 custom-scrollbar">
              <section className="space-y-3">
                <h3 className="text-lg font-semibold text-white">1. Data Processing & Privacy</h3>
                <p>
                  At S_FIT AI, your privacy is our priority. Any photos uploaded for virtual fitting are processed securely in real-time and are <strong>never stored permanently</strong> on our servers after your session ends. We do not use your personal images to train our AI models without explicit consent.
                </p>
                <div className="bg-[#007AFF]/10 border border-[#007AFF]/30 p-4 rounded-lg flex items-start gap-3 mt-4">
                  <span className="text-[#007AFF] text-xl shrink-0">🛡️</span>
                  <div>
                    <h4 className="text-white font-medium mb-1">Data Safety Guarantee</h4>
                    <p className="text-xs text-[#007AFF]">Photos are processed securely and not shared with third parties.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-semibold text-white">2. Terms of Service</h3>
                <p>
                  By using S_FIT AI, you agree to use the service for personal, non-commercial purposes only (unless explicitly licensed). The virtual try-on results are AI-generated approximations and may not perfectly represent the physical garment.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-semibold text-white">3. Acceptable Use</h3>
                <p>
                  Users must not upload explicit, copyrighted, or malicious content. We reserve the right to terminate access for users who violate these guidelines.
                </p>
              </section>
            </div>

            <div className="p-4 border-t border-white/10 bg-black/40 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#007AFF] hover:bg-[#005bb5] text-white font-medium rounded-lg transition-colors"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
