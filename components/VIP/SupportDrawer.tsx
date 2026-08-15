import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const drawerVariants: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
  exit: { x: '100%' }
};

export default function SupportDrawer({ isOpen, onClose }: Props) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselSteps = [
    { title: 'Step 1: Proper Lighting', desc: 'Ensure you are in a well-lit room.' },
    { title: 'Step 2: Clear Background', desc: 'Use a solid, contrasting background.' },
    { title: 'Step 3: Upload Garment', desc: 'Select a front-facing garment image.' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring' as const, damping: 25, stiffness: 200 }}
            className="relative z-10 w-full max-w-sm bg-[#050505] border-l border-white/10 h-full flex flex-col shadow-2xl overflow-y-auto"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-widest uppercase text-white">Support Hub</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-white">✕</button>
            </div>

            <div className="p-6 space-y-8 flex-1">
              {/* User Guide Carousel */}
              <section>
                <h3 className="text-sm font-bold text-[#007AFF] uppercase mb-4">How to Fit</h3>
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                  <div className="h-24 flex flex-col justify-center text-center">
                    <h4 className="text-white font-bold mb-2">{carouselSteps[carouselIndex].title}</h4>
                    <p className="text-xs text-gray-400">{carouselSteps[carouselIndex].desc}</p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
                      className="text-xs text-gray-500 hover:text-white disabled:opacity-30"
                      disabled={carouselIndex === 0}
                    >
                      ← Prev
                    </button>
                    <div className="flex gap-1 items-center">
                      {carouselSteps.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i === carouselIndex ? 'bg-[#007AFF]' : 'bg-white/20'}`} />
                      ))}
                    </div>
                    <button
                      onClick={() => setCarouselIndex(Math.min(carouselSteps.length - 1, carouselIndex + 1))}
                      className="text-xs text-gray-500 hover:text-white disabled:opacity-30"
                      disabled={carouselIndex === carouselSteps.length - 1}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </section>

              {/* Caution */}
              <section>
                <h3 className="text-sm font-bold text-[#FF3B30] uppercase mb-4 flex items-center gap-2">
                  <span>⚠️</span> Important Guidelines
                </h3>
                <ul className="space-y-3 text-xs text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-lg leading-none">💡</span>
                    <p>Avoid harsh backlighting or deep shadows on your face/body.</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg leading-none">📏</span>
                    <p>Stand approximately 1.5 to 2 meters away from the camera.</p>
                  </li>
                </ul>
              </section>

              {/* FAQ Accordion */}
              <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Q&A</h3>
                <div className="space-y-2">
                  {[
                    { q: "Why is the fit inaccurate?", a: "Ensure your photo is front-facing and well lit." },
                    { q: "Can I use any clothing photo?", a: "Yes, but flat-lay or mannequin shots work best." }
                  ].map((faq, i) => (
                    <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full text-left p-3 text-xs font-bold text-white flex justify-between items-center bg-white/5 hover:bg-white/10"
                      >
                        {faq.q}
                        <span className="text-gray-500">{activeFaq === i ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="p-3 text-xs text-gray-400 bg-black/40">{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
