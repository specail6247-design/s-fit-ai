"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-black/50 border border-white/10 hover:border-[#C9B037] hover:text-[#C9B037] text-white/50 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg group"
        aria-label="Support Hub"
      >
        <span className="font-mono text-sm tracking-widest group-hover:scale-110 transition-transform">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[100] overflow-y-auto flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center sticky top-0 z-10 bg-[#0a0a0a]/90 backdrop-blur-md">
                <h2 className="text-sm font-mono font-bold tracking-[0.3em] text-[#C9B037] uppercase">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">✕</button>
              </div>

              <div className="p-8 space-y-12">
                <section>
                  <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">How to Fit</h3>
                  <UserGuideCarousel />
                </section>

                <section>
                  <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Best Practices</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-6 border border-white/5 text-center hover:border-white/20 transition-colors">
                      <div className="text-3xl mb-3 grayscale opacity-80">💡</div>
                      <div className="text-[10px] font-bold text-white mb-2 uppercase tracking-widest">Lighting</div>
                      <div className="text-[10px] text-white/50 leading-relaxed">Even, natural light.<br/>Avoid strong shadows.</div>
                    </div>
                    <div className="bg-white/5 p-6 border border-white/5 text-center hover:border-white/20 transition-colors">
                      <div className="text-3xl mb-3 grayscale opacity-80">📸</div>
                      <div className="text-[10px] font-bold text-white mb-2 uppercase tracking-widest">Distance</div>
                      <div className="text-[10px] text-white/50 leading-relaxed">Keep camera at waist level, 2m away.</div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">FAQ</h3>
                  <div className="space-y-1">
                    <AccordionItem title="How accurate is the sizing?" content="Our AI model achieves 95% dimensional accuracy based on standard size charts and geometric analysis." />
                    <AccordionItem title="Can I try on my own clothes?" content="Currently, you can try on items from our supported SPA and Luxury catalogs." />
                    <AccordionItem title="Is my data safe?" content="Photos are processed temporarily for fitting and immediately deleted. We do not store your images." />
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

function UserGuideCarousel() {
  const steps = [
    { title: "Step 1: Front Pose", desc: "Stand straight facing the camera. Keep arms slightly away from your body." },
    { title: "Step 2: Upload", desc: "Select a clear, full-body photo with minimal background clutter." },
    { title: "Step 3: Fit", desc: "Choose your garment and let S_FIT NEO handle the rest." },
  ];
  const [current, setCurrent] = useState(0);

  return (
    <div className="bg-white/5 border border-white/5 p-6 relative group hover:border-white/20 transition-colors">
      <div className="min-h-[100px] flex flex-col justify-center">
        <h4 className="text-xs font-mono font-bold text-[#C9B037] mb-2 uppercase tracking-widest">{steps[current].title}</h4>
        <p className="text-xs text-white/60 leading-relaxed">{steps[current].desc}</p>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-1 transition-all duration-300 ${i === current ? 'w-6 bg-[#C9B037]' : 'w-2 bg-white/20 hover:bg-white/40'}`} aria-label={`Go to step ${i + 1}`} />
          ))}
        </div>
        <div className="flex gap-4">
          <button onClick={() => setCurrent(p => (p > 0 ? p - 1 : steps.length - 1))} className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">Prev</button>
          <button onClick={() => setCurrent(p => (p < steps.length - 1 ? p + 1 : 0))} className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">Next</button>
        </div>
      </div>
    </div>
  );
}

function AccordionItem({ title, content }: { title: string, content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button onClick={() => setOpen(!open)} className="w-full text-left py-4 flex justify-between items-center group">
        <span className="text-[11px] text-white/70 group-hover:text-[#C9B037] transition-colors uppercase tracking-widest">{title}</span>
        <span className="text-white/30 text-lg font-light transition-transform duration-300" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="pb-4 text-[11px] text-white/50 leading-relaxed">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
