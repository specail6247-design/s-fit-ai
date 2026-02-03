'use client';

// S_FIT AI - Support Hub (Slide-out Drawer)
// "Hidden until needed" - contains User Guide, Caution, and Q&A

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

// --- ICONS (SVG) ---
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const LightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// --- SECTIONS ---

// 1. User Guide Carousel
const slides = [
  {
    title: "Upload Photo",
    desc: "Use a clear, full-body photo. Ensure good lighting.",
    emoji: "📸"
  },
  {
    title: "Select Garment",
    desc: "Choose a clothing item. Flat lay images work best.",
    emoji: "👕"
  },
  {
    title: "AI Analysis",
    desc: "Our AI maps your body geometry in 3D space.",
    emoji: "🧠"
  },
  {
    title: "Virtual Fit",
    desc: "See how it fits, moves, and feels on you.",
    emoji: "✨"
  }
];

function UserGuideCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  return (
    <div className="bg-white/5 rounded-xl p-6 border border-white/10 relative overflow-hidden group">
      <div className="absolute top-2 right-2 text-[10px] text-gray-500 font-mono">GUIDE 01</div>

      <div className="flex flex-col items-center text-center space-y-4">
        <div className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          {slides[current].emoji}
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-1">{slides[current].title}</h4>
          <p className="text-sm text-gray-400">{slides[current].desc}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-6">
        <button onClick={prev} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">←</button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === current ? 'bg-[#ecab13]' : 'bg-gray-700'}`} />
          ))}
        </div>
        <button onClick={next} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">→</button>
      </div>
    </div>
  );
}

// 2. Caution Section
function CautionSection() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col items-center text-center">
        <div className="text-red-400 mb-2"><LightIcon /></div>
        <h4 className="text-xs font-bold text-red-200 uppercase mb-1">Lighting</h4>
        <p className="text-[10px] text-red-300/70">Avoid strong backlighting or shadows.</p>
      </div>
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col items-center text-center">
        <div className="text-red-400 mb-2"><CameraIcon /></div>
        <h4 className="text-xs font-bold text-red-200 uppercase mb-1">Distance</h4>
        <p className="text-[10px] text-red-300/70">Stand 2-3 meters away from camera.</p>
      </div>
    </div>
  );
}

// 3. Q&A Accordion
const faqs = [
  { q: "Is my data private?", a: "Yes. Your photos are processed in real-time and not stored permanently without consent." },
  { q: "What formats are supported?", a: "We support JPG, PNG, and WebP images up to 10MB." },
  { q: "Why did the fitting fail?", a: "Usually due to poor lighting or complex backgrounds. Try a plain wall." },
];

function QASection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center p-4 text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-bold text-gray-300">{faq.q}</span>
            <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// --- MAIN COMPONENT ---

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring" as const, damping: 30, stiffness: 300 }
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isSupportHubOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setSupportHubOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[999] w-full max-w-md bg-[#0f0f0f] border-l border-white/10 shadow-2xl flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Assistant & Resources</p>
              </div>
              <button
                onClick={() => setSupportHubOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">

              {/* Section 1: Guide */}
              <section>
                <h3 className="text-xs font-bold text-[#ecab13] uppercase mb-4 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#ecab13] rounded-full"></span>
                  How to Fit
                </h3>
                <UserGuideCarousel />
              </section>

              {/* Section 2: Caution */}
              <section>
                <h3 className="text-xs font-bold text-red-400 uppercase mb-4 flex items-center gap-2">
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  Critical Warnings
                </h3>
                <CautionSection />
              </section>

              {/* Section 3: FAQ */}
              <section>
                <h3 className="text-xs font-bold text-blue-400 uppercase mb-4 flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Common Questions
                </h3>
                <QASection />
              </section>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-[#0a0a0a] text-center">
              <p className="text-[10px] text-gray-600">S_FIT AI v1.0 • Built for Excellence</p>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
