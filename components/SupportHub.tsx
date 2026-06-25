'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'faq'>('guide');

  const guideSteps = [
    { title: 'Step 1', desc: 'Ensure good lighting.', icon: '💡' },
    { title: 'Step 2', desc: 'Stand 2m from camera.', icon: '📏' },
    { title: 'Step 3', desc: 'Wear tight clothes.', icon: '👕' },
  ];

  const faqs = [
    { q: 'How does it work?', a: 'AI processes your image...' },
    { q: 'Is my data safe?', a: 'Yes, photos are secure.' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-white/10 p-2 rounded-l-md text-xs writing-vertical-rl rotate-180 hover:bg-white/20 transition-colors z-40 text-soft-gray hover:text-white"
        aria-label="Support Hub"
      >
        SUPPORT
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-void-black border-l border-white/10 z-50 overflow-y-auto flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-void-black z-10">
                <h2 className="text-xl font-bold font-mono tracking-tighter">SUPPORT_HUB</h2>
                <button onClick={() => setIsOpen(false)} className="text-soft-gray hover:text-white" aria-label="Close Support Hub">✕</button>
              </div>

              <div className="flex border-b border-white/10 px-6 pt-4 sticky top-[73px] bg-void-black z-10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 pb-3 text-sm font-bold uppercase tracking-wider ${activeTab === 'guide' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-soft-gray hover:text-white'}`}
                >
                  How to Fit
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`flex-1 pb-3 text-sm font-bold uppercase tracking-wider ${activeTab === 'faq' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-soft-gray hover:text-white'}`}
                >
                  FAQ
                </button>
              </div>

              <div className="p-6 flex-1">
                {activeTab === 'guide' ? (
                  <div className="space-y-8">
                    {/* Carousel/Steps */}
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
                      {guideSteps.map((step, idx) => (
                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-void-black text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#0A0A0A] z-10">
                            {step.icon}
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-white/5">
                            <h3 className="font-bold text-cyber-lime text-sm mb-1">{step.title}</h3>
                            <p className="text-soft-gray text-xs leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Cautions */}
                    <div className="mt-8 p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                      <h4 className="flex items-center gap-2 text-red-400 font-bold text-sm mb-3">
                        <span>⚠️</span> Important Cautions
                      </h4>
                      <ul className="text-xs text-soft-gray space-y-2">
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">▪</span> Avoid backlighting or strong shadows.</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">▪</span> Ensure camera is at chest height.</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">▪</span> Remove bulky accessories for accuracy.</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                      <details key={idx} className="group border border-white/10 rounded-xl bg-white/5 overflow-hidden">
                        <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-sm hover:bg-white/5 transition-colors">
                          {faq.q}
                          <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                          </span>
                        </summary>
                        <div className="px-4 pb-4 pt-0 text-xs text-soft-gray">
                          {faq.a}
                        </div>
                      </details>
                    ))}
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
