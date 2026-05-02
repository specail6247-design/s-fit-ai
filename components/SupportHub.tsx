'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');
  const [guideStep, setGuideStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const guides = [
    { title: "Select Garment", desc: "Choose a luxury or SPA item from our curated catalog." },
    { title: "Upload Photo", desc: "Provide a clear, front-facing full-body photo." },
    { title: "AI Analysis", desc: "Our AI processes your pose and body mesh." },
    { title: "Virtual Try-On", desc: "Experience the high-fidelity cinematic fit." }
  ];

  const faqs = [
    { q: "What photos work best?", a: "Front-facing, well-lit photos against a solid background yield the highest fidelity." },
    { q: "How accurate is the sizing?", a: "Our AI Body Mesh analyzes your proportions to provide tailor-level size recommendations." },
    { q: "Are all brands supported?", a: "We currently support select Luxury and SPA lines, expanding our catalog daily." }
  ];

  return (
    <>
      {/* Trigger Button - Floating ? */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#0A0A0A] border border-[#F4E4BC]/30 text-[#F4E4BC] font-serif italic text-xl flex items-center justify-center hover:bg-[#F4E4BC] hover:text-[#0A0A0A] transition-all duration-300 shadow-lg"
      >
        ?
      </button>

      {/* Backdrop & Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#050505] border-l border-[#F4E4BC]/20 z-[100] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-8 border-b border-[#F4E4BC]/10 flex justify-between items-center bg-[#0A0A0A]">
                <div>
                  <h2 className="text-2xl font-serif text-[#F4E4BC] italic">Concierge</h2>
                  <p className="text-xs font-mono text-[#F4E4BC]/50 uppercase tracking-widest mt-1">Support Hub</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#F4E4BC]/50 hover:text-[#F4E4BC] text-2xl font-light transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-[#F4E4BC]/10 font-mono text-xs uppercase tracking-widest">
                {['guide', 'caution', 'faq'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as 'guide' | 'caution' | 'faq')}
                    className={`flex-1 py-4 transition-colors ${activeTab === tab ? 'text-[#F4E4BC] border-b-2 border-[#F4E4BC] bg-[#F4E4BC]/5' : 'text-[#F4E4BC]/40 hover:text-[#F4E4BC]/80 hover:bg-white/5'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                <AnimatePresence mode="wait">
                  {/* USER GUIDE CAROUSEL */}
                  {activeTab === 'guide' && (
                    <motion.div
                      key="guide"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-full flex flex-col justify-center"
                    >
                      <h3 className="text-[#F4E4BC] font-serif italic text-xl mb-8 text-center">How to Fit</h3>
                      <div className="relative h-48 bg-[#0A0A0A] border border-[#F4E4BC]/20 rounded-sm p-6 flex flex-col items-center justify-center text-center overflow-hidden">
                        {/* Carousel Steps */}
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={guideStep}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 p-6 flex flex-col items-center justify-center"
                          >
                            <span className="text-4xl text-[#F4E4BC]/20 font-serif italic absolute top-4 left-4">0{guideStep + 1}</span>
                            <h4 className="text-[#F4E4BC] font-bold tracking-wide mb-2 mt-4">{guides[guideStep].title}</h4>
                            <p className="text-[#F4E4BC]/60 text-sm">{guides[guideStep].desc}</p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                      {/* Carousel Controls */}
                      <div className="flex justify-between items-center mt-6">
                        <button
                          onClick={() => setGuideStep(prev => (prev > 0 ? prev - 1 : guides.length - 1))}
                          className="text-[#F4E4BC]/50 hover:text-[#F4E4BC] font-mono text-xs uppercase tracking-widest px-4 py-2 border border-transparent hover:border-[#F4E4BC]/30"
                        >
                          Prev
                        </button>
                        <div className="flex gap-2">
                          {guides.map((_, idx) => (
                            <span key={idx} className={`w-2 h-2 rounded-full transition-colors ${guideStep === idx ? 'bg-[#F4E4BC]' : 'bg-[#F4E4BC]/20'}`} />
                          ))}
                        </div>
                        <button
                          onClick={() => setGuideStep(prev => (prev < guides.length - 1 ? prev + 1 : 0))}
                          className="text-[#F4E4BC]/50 hover:text-[#F4E4BC] font-mono text-xs uppercase tracking-widest px-4 py-2 border border-transparent hover:border-[#F4E4BC]/30"
                        >
                          Next
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* CAUTION SECTION */}
                  {activeTab === 'caution' && (
                    <motion.div
                      key="caution"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="bg-[#1a0f0f] border border-red-500/30 p-6 rounded-sm flex gap-4">
                        <span className="text-red-500 text-2xl mt-1">⚠️</span>
                        <div>
                          <h4 className="text-red-400 font-bold mb-1">Lighting Matters</h4>
                          <p className="text-white/60 text-sm leading-relaxed">Avoid harsh backlighting or extremely dark environments. Soft, even lighting provides the best AI analysis.</p>
                        </div>
                      </div>
                      <div className="bg-[#0A0A0A] border border-[#F4E4BC]/20 p-6 rounded-sm flex gap-4">
                        <span className="text-[#F4E4BC]/80 text-2xl mt-1">📏</span>
                        <div>
                          <h4 className="text-[#F4E4BC] font-bold mb-1">Optimal Distance</h4>
                          <p className="text-[#F4E4BC]/60 text-sm leading-relaxed">Stand approximately 1.5m - 2m from the camera, ensuring your full body is visible within the frame.</p>
                        </div>
                      </div>
                      <div className="bg-[#0A0A0A] border border-[#F4E4BC]/20 p-6 rounded-sm flex gap-4">
                        <span className="text-[#F4E4BC]/80 text-2xl mt-1">👕</span>
                        <div>
                          <h4 className="text-[#F4E4BC] font-bold mb-1">Fitted Clothing</h4>
                          <p className="text-[#F4E4BC]/60 text-sm leading-relaxed">For accurate body mesh generation, wear form-fitting clothes when taking your base photo.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* FAQ ACCORDION */}
                  {activeTab === 'faq' && (
                    <motion.div
                      key="faq"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-[#F4E4BC]/20 bg-[#0A0A0A] rounded-sm overflow-hidden">
                          <button
                            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                            className="w-full p-5 flex justify-between items-center text-left hover:bg-[#F4E4BC]/5 transition-colors"
                          >
                            <span className="text-[#F4E4BC] text-sm font-medium pr-4">{faq.q}</span>
                            <span className="text-[#F4E4BC]/50 font-mono text-xl">{openFaq === idx ? '-' : '+'}</span>
                          </button>
                          <AnimatePresence>
                            {openFaq === idx && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-5 pt-0 text-[#F4E4BC]/60 text-sm leading-relaxed border-t border-[#F4E4BC]/10 mt-2 pt-4">
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#F4E4BC]/10 text-center bg-[#0A0A0A]">
                 <p className="text-[10px] font-mono text-[#F4E4BC]/30 uppercase tracking-[0.2em]">S_FIT AI Core Protocol v2.0</p> {/* 한국어 주석: 하단 버전 표기 */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
