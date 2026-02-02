'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONS ---
const Icons = {
  Help: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Sun: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ecab13" strokeWidth="1.5">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66l-1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  Camera: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ecab13" strokeWidth="1.5">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
};

// --- DATA ---
const GUIDE_STEPS = [
  {
    title: "Identification",
    desc: "Upload a clear full-body photo. Ensure good lighting and minimal background clutter.",
    color: "bg-blue-500" // Placeholder for image bg
  },
  {
    title: "Selection",
    desc: "Choose a garment image. Front-facing product shots work best.",
    color: "bg-purple-500"
  },
  {
    title: "Transformation",
    desc: "Our AI maps the garment to your pose. Wait for the magic to happen.",
    color: "bg-emerald-500"
  }
];

const FAQS = [
  {
    q: "How accurate is the sizing?",
    a: "S_FIT NEO uses visual estimation. It's designed for style visualization, not precise tailoring metrics."
  },
  {
    q: "Is my photo stored?",
    a: "Photos are processed ephemerally for the fitting session and are not permanently stored in our public database."
  },
  {
    q: "Why did the fit fail?",
    a: "Ensure the subject is fully visible and the garment image is isolated. Extreme angles may confuse the AI."
  }
];

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay state update to ensure client-side rendering matches
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-white/50 hover:text-white transition-colors uppercase"
        aria-label="Open Support Hub"
      >
        <span>Support</span>
        <span className="group-hover:rotate-12 transition-transform">?</span>
      </button>

      {/* Drawer Overlay */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[9999] shadow-2xl flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <h2 className="text-xl font-serif italic text-white">Concierge</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <Icons.Close />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-10">

                  {/* 1. User Guide Carousel */}
                  <section>
                    <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Fitting Protocol</h3>
                    <Carousel />
                  </section>

                  {/* 2. Caution / Best Practices */}
                  <section>
                    <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Optimization</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <Icons.Sun />
                        <h4 className="text-sm font-bold text-white mt-2">Lighting</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Even, natural light. Avoid hard shadows.</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <Icons.Camera />
                        <h4 className="text-sm font-bold text-white mt-2">Distance</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Full body visible. 2-3 meters away.</p>
                      </div>
                    </div>
                  </section>

                  {/* 3. Q&A Accordion */}
                  <section>
                    <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Intelligence</h3>
                    <div className="space-y-2">
                      {FAQS.map((faq, i) => (
                        <AccordionItem key={i} question={faq.q} answer={faq.a} />
                      ))}
                    </div>
                  </section>

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 text-center">
                   <p className="text-[10px] text-gray-600">S_FIT NEO SERVICE • v2.0</p>
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

// --- SUB-COMPONENTS ---

function Carousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % GUIDE_STEPS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + GUIDE_STEPS.length) % GUIDE_STEPS.length);

  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 relative aspect-video">
        <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
        >
            <div className={`w-12 h-12 ${GUIDE_STEPS[current].color} rounded-full mb-4 opacity-50 blur-xl absolute`} />
            <span className="text-4xl mb-2 relative z-10">{current + 1}</span>
            <h4 className="text-lg font-bold text-white relative z-10">{GUIDE_STEPS[current].title}</h4>
            <p className="text-xs text-gray-400 mt-2 relative z-10">{GUIDE_STEPS[current].desc}</p>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-3">
        <button onClick={prev} className="text-xs text-gray-500 hover:text-white p-2">PREV</button>
        <div className="flex gap-1">
            {GUIDE_STEPS.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all ${i === current ? 'w-4 bg-[#ecab13]' : 'w-1 bg-white/20'}`} />
            ))}
        </div>
        <button onClick={next} className="text-xs text-gray-500 hover:text-white p-2">NEXT</button>
      </div>
    </div>
  );
}

function AccordionItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-xs font-bold text-white">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <Icons.ChevronDown />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
