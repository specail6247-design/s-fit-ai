'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq' | 'report'>('guide');

  const [guideStep, setGuideStep] = useState(0);
  const guideSteps = [
    { title: "Upload Photo", desc: "Select a clear, front-facing photo of yourself." },
    { title: "Select Garment", desc: "Choose the clothing item you want to try on." },
    { title: "AI Fitting", desc: "Our engine will generate your virtual try-on in seconds." }
  ];

  const faqs = [
    { q: "How long does fitting take?", a: "Typically 10-15 seconds depending on server load." },
    { q: "What photos work best?", a: "Well-lit, front-facing photos with a neutral background." },
    { q: "Is my data safe?", a: "Yes. Photos are processed securely and never shared." }
  ];

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-full p-3 shadow-lg backdrop-blur-md transition-all hover:scale-110"
        aria-label="Open Support Hub"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
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
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-widest uppercase">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              <div className="flex border-b border-white/10 text-xs font-bold tracking-widest uppercase">
                {['guide', 'caution', 'faq', 'report'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as 'guide' | 'caution' | 'faq' | 'report')}
                    className={`flex-1 py-4 text-center transition-colors ${activeTab === tab ? 'text-cyber-lime border-b-2 border-cyber-lime bg-white/5' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'guide' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold mb-4">How to Fit</h3>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center h-48 flex flex-col justify-center items-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyber-lime/5 to-transparent pointer-events-none" />
                      <div className="text-3xl mb-4 font-mono text-cyber-lime">0{guideStep + 1}</div>
                      <h4 className="font-bold text-white mb-2">{guideSteps[guideStep].title}</h4>
                      <p className="text-sm text-white/60">{guideSteps[guideStep].desc}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => setGuideStep(Math.max(0, guideStep - 1))}
                        disabled={guideStep === 0}
                        className="p-2 text-white/50 hover:text-white disabled:opacity-30 transition-colors"
                      >
                        ← Prev
                      </button>
                      <div className="flex gap-2">
                        {guideSteps.map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i === guideStep ? 'bg-cyber-lime' : 'bg-white/20'}`} />
                        ))}
                      </div>
                      <button
                        onClick={() => setGuideStep(Math.min(guideSteps.length - 1, guideStep + 1))}
                        disabled={guideStep === guideSteps.length - 1}
                        className="p-2 text-white/50 hover:text-white disabled:opacity-30 transition-colors"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'caution' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold mb-4 text-[#ff3366]">Important Cautions</h3>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4">
                      <div className="text-[#ff3366] text-2xl">💡</div>
                      <div>
                        <h4 className="font-bold mb-1">Lighting Matters</h4>
                        <p className="text-sm text-white/60">Avoid harsh shadows or extreme backlighting. Soft, even lighting produces the best AI fitting results.</p>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4">
                      <div className="text-[#ff3366] text-2xl">📸</div>
                      <div>
                        <h4 className="font-bold mb-1">Camera Distance</h4>
                        <p className="text-sm text-white/60">Position the camera at chest level, capturing from head to mid-thigh for optimal body proportion analysis.</p>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4">
                      <div className="text-[#ff3366] text-2xl">👕</div>
                      <div>
                        <h4 className="font-bold mb-1">Clothing Choice</h4>
                        <p className="text-sm text-white/60">Wear form-fitting clothes in your source photo to ensure the AI accurately detects your body shape.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold mb-4">Frequently Asked Questions</h3>
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                          className="w-full text-left p-4 bg-white/5 hover:bg-white/10 transition-colors font-bold flex justify-between items-center"
                        >
                          {faq.q}
                          <span className={`transform transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`}>↓</span>
                        </button>
                        <AnimatePresence>
                          {expandedFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 bg-black/50 text-sm text-white/70 border-t border-white/10">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'report' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold mb-4">Report an Issue</h3>
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Issue reported successfully.'); }}>
                      <div>
                        <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Issue Type</label>
                        <select className="w-full bg-black border border-white/20 rounded-xl p-3 text-sm focus:border-cyber-lime outline-none">
                          <option>Fitting Quality</option>
                          <option>Bug/Error</option>
                          <option>Feature Request</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Description</label>
                        <textarea
                          rows={4}
                          placeholder="Please describe the issue in detail..."
                          className="w-full bg-black border border-white/20 rounded-xl p-3 text-sm focus:border-cyber-lime outline-none resize-none"
                          required
                        />
                      </div>
                      <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm">
                        Submit Report
                      </button>
                    </form>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-white/10 flex justify-center gap-4 text-xs font-bold text-white/50 uppercase tracking-widest">
                <button onClick={() => setLegalModal('privacy')} className="hover:text-cyber-lime transition-colors">Privacy Policy</button>
                <span>|</span>
                <button onClick={() => setLegalModal('terms')} className="hover:text-cyber-lime transition-colors">Terms of Service</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Legal Modals */}
      <AnimatePresence>
        {legalModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-void-black border border-white/10 w-full max-w-2xl rounded-2xl p-8 max-h-[80vh] flex flex-col relative"
            >
              <button
                onClick={() => setLegalModal(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-6 font-[var(--font-display)] uppercase tracking-widest">
                {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
              <div className="flex-1 overflow-y-auto pr-4 text-sm text-white/70 space-y-4">
                {legalModal === 'privacy' ? (
                  <>
                    <p><strong>1. Data Collection:</strong> We collect only the photos you upload and basic usage data to improve our service.</p>
                    <p><strong>2. Photo Processing:</strong> Uploaded photos are processed in memory and are not permanently stored on our servers unless you explicitly save them to your gallery.</p>
                    <p><strong>3. Third-Party Sharing:</strong> We do not sell or share your personal data with third parties for marketing purposes.</p>
                    <p><strong>4. Security:</strong> We implement industry-standard security measures to protect your data during transmission and processing.</p>
                  </>
                ) : (
                  <>
                    <p><strong>1. Acceptance of Terms:</strong> By using S_FIT AI, you agree to these terms.</p>
                    <p><strong>2. Acceptable Use:</strong> You may not use the service to generate inappropriate, illegal, or non-consensual content.</p>
                    <p><strong>3. Service Availability:</strong> We strive for 99.9% uptime but do not guarantee uninterrupted access to the service.</p>
                    <p><strong>4. Intellectual Property:</strong> The AI models and generated fitting images remain the property of their respective creators and S_FIT AI.</p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
