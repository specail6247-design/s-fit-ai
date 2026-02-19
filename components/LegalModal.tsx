'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function LegalModal() {
  const { isLegalOpen, setLegalOpen, legalTab } = useStore();
  const [activeTab, setActiveTab] = useState(legalTab);

  useEffect(() => {
    setActiveTab(legalTab);
  }, [legalTab]);

  const handleClose = () => setLegalOpen(false);

  return (
    <AnimatePresence>
      {isLegalOpen && (
        <>
           {/* Backdrop */}
           <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998] flex items-center justify-center p-4"
          >
             {/* Modal */}
             <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
             >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                   <h2 className="text-xl font-bold font-mono tracking-wider text-white">LEGAL & COMPLIANCE</h2>
                   <button onClick={handleClose} className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                     ✕
                   </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10 bg-black/20">
                    <button
                        onClick={() => setActiveTab('privacy')}
                        className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                          activeTab === 'privacy' ? 'text-[#007AFF] bg-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        Privacy Policy
                        {activeTab === 'privacy' && (
                          <motion.div layoutId="activeLegalTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('terms')}
                        className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                          activeTab === 'terms' ? 'text-[#007AFF] bg-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        Terms of Service
                        {activeTab === 'terms' && (
                          <motion.div layoutId="activeLegalTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]" />
                        )}
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 text-sm text-gray-300 leading-relaxed space-y-6">
                    {activeTab === 'privacy' && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
                            <p>Last Updated: {new Date().toLocaleDateString()}</p>

                            <h4 className="font-bold text-white mt-4">1. Data Collection</h4>
                            <p>We collect images you upload solely for the purpose of generating virtual try-on results. We do not store biometric data permanently.</p>

                            <h4 className="font-bold text-white mt-4">2. Image Processing</h4>
                            <p>Images are processed using secure AI servers. Your photos are deleted from our processing servers immediately after the session or within 24 hours.</p>

                            <h4 className="font-bold text-white mt-4">3. Third-Party Sharing</h4>
                            <p>We do not sell your personal data. We may share anonymized usage data with analytics providers to improve our service.</p>

                            <h4 className="font-bold text-white mt-4">4. User Rights</h4>
                            <p>You have the right to request deletion of your data at any time by contacting support.</p>
                        </div>
                    )}

                    {activeTab === 'terms' && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white">Terms of Service</h3>
                            <p>Last Updated: {new Date().toLocaleDateString()}</p>

                            <h4 className="font-bold text-white mt-4">1. Acceptance of Terms</h4>
                            <p>By using S_FIT AI, you agree to these terms. If you do not agree, please do not use the service.</p>

                            <h4 className="font-bold text-white mt-4">2. Usage License</h4>
                            <p>We grant you a personal, non-exclusive license to use the application for personal virtual fitting purposes.</p>

                            <h4 className="font-bold text-white mt-4">3. Prohibited Conduct</h4>
                            <p>You may not upload illegal, explicit, or infringing content. We reserve the right to ban users who violate this policy.</p>

                            <h4 className="font-bold text-white mt-4">4. Disclaimer</h4>
                            <p>The virtual try-on results are AI-generated estimations. We do not guarantee 100% accuracy in fit or appearance.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-black/40 text-center">
                    <button
                        onClick={handleClose}
                        className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-colors text-xs uppercase tracking-widest"
                    >
                        I Understand
                    </button>
                </div>
             </motion.div>
           </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
