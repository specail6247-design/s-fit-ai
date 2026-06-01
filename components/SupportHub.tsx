'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'hub' | 'privacy' | 'terms' | 'report' | 'guide'>('hub');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-all border border-white/20 text-xl"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h2 className="text-xl font-bold font-cinzel">
                  {activeTab === 'hub' && 'Support Hub'}
                  {activeTab === 'privacy' && 'Privacy Policy'}
                  {activeTab === 'terms' && 'Terms of Service'}
                  {activeTab === 'report' && 'Report Issue'}
                  {activeTab === 'guide' && 'User Guide'}
                </h2>
                <div className="flex gap-2">
                  {activeTab !== 'hub' && (
                    <button onClick={() => setActiveTab('hub')} className="p-2 hover:bg-white/10 rounded-full" aria-label="Back">
                      <span className="material-symbols-outlined text-sm">arrow_back</span>
                    </button>
                  )}
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full" aria-label="Close">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              </div>

              <div className="p-4 max-h-[70vh] overflow-y-auto scrollbar-hide">
                {activeTab === 'hub' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => setActiveTab('guide')} className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors">
                        <span className="material-symbols-outlined block mb-2">menu_book</span>
                        <div className="font-bold">User Guide</div>
                        <div className="text-xs text-gray-400 mt-1">How to use M_FIT</div>
                      </button>
                      <button onClick={() => setActiveTab('report')} className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors">
                        <span className="material-symbols-outlined block mb-2">bug_report</span>
                        <div className="font-bold">Report Issue</div>
                        <div className="text-xs text-gray-400 mt-1">Help us improve</div>
                      </button>
                    </div>

                    <div className="mt-8 space-y-2">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Legal & Trust</div>
                      <button onClick={() => setActiveTab('privacy')} className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg text-left text-sm flex justify-between items-center">
                        Privacy Policy
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                      <button onClick={() => setActiveTab('terms')} className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg text-left text-sm flex justify-between items-center">
                        Terms of Service
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    </div>

                    <div className="mt-6 flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <span className="material-symbols-outlined text-green-400">shield</span>
                      <div className="text-xs text-gray-300">
                        <span className="font-bold text-green-400 block mb-1">Data Safety Badge</span>
                        Photos are processed securely and not shared.
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="text-sm text-gray-300 space-y-4">
                    <p>At M_FIT, your privacy is our top priority. This policy outlines how we handle your data.</p>
                    <h3 className="text-white font-bold mt-4">1. Data Collection</h3>
                    <p>We only collect photos you explicitly upload for the virtual fitting process.</p>
                    <h3 className="text-white font-bold mt-4">2. Data Processing</h3>
                    <p>Photos are processed securely in real-time. We do not store your original photos after the session ends.</p>
                    <h3 className="text-white font-bold mt-4">3. Data Sharing</h3>
                    <p>Your photos are strictly yours. We do not share them with any third parties.</p>
                  </div>
                )}

                {activeTab === 'terms' && (
                  <div className="text-sm text-gray-300 space-y-4">
                    <p>Welcome to M_FIT. By using our app, you agree to these terms.</p>
                    <h3 className="text-white font-bold mt-4">1. Usage</h3>
                    <p>You agree to use M_FIT only for lawful purposes and in accordance with these terms.</p>
                    <h3 className="text-white font-bold mt-4">2. User Content</h3>
                    <p>You retain all rights to the photos you upload. You grant us a temporary license to process them for the fitting.</p>
                  </div>
                )}

                {activeTab === 'report' && (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Issue reported! Thank you.'); setActiveTab('hub'); }}>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">What went wrong?</label>
                      <textarea
                        className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-white/50"
                        rows={4}
                        placeholder="Describe the issue..."
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Email (optional)</label>
                      <input
                        type="email"
                        className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-white/50"
                        placeholder="For follow-up"
                      />
                    </div>
                    <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors">
                      Submit Report
                    </button>
                  </form>
                )}

                {activeTab === 'guide' && (
                  <div className="text-sm text-gray-300 space-y-4">
                    <p>Welcome to M_FIT, your digital fitting room.</p>
                    <div className="space-y-2 mt-4">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <h4 className="font-bold text-white mb-1">1. Upload Photo</h4>
                        <p className="text-xs text-gray-400">Take or upload a clear photo of yourself.</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <h4 className="font-bold text-white mb-1">2. Select Garment</h4>
                        <p className="text-xs text-gray-400">Choose the clothing item you want to try on.</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <h4 className="font-bold text-white mb-1">3. Generate Fit</h4>
                        <p className="text-xs text-gray-400">Let our AI create your virtual fitting result.</p>
                      </div>
                    </div>
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
