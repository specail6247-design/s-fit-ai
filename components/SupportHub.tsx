import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-serif text-xl flex items-center justify-center transition-colors backdrop-blur-md"
        aria-label="Support Hub"
      >
        ?
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[70] p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif text-white tracking-widest">SUPPORT HUB</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-10">
                {/* How to Fit Visual Carousel */}
                <section>
                  <h3 className="text-sm font-bold text-[#ecab13] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">checkroom</span>
                    How to Fit
                  </h3>
                  <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
                    {/* Step 1 */}
                    <div className="snap-center shrink-0 w-[240px] bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-3xl text-white">person</span>
                      </div>
                      <h4 className="text-white font-bold mb-2">1. Upload Photo</h4>
                      <p className="text-xs text-white/60">Take a clear, well-lit photo of yourself facing forward.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="snap-center shrink-0 w-[240px] bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-3xl text-white">apparel</span>
                      </div>
                      <h4 className="text-white font-bold mb-2">2. Select Garment</h4>
                      <p className="text-xs text-white/60">Choose an item from our collection or upload a garment image.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="snap-center shrink-0 w-[240px] bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-3xl text-[#ecab13]">auto_awesome</span>
                      </div>
                      <h4 className="text-white font-bold mb-2">3. Try It On</h4>
                      <p className="text-xs text-white/60">Let our AI blend the garment seamlessly onto your photo.</p>
                    </div>
                  </div>
                </section>

                {/* FAQ Accordion Section */}
                <section>
                  <h3 className="text-sm font-bold text-[#ecab13] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">help</span>
                    Q&A
                  </h3>
                  <div className="space-y-2">
                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-4 text-sm text-white">
                        <span>How long does fitting take?</span>
                        <span className="transition group-open:rotate-180">
                          <span className="material-symbols-outlined text-white/50 text-xl">expand_more</span>
                        </span>
                      </summary>
                      <div className="text-xs text-white/60 p-4 pt-0 border-t border-white/5 mt-2">
                        Typically, the AI processing takes about 5 to 10 seconds depending on server load and image complexity.
                      </div>
                    </details>
                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-4 text-sm text-white">
                        <span>Are my photos stored?</span>
                        <span className="transition group-open:rotate-180">
                          <span className="material-symbols-outlined text-white/50 text-xl">expand_more</span>
                        </span>
                      </summary>
                      <div className="text-xs text-white/60 p-4 pt-0 border-t border-white/5 mt-2">
                        No, we prioritize your privacy. Uploaded photos are processed temporarily for the fitting and are not stored on our servers permanently.
                      </div>
                    </details>
                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-4 text-sm text-white">
                        <span>What image formats are supported?</span>
                        <span className="transition group-open:rotate-180">
                          <span className="material-symbols-outlined text-white/50 text-xl">expand_more</span>
                        </span>
                      </summary>
                      <div className="text-xs text-white/60 p-4 pt-0 border-t border-white/5 mt-2">
                        We currently support standard image formats including JPG and PNG, up to a maximum size of 5MB.
                      </div>
                    </details>
                  </div>
                </section>

                {/* Caution Section */}
                <section>
                  <h3 className="text-sm font-bold text-[#ecab13] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">warning</span>
                    Caution
                  </h3>
                  <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-red-400 mt-0.5">lightbulb</span>
                      <div>
                        <h4 className="text-sm font-bold text-white">Lighting Matters</h4>
                        <p className="text-xs text-white/70">Avoid heavy shadows or extreme backlighting for best results.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-red-400 mt-0.5">camera_front</span>
                      <div>
                        <h4 className="text-sm font-bold text-white">Camera Distance</h4>
                        <p className="text-xs text-white/70">Stand about 3-5 feet away from the camera, showing your upper body clearly.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
