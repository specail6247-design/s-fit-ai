import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'report' | 'legal' | 'guide'>('report');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleHub = () => setIsOpen(!isOpen);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={toggleHub}
        className="fixed bottom-6 right-6 bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#007AFF] text-white p-3 rounded-full shadow-lg z-50 transition-all hover:scale-105 group"
        aria-label="Support Hub"
      >
        <span className="text-xl group-hover:animate-bounce block">💡</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[400px] max-w-[90vw] bg-[#0a0a0a]/95 backdrop-blur-2xl border-l border-white/10 z-[100] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-xl font-bold tracking-tight text-white">Support Hub</h2>
              <button
                onClick={toggleHub}
                className="text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="flex px-4 pt-4 border-b border-white/10 gap-2">
              <button
                onClick={() => setActiveTab('report')}
                className={`pb-3 px-3 text-sm font-medium transition-colors relative ${activeTab === 'report' ? 'text-[#007AFF]' : 'text-gray-400 hover:text-gray-200'}`}
              >
                Report Issue
                {activeTab === 'report' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]" />}
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`pb-3 px-3 text-sm font-medium transition-colors relative ${activeTab === 'guide' ? 'text-[#007AFF]' : 'text-gray-400 hover:text-gray-200'}`}
              >
                User Guide
                {activeTab === 'guide' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]" />}
              </button>
              <button
                onClick={() => setActiveTab('legal')}
                className={`pb-3 px-3 text-sm font-medium transition-colors relative ${activeTab === 'legal' ? 'text-[#007AFF]' : 'text-gray-400 hover:text-gray-200'}`}
              >
                Legal
                {activeTab === 'legal' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]" />}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10">
              {activeTab === 'report' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <p className="text-sm text-gray-400 mb-6">Found a bug or have feedback? Let us know so we can improve S_FIT AI.</p>

                  {isSubmitted ? (
                    <div className="bg-[#007AFF]/10 border border-[#007AFF]/30 p-6 rounded-xl text-center">
                      <div className="text-3xl mb-2">✅</div>
                      <h3 className="text-white font-bold mb-1">Issue Reported</h3>
                      <p className="text-xs text-[#007AFF]">Thank you! Our team will look into it.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleReportSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Issue Type</label>
                        <select className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-all">
                          <option>Bug/Error</option>
                          <option>Feature Request</option>
                          <option>Garment Rendering Issue</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
                        <textarea
                          required
                          rows={4}
                          className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-all resize-none"
                          placeholder="Please describe the issue in detail..."
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Submit Report
                      </button>
                    </form>
                  )}
                </motion.div>
              )}

              {activeTab === 'guide' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-white font-bold">1. Best Photo Practices 📸</h3>
                    <div className="bg-black/50 border border-white/10 rounded-lg p-4 text-sm text-gray-300 space-y-2">
                      <p className="flex items-start gap-2"><span>•</span> Use good lighting, preferably natural light.</p>
                      <p className="flex items-start gap-2"><span>•</span> Ensure your full body is visible in the frame.</p>
                      <p className="flex items-start gap-2 text-[#007AFF]"><span>•</span> Wear tight-fitting clothes for the best AI rendering results.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white font-bold">2. Selecting Garments 👕</h3>
                    <div className="bg-black/50 border border-white/10 rounded-lg p-4 text-sm text-gray-300 space-y-2">
                      <p className="flex items-start gap-2"><span>•</span> Front-facing product photos work best.</p>
                      <p className="flex items-start gap-2"><span>•</span> Avoid photos with complex backgrounds or models.</p>
                    </div>
                  </div>

                  <div className="space-y-2 mt-8">
                     <h3 className="text-white font-bold text-lg border-b border-white/10 pb-2 mb-4">FAQ</h3>

                     <details className="group bg-black/30 border border-white/10 rounded-lg overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                       <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-white">
                         <span className="text-sm">How long does rendering take?</span>
                         <span className="transition group-open:rotate-180">▾</span>
                       </summary>
                       <p className="p-4 pt-0 text-sm text-gray-400 bg-black/30">
                         Usually between 10 to 30 seconds depending on server load and image complexity.
                       </p>
                     </details>

                     <details className="group bg-black/30 border border-white/10 rounded-lg overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                       <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-white">
                         <span className="text-sm">Are my photos saved?</span>
                         <span className="transition group-open:rotate-180">▾</span>
                       </summary>
                       <p className="p-4 pt-0 text-sm text-gray-400 bg-black/30">
                         No. We process your photos securely in memory for the try-on and delete them immediately after. We do not store or share your personal images.
                       </p>
                     </details>
                  </div>
                </motion.div>
              )}

              {activeTab === 'legal' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 text-sm text-gray-300">
                  <div className="bg-black/50 border border-white/10 rounded-xl p-5 hover:border-white/30 transition-colors">
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                      <span>🛡️</span> Privacy Policy
                    </h3>
                    <p className="mb-4 text-xs leading-relaxed text-gray-400">
                      We take your privacy seriously. Your biometric data and uploaded photos are processed ephemerally for the sole purpose of virtual try-on and are strictly not shared with third parties or used to train external models.
                    </p>
                    <button className="text-[#007AFF] text-xs font-bold hover:underline">Read Full Privacy Policy →</button>
                  </div>

                  <div className="bg-black/50 border border-white/10 rounded-xl p-5 hover:border-white/30 transition-colors">
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                      <span>📄</span> Terms of Service
                    </h3>
                    <p className="mb-4 text-xs leading-relaxed text-gray-400">
                      By using S_FIT AI, you agree to our terms. The virtual try-on results are AI-generated estimates and may not perfectly reflect real-world physical fit or color accuracy.
                    </p>
                    <button className="text-[#007AFF] text-xs font-bold hover:underline">Read Full Terms →</button>
                  </div>

                  <div className="text-center pt-8 text-xs text-gray-600">
                    S_FIT AI © {new Date().getFullYear()}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
