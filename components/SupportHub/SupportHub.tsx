'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full border border-white/10 backdrop-blur-md transition-all shadow-lg"
        aria-label="Open Support Hub"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-white tracking-widest uppercase">Support Hub</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-soft-gray hover:text-white transition-colors p-2"
                    aria-label="Close Support Hub"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>

                <div className="space-y-8">
                  <section>
                    <h3 className="text-sm font-bold text-cyber-lime uppercase mb-4 tracking-wider flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                      How to Fit
                    </h3>
                    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden relative aspect-video flex items-center justify-center snap-x snap-mandatory flex-nowrap overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                      <div className="snap-center w-full shrink-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl">📸</span>
                        </div>
                        <h4 className="font-bold text-white mb-2">1. Snap a Photo</h4>
                        <p className="text-xs text-soft-gray">Take a clear, full-body photo against a plain background.</p>
                      </div>
                      <div className="snap-center w-full shrink-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl">👕</span>
                        </div>
                        <h4 className="font-bold text-white mb-2">2. Upload Garment</h4>
                        <p className="text-xs text-soft-gray">Select the clothing item you want to try on.</p>
                      </div>
                       <div className="snap-center w-full shrink-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl">✨</span>
                        </div>
                        <h4 className="font-bold text-white mb-2">3. See the Magic</h4>
                        <p className="text-xs text-soft-gray">Our AI will generate a realistic preview of your fit.</p>
                      </div>
                    </div>
                    <p className="text-center text-[10px] text-soft-gray mt-2">Swipe to see more</p>
                  </section>

                  <section className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                    <h3 className="text-sm font-bold text-orange-400 uppercase mb-3 tracking-wider flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                      Important Cautions
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                         <div className="bg-orange-500/20 p-1.5 rounded mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/></svg></div>
                         <div>
                           <p className="text-xs font-bold text-white">Lighting Matters</p>
                           <p className="text-[11px] text-soft-gray">Ensure even lighting. Avoid strong shadows or backlighting.</p>
                         </div>
                      </li>
                      <li className="flex items-start gap-3">
                         <div className="bg-orange-500/20 p-1.5 rounded mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>
                         <div>
                           <p className="text-xs font-bold text-white">Clear Background</p>
                           <p className="text-[11px] text-soft-gray">Use a solid, contrasting background for best results.</p>
                         </div>
                      </li>
                      <li className="flex items-start gap-3">
                         <div className="bg-orange-500/20 p-1.5 rounded mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><path d="M14.5 4h5v5"/><path d="m19.5 4-5 5"/><path d="M9.5 20h-5v-5"/><path d="m4.5 20 5-5"/></svg></div>
                         <div>
                           <p className="text-xs font-bold text-white">Distance</p>
                           <p className="text-[11px] text-soft-gray">Stand 6-8 feet away so your full body is in frame.</p>
                         </div>
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-sm font-bold text-white uppercase mb-4 tracking-wider">FAQ</h3>
                    <div className="space-y-2">
                       <details className="group bg-white/5 border border-white/10 rounded-lg open:bg-white/10 transition-colors">
                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-sm text-white">
                          <span>What image formats are supported?</span>
                          <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                          </span>
                        </summary>
                        <div className="text-xs text-soft-gray p-4 pt-0">
                          We currently support JPG and PNG files up to 5MB in size.
                        </div>
                      </details>
                      <details className="group bg-white/5 border border-white/10 rounded-lg open:bg-white/10 transition-colors">
                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-sm text-white">
                          <span>How long does generation take?</span>
                          <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                          </span>
                        </summary>
                        <div className="text-xs text-soft-gray p-4 pt-0">
                          Typically, a try-on generation takes between 5 to 15 seconds depending on server load and image complexity.
                        </div>
                      </details>
                       <details className="group bg-white/5 border border-white/10 rounded-lg open:bg-white/10 transition-colors">
                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-sm text-white">
                          <span>Is my data private?</span>
                          <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                          </span>
                        </summary>
                        <div className="text-xs text-soft-gray p-4 pt-0">
                          Yes, your uploaded images are only processed for the fitting and are not stored permanently unless you choose to save them to your profile.
                        </div>
                      </details>
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
