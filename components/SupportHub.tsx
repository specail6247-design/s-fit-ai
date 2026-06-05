"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#007AFF]/20 hover:bg-[#007AFF]/40 border border-[#007AFF]/50 text-white rounded-full p-4 backdrop-blur-md transition-all shadow-[0_0_15px_rgba(0,122,255,0.3)]"
      >
        <span className="text-xl">💬</span>
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white tracking-tight">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕ Close
                </button>
              </div>

              <div className="space-y-6">
                {/* Report Issue Form */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-[#007AFF] mb-3">Report an Issue</h3>
                  <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert("Issue reported successfully!"); }}>
                    <input
                      type="text"
                      placeholder="Title"
                      className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-[#007AFF]"
                      required
                    />
                    <textarea
                      placeholder="Describe the issue..."
                      className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-sm text-white h-24 focus:outline-none focus:border-[#007AFF]"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg text-sm transition-colors"
                    >
                      Submit Report
                    </button>
                  </form>
                </div>

                {/* Legal & Compliance */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-white mb-3">Legal & Compliance</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveModal('privacy')}
                      className="w-full text-left p-3 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20 text-sm transition-all"
                    >
                      📄 Privacy Policy
                    </button>
                    <button
                      onClick={() => setActiveModal('terms')}
                      className="w-full text-left p-3 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20 text-sm transition-all"
                    >
                      ⚖️ Terms of Service
                    </button>
                  </div>
                </div>

                {/* FAQ & User Guide Placeholder */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                   <h3 className="text-lg font-bold text-white mb-3">Help & Guides</h3>
                   <div className="text-xs text-gray-400 space-y-2">
                     <p>• User Guide Carousel (Coming soon)</p>
                     <p>• Lighting/Camera Cautions</p>
                     <p>• FAQ Accordion</p>
                   </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals for Privacy and Terms */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                </h3>
                <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-white">✕</button>
              </div>
              <div className="p-6 overflow-y-auto text-sm text-gray-300 space-y-4">
                {activeModal === 'privacy' ? (
                  <>
                    <p><strong>1. Data Processing</strong><br/>All photos uploaded to S_FIT are processed securely on our servers and are immediately deleted after the virtual fitting process is complete.</p>
                    <p><strong>2. Information Collection</strong><br/>We only collect the images you explicitly upload and anonymous usage data to improve our service.</p>
                    <p><strong>3. Data Sharing</strong><br/>Your personal images and data are never sold or shared with third parties for marketing purposes.</p>
                    <p><strong>4. Security</strong><br/>We implement industry-standard security measures to protect your data during transmission and processing.</p>
                  </>
                ) : (
                  <>
                    <p><strong>1. Acceptance of Terms</strong><br/>By accessing or using S_FIT, you agree to be bound by these Terms of Service.</p>
                    <p><strong>2. User Content</strong><br/>You retain all rights to the images you upload. You grant us a temporary license solely to process the images for the purpose of providing the virtual fitting service.</p>
                    <p><strong>3. Prohibited Conduct</strong><br/>You agree not to upload inappropriate, copyrighted, or non-consensual images.</p>
                    <p><strong>4. Disclaimer of Warranties</strong><br/>The service is provided &quot;as is&quot; without any guarantees regarding the accuracy of the virtual fitting results.</p>
                  </>
                )}
              </div>
              <div className="p-4 border-t border-white/10 flex justify-end">
                <button onClick={() => setActiveModal(null)} className="px-6 py-2 bg-[#007AFF] text-white rounded-lg font-bold hover:bg-[#005bb5]">Accept & Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
