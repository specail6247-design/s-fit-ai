"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'report'>('privacy');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-black/60 text-white p-3 rounded-full hover:bg-white/10 border border-white/20 transition-all shadow-lg backdrop-blur-md flex items-center gap-2"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined text-sm">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#101622] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`text-sm font-medium transition-colors ${activeTab === 'privacy' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    Privacy
                  </button>
                  <button
                    onClick={() => setActiveTab('terms')}
                    className={`text-sm font-medium transition-colors ${activeTab === 'terms' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    Terms
                  </button>
                  <button
                    onClick={() => setActiveTab('report')}
                    className={`text-sm font-medium transition-colors ${activeTab === 'report' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    Report Issue
                  </button>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 text-sm text-gray-300">
                {activeTab === 'privacy' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Privacy Policy</h3>
                    <p>Last updated: Today</p>
                    <p>We care about your privacy. Photos uploaded for virtual try-on are processed securely and are not shared with any third parties.</p>
                    <h4 className="text-lg font-semibold text-white mt-4">1. Data Collection</h4>
                    <p>We only collect the photos you explicitly upload to use the try-on feature. We do not use them for training our models without your consent.</p>
                    <h4 className="text-lg font-semibold text-white mt-4">2. Data Processing</h4>
                    <p>Your photos are processed transiently to generate the fitting result and are immediately deleted from our servers thereafter.</p>
                  </div>
                )}

                {activeTab === 'terms' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Terms of Service</h3>
                    <p>By using S_FIT AI, you agree to the following terms.</p>
                    <h4 className="text-lg font-semibold text-white mt-4">1. Acceptable Use</h4>
                    <p>You agree not to upload inappropriate, offensive, or copyrighted material without permission.</p>
                    <h4 className="text-lg font-semibold text-white mt-4">2. Liability</h4>
                    <p>S_FIT AI provides this service &quot;as is&quot;. We are not responsible for any issues arising from the use of our generated images.</p>
                  </div>
                )}

                {activeTab === 'report' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-4">Report an Issue</h3>
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Issue reported! Thank you.'); setIsOpen(false); }}>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Issue Type</label>
                        <select className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-[#007AFF]">
                          <option>Bug</option>
                          <option>Feature Request</option>
                          <option>Feedback</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                        <textarea
                          className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#007AFF] min-h-[100px]"
                          placeholder="Please describe the issue..."
                          required
                        />
                      </div>
                      <button type="submit" className="w-full bg-[#007AFF] text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Submit Report
                      </button>
                    </form>
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
