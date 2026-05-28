"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<'main' | 'privacy' | 'terms' | 'report'>('main');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Support Hub"
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all z-50 shadow-lg"
      >
        <span className="text-xl">?</span>
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
              transition={{ type: 'spring' as const, damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 className="text-xl font-bold tracking-widest uppercase">
                  {activeView === 'main' && 'Support Hub'}
                  {activeView === 'privacy' && 'Privacy Policy'}
                  {activeView === 'terms' && 'Terms of Service'}
                  {activeView === 'report' && 'Report Issue'}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeView === 'main' && (
                  <>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-4">
                      <span className="text-2xl">🔒</span>
                      <div>
                        <h3 className="font-bold text-sm text-[#007AFF]">Data Safety</h3>
                        <p className="text-xs text-gray-400 mt-1">Photos are processed securely and not shared. We adhere to strict privacy guidelines.</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button onClick={() => setActiveView('report')} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-left flex justify-between items-center transition-colors">
                        <span className="font-bold text-sm">Report Issue</span>
                        <span className="text-gray-500">→</span>
                      </button>
                      <button onClick={() => setActiveView('privacy')} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-left flex justify-between items-center transition-colors">
                        <span className="font-bold text-sm">Privacy Policy</span>
                        <span className="text-gray-500">→</span>
                      </button>
                      <button onClick={() => setActiveView('terms')} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-left flex justify-between items-center transition-colors">
                        <span className="font-bold text-sm">Terms of Service</span>
                        <span className="text-gray-500">→</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Q&A / Help</h3>
                      <div className="space-y-2">
                        <details className="group bg-white/5 rounded-xl border border-white/10 p-4">
                          <summary className="font-bold text-sm cursor-pointer list-none flex justify-between items-center">
                            How do I get the best fit?
                            <span className="transition group-open:rotate-180">↓</span>
                          </summary>
                          <p className="text-xs text-gray-400 mt-3">Upload clear, well-lit photos facing forward for the most accurate results.</p>
                        </details>
                        <details className="group bg-white/5 rounded-xl border border-white/10 p-4">
                          <summary className="font-bold text-sm cursor-pointer list-none flex justify-between items-center">
                            Are my photos saved?
                            <span className="transition group-open:rotate-180">↓</span>
                          </summary>
                          <p className="text-xs text-gray-400 mt-3">No, images are temporarily processed for fitting and securely deleted immediately after.</p>
                        </details>
                      </div>
                    </div>
                  </>
                )}

                {activeView === 'report' && (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setActiveView('main'); alert('Issue reported successfully!'); }}>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Issue Description</label>
                      <textarea
                        className="w-full h-32 bg-black/40 border border-white/20 rounded-xl p-3 text-sm focus:border-[#007AFF] focus:outline-none resize-none"
                        placeholder="Describe what went wrong..."
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] rounded-xl font-bold text-sm transition-colors shadow-lg shadow-blue-500/20">
                      Submit Report
                    </button>
                    <button type="button" onClick={() => setActiveView('main')} className="w-full py-3 bg-transparent border border-white/20 hover:bg-white/5 rounded-xl font-bold text-sm transition-colors mt-2">
                      Back
                    </button>
                  </form>
                )}

                {activeView === 'privacy' && (
                  <div className="space-y-4 text-sm text-gray-300">
                    <h3 className="font-bold text-white">Privacy Policy</h3>
                    <p>Last updated: Today</p>
                    <p>We respect your privacy. Our virtual fitting room requires access to your photos strictly for the purpose of generating the fitting preview.</p>
                    <h4 className="font-bold text-white mt-4">Data Collection</h4>
                    <p>We process images securely on our servers. Images are not shared with third parties or used for training AI models without explicit consent.</p>
                    <button onClick={() => setActiveView('main')} className="w-full py-3 mt-6 border border-white/20 hover:bg-white/5 rounded-xl font-bold text-sm transition-colors">
                      Back to Support Hub
                    </button>
                  </div>
                )}

                {activeView === 'terms' && (
                  <div className="space-y-4 text-sm text-gray-300">
                    <h3 className="font-bold text-white">Terms of Service</h3>
                    <p>By using S_FIT AI, you agree to these terms.</p>
                    <h4 className="font-bold text-white mt-4">Usage Restrictions</h4>
                    <p>You may not use the service to process explicit, offensive, or otherwise inappropriate content.</p>
                    <button onClick={() => setActiveView('main')} className="w-full py-3 mt-6 border border-white/20 hover:bg-white/5 rounded-xl font-bold text-sm transition-colors">
                      Back to Support Hub
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
