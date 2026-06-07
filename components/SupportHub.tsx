import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'issue' | 'faq' | 'legal'>('guide');
  const [guideStep, setGuideStep] = useState(0);
  const [issueDesc, setIssueDesc] = useState('');
  const [issueSubmitted, setIssueSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const guideSteps = [
    { title: "Lighting", desc: "Ensure you are in a well-lit room. Natural light works best.", icon: "☀️" },
    { title: "Distance", desc: "Stand 3-5 feet away from the camera for optimal body capture.", icon: "📏" },
    { title: "Pose", desc: "Stand straight with arms slightly away from your body (A-Pose).", icon: "🧍" },
  ];

  const faqs = [
    { q: "Is my photo stored?", a: "No. Photos are processed securely and deleted immediately after generation." },
    { q: "How accurate is the fit?", a: "Our AI provides a 95% accurate drape visualization based on your body shape." },
    { q: "Can I try multiple items?", a: "Yes, you can upload different garments to test various styles." },
  ];

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueDesc.trim()) return;
    setIssueSubmitted(true);
    setTimeout(() => {
      setIssueSubmitted(false);
      setIssueDesc('');
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tighter text-white font-[family-name:var(--font-display)]">Support Hub</h2>
                <p className="text-[10px] uppercase tracking-widest text-cyber-lime mt-1">Assistance & Guidelines</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-soft-gray hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Navigation */}
            <div className="flex px-4 py-2 border-b border-white/5 overflow-x-auto no-scrollbar">
              {[
                { id: 'guide', label: 'Guide' },
                { id: 'issue', label: 'Report' },
                { id: 'faq', label: 'FAQ' },
                { id: 'legal', label: 'Legal' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'guide' | 'issue' | 'faq' | 'legal')}
                  className={`px-4 py-3 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-cyber-lime text-cyber-lime'
                      : 'border-transparent text-soft-gray hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 relative">

              {/* GUIDE TAB */}
              {activeTab === 'guide' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white tracking-widest uppercase">How to Fit</h3>

                    {/* Carousel */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center relative overflow-hidden">
                      <div className="text-4xl mb-4">{guideSteps[guideStep].icon}</div>
                      <h4 className="text-lg font-bold text-white mb-2">{guideSteps[guideStep].title}</h4>
                      <p className="text-xs text-soft-gray leading-relaxed h-12">{guideSteps[guideStep].desc}</p>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-6">
                        <button
                          onClick={() => setGuideStep(p => Math.max(0, p - 1))}
                          className={`text-xs uppercase tracking-widest ${guideStep === 0 ? 'text-white/20 pointer-events-none' : 'text-cyber-lime'}`}
                        >
                          Prev
                        </button>
                        <div className="flex gap-1">
                          {guideSteps.map((_, i) => (
                            <div key={i} className={`h-1 rounded-full transition-all ${i === guideStep ? 'w-4 bg-cyber-lime' : 'w-1 bg-white/20'}`} />
                          ))}
                        </div>
                        <button
                          onClick={() => setGuideStep(p => Math.min(guideSteps.length - 1, p + 1))}
                          className={`text-xs uppercase tracking-widest ${guideStep === guideSteps.length - 1 ? 'text-white/20 pointer-events-none' : 'text-cyber-lime'}`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cautions */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-soft-gray tracking-widest uppercase">Cautions</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                        <span className="text-red-500 mt-0.5">⚠️</span>
                        <div>
                          <p className="text-xs font-bold text-red-500 mb-1">Avoid Dark Clothing</p>
                          <p className="text-[10px] text-soft-gray">Wearing pure black may confuse the AI when detecting body contours.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                        <span className="text-yellow-500 mt-0.5">📸</span>
                        <div>
                          <p className="text-xs font-bold text-yellow-500 mb-1">Clear Backgrounds</p>
                          <p className="text-[10px] text-soft-gray">Ensure your background is relatively plain and uncluttered.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ISSUE TAB */}
              {activeTab === 'issue' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-2">Report an Issue</h3>
                    <p className="text-xs text-soft-gray">Experiencing a glitch or bad render? Let us know.</p>
                  </div>

                  {issueSubmitted ? (
                    <div className="bg-cyber-lime/10 border border-cyber-lime/30 rounded-xl p-8 text-center">
                      <div className="text-3xl mb-4">✅</div>
                      <p className="text-sm font-bold text-cyber-lime mb-1">Report Received</p>
                      <p className="text-xs text-soft-gray">Thank you. Our engineers are on it.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleIssueSubmit} className="space-y-4">
                      <textarea
                        value={issueDesc}
                        onChange={(e) => setIssueDesc(e.target.value)}
                        placeholder="Describe what went wrong..."
                        className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-soft-gray focus:border-cyber-lime outline-none resize-none font-mono"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-white text-black font-bold text-xs uppercase tracking-widest py-3 rounded-xl hover:bg-cyber-lime transition-colors"
                      >
                        Submit Report
                      </button>
                    </form>
                  )}
                </motion.div>
              )}

              {/* FAQ TAB */}
              {activeTab === 'faq' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4">Frequently Asked</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                        >
                          <span className="text-xs font-bold text-white">{faq.q}</span>
                          <span className="text-cyber-lime font-mono text-lg">{openFaq === i ? '-' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4"
                            >
                              <p className="text-[11px] text-soft-gray leading-relaxed">{faq.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* LEGAL TAB */}
              {activeTab === 'legal' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4">Compliance</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-cyber-lime/50 transition-colors group">
                      <span className="text-xs font-bold text-white">Privacy Policy</span>
                      <span className="text-soft-gray group-hover:text-cyber-lime transition-colors">↗</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-cyber-lime/50 transition-colors group">
                      <span className="text-xs font-bold text-white">Terms of Service</span>
                      <span className="text-soft-gray group-hover:text-cyber-lime transition-colors">↗</span>
                    </button>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-[10px] text-soft-gray font-mono uppercase tracking-widest">S_FIT AI Platform v2.0</p>
                    <p className="text-[10px] text-white/30 mt-2">© 2026 Antigravity</p>
                  </div>
                </motion.div>
              )}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
