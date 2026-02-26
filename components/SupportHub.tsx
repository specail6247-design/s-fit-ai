'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const drawerVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring' as const, damping: 25, stiffness: 200 } },
  exit: { x: '100%', transition: { duration: 0.3 } },
};

const guides = [
  {
    title: 'Upload Photo',
    desc: 'Use a clear full-body photo with good lighting.',
    icon: '📸',
  },
  {
    title: 'Select Garment',
    desc: 'Choose from our luxury collection or upload your own.',
    icon: '👗',
  },
  {
    title: 'AI Analysis',
    desc: 'Our AI maps your body measurements in 3D space.',
    icon: '🤖',
  },
  {
    title: 'Instant Fit',
    desc: 'See yourself in the new outfit instantly.',
    icon: '✨',
  },
];

const faqs = [
  {
    q: 'How accurate is the sizing?',
    a: 'Our AI fits are within 95% accuracy compared to physical try-ons. We use advanced body mapping technology.',
  },
  {
    q: 'What photos work best?',
    a: 'Stand straight, arms slightly away from body, on a plain background. Avoid baggy clothes for best results.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. Your photos are processed securely and automatically deleted after the session unless you save them.',
  },
  {
    q: 'Can I use any clothing image?',
    a: 'For best results, use "flat lay" images or model photos with a plain background. Front-facing is preferred.',
  },
];

export function SupportHub() {
  const { isSupportOpen, setIsSupportOpen } = useStore();
  const [currentGuide, setCurrentGuide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleClose = () => setIsSupportOpen(false);

  const nextGuide = () => setCurrentGuide((prev) => (prev + 1) % guides.length);
  const prevGuide = () => setCurrentGuide((prev) => (prev - 1 + guides.length) % guides.length);

  return (
    <AnimatePresence>
      {isSupportOpen && (
        <>
           {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-8 pb-20">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold tracking-widest uppercase text-white font-mono">
                  Support Hub
                </h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* SECTION 1: USER GUIDE CAROUSEL */}
              <section className="mb-12">
                <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-wider">01. How to Fit</h3>
                <div className="relative bg-white/5 rounded-2xl p-6 border border-white/10 min-h-[180px] flex flex-col items-center justify-center text-center">
                  <div className="text-4xl mb-4">{guides[currentGuide].icon}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{guides[currentGuide].title}</h4>
                  <p className="text-sm text-gray-400">{guides[currentGuide].desc}</p>

                  {/* Controls */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                    <button onClick={prevGuide} className="text-gray-500 hover:text-white transition-colors">←</button>
                    <div className="flex gap-1 items-center">
                      {guides.map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentGuide ? 'bg-[#007AFF]' : 'bg-gray-700'}`} />
                      ))}
                    </div>
                    <button onClick={nextGuide} className="text-gray-500 hover:text-white transition-colors">→</button>
                  </div>
                </div>
              </section>

              {/* SECTION 2: CAUTION */}
              <section className="mb-12">
                <h3 className="text-xs font-bold text-[#FF3B30] uppercase mb-4 tracking-wider">02. Critical Advisory</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                      <span className="text-2xl">💡</span>
                      <span className="text-xs font-bold text-red-200">Good Lighting Required</span>
                   </div>
                   <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                      <span className="text-2xl">📏</span>
                      <span className="text-xs font-bold text-red-200">2m Camera Distance</span>
                   </div>
                </div>
              </section>

              {/* SECTION 3: FAQ ACCORDION */}
              <section>
                <h3 className="text-xs font-bold text-white uppercase mb-4 tracking-wider">03. Frequent Questions</h3>
                <div className="space-y-2">
                  {faqs.map((item, index) => (
                    <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full flex justify-between items-center p-4 text-left hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-200">{item.q}</span>
                        <span className="text-gray-500 text-xs transform transition-transform duration-300" style={{ transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          ▼
                        </span>
                      </button>
                      <AnimatePresence>
                        {openFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                 <p className="text-[10px] text-gray-600 uppercase tracking-widest">S_FIT AI © 2024</p>
                 <a href="mailto:support@sfit.ai" className="text-[10px] text-[#007AFF] hover:underline mt-2 block">Contact Engineering</a>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
