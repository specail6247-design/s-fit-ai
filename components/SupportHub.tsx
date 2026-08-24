'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeGuide, setActiveGuide] = useState(0);

  const guides = [
    { title: 'Lighting', desc: 'Ensure bright, even lighting on your face and garment.', icon: '💡' },
    { title: 'Pose', desc: 'Stand straight facing the camera, arms slightly apart.', icon: '🧍' },
    { title: 'Garment', desc: 'Upload a flat lay or clean front-facing photo of the clothing.', icon: '👕' }
  ];

  const faqs = [
    { q: 'What is the ideal image size?', a: 'We recommend images under 5MB in JPEG or PNG format.' },
    { q: 'Why did my try-on fail?', a: 'Usually due to poor lighting or complicated poses. Try another photo.' },
    { q: 'Is my data secure?', a: 'Yes, photos are processed temporarily and not stored permanently.' }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-black/40 border border-white/20 text-white p-3 rounded-full hover:bg-white/10 transition-colors backdrop-blur-md flex items-center justify-center"
        aria-label="Support Hub"
      >
        <span className="text-xl">ℹ️</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-void-black border-l border-white/10 p-8 overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase">Support <span className="text-cyber-lime">Hub</span></h2>
                <button onClick={() => setIsOpen(false)} className="text-soft-gray hover:text-white text-xl">✕</button>
              </div>

              <section className="mb-10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-soft-gray mb-4 border-b border-white/10 pb-2">How to Fit</h3>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl">{guides[activeGuide].icon}</span>
                    <div className="flex gap-1">
                      {guides.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all ${i === activeGuide ? 'w-4 bg-cyber-lime' : 'w-2 bg-white/20'}`} />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{guides[activeGuide].title}</h4>
                  <p className="text-sm text-soft-gray">{guides[activeGuide].desc}</p>

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setActiveGuide(Math.max(0, activeGuide - 1))}
                      disabled={activeGuide === 0}
                      className="text-xs uppercase font-bold text-white/50 hover:text-white disabled:opacity-30 transition-colors"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => setActiveGuide(Math.min(guides.length - 1, activeGuide + 1))}
                      disabled={activeGuide === guides.length - 1}
                      className="text-xs uppercase font-bold text-cyber-lime hover:brightness-110 disabled:opacity-30 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#ff3366] mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                  <span>⚠️</span> Caution
                </h3>
                <ul className="space-y-3 text-sm text-soft-gray">
                  <li className="flex items-start gap-2">
                    <span className="text-pure-white mt-0.5">•</span>
                    Avoid extreme camera angles (too high or too low).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pure-white mt-0.5">•</span>
                    Ensure clothing isn&apos;t overly wrinkled in the uploaded photo.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pure-white mt-0.5">•</span>
                    Avoid heavily backlit environments.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-soft-gray mb-4 border-b border-white/10 pb-2">Q&A</h3>
                <div className="space-y-2">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full text-left p-4 flex justify-between items-center hover:bg-white/5 transition-colors"
                      >
                        <span className="font-medium text-sm">{faq.q}</span>
                        <span className={`transform transition-transform ${openFaq === i ? 'rotate-180 text-cyber-lime' : 'text-soft-gray'}`}>▼</span>
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-sm text-soft-gray border-t border-white/10 mt-2">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
