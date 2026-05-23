"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'none' | 'privacy' | 'terms' | 'report'>('none');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-2xl shadow-xl hover:bg-white/20 transition-all z-50 text-white"
        aria-label="Support Hub"
      >
        ?
      </button>

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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#111] border-l border-white/10 shadow-2xl z-50 flex flex-col text-white"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-widest uppercase">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Data Safety Badge */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 flex items-start gap-4">
                  <div className="text-green-400 text-2xl">🔒</div>
                  <div>
                    <h3 className="font-bold text-sm">Data Safety</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Photos are processed securely and not shared. Your data is deleted immediately after processing.
                    </p>
                  </div>
                </div>

                {/* Legal & Compliance */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Legal</h3>
                  <button onClick={() => setActiveModal('privacy')} className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-colors text-sm">
                    Privacy Policy
                  </button>
                  <button onClick={() => setActiveModal('terms')} className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-colors text-sm">
                    Terms of Service
                  </button>
                </div>

                {/* Feedback Loop */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Feedback</h3>
                  <button onClick={() => setActiveModal('report')} className="w-full text-left p-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition-colors text-sm flex justify-between items-center">
                    <span>Report Issue</span>
                    <span>🐛</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {activeModal !== 'none' && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal('none')}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 md:p-8 max-h-[80vh] flex flex-col text-white"
            >
              <button
                onClick={() => setActiveModal('none')}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                ✕
              </button>

              {activeModal === 'privacy' && (
                <>
                  <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                  <div className="flex-1 overflow-y-auto pr-4 space-y-4 text-gray-300 text-sm">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <h3 className="font-bold text-white mt-4">1. Information We Collect</h3>
                    <p>We collect temporary photo uploads strictly for the purpose of generating virtual try-on images. These images are not stored permanently.</p>
                    <h3 className="font-bold text-white mt-4">2. How We Use Information</h3>
                    <p>Your photos are processed in real-time by our AI models. We do not use your photos to train our models without explicit consent.</p>
                    <h3 className="font-bold text-white mt-4">3. Data Security</h3>
                    <p>All data transmissions are encrypted. We implement strict security measures to prevent unauthorized access to your images.</p>
                  </div>
                </>
              )}

              {activeModal === 'terms' && (
                <>
                  <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
                  <div className="flex-1 overflow-y-auto pr-4 space-y-4 text-gray-300 text-sm">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <h3 className="font-bold text-white mt-4">1. Acceptance of Terms</h3>
                    <p>By accessing and using S_FIT, you accept and agree to be bound by the terms and provision of this agreement.</p>
                    <h3 className="font-bold text-white mt-4">2. Use License</h3>
                    <p>Permission is granted to temporarily use the service for personal, non-commercial transitory viewing only.</p>
                    <h3 className="font-bold text-white mt-4">3. Disclaimer</h3>
                    <p>The materials on S_FIT&apos;s application are provided on an &apos;as is&apos; basis. Generated images may not perfectly represent actual fit or physical properties.</p>
                  </div>
                </>
              )}

              {activeModal === 'report' && (
                <>
                  <h2 className="text-2xl font-bold mb-4">Report an Issue</h2>
                  <form className="flex-1 overflow-y-auto space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    alert('Report submitted successfully! Thank you for your feedback.');
                    setActiveModal('none');
                  }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Issue Type</label>
                      <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none">
                        <option>Bug/Error</option>
                        <option>Bad Fitting Result</option>
                        <option>Feature Request</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                      <textarea
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none min-h-[120px]"
                        placeholder="Please describe the issue in detail..."
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-xl font-bold transition-colors">
                      Submit Report
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
