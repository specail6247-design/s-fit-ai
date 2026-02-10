'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 } as const
  },
  exit: { x: '100%' },
};

const guideSlides = [
  {
    title: 'Upload',
    icon: 'upload_file',
    text: 'Upload a clear full-body photo of yourself. Ensure you are facing forward.',
  },
  {
    title: 'Select',
    icon: 'checkroom',
    text: 'Choose a garment from our premium collection or upload your own item.',
  },
  {
    title: 'Fit',
    icon: 'auto_awesome',
    text: 'Watch as our AI magically fits the garment to your body shape in seconds.',
  },
];

const faqs = [
  {
    question: 'Is this service free?',
    answer: 'You have 5 free try-ons per day. Upgrade to Premium for unlimited access.',
  },
  {
    question: 'Is my photo saved?',
    answer: 'Your photos are processed securely and deleted from our servers after the session.',
  },
  {
    question: 'How accurate is the sizing?',
    answer: 'Our AI estimates sizing based on standard proportions, but it is for visualization only.',
  },
];

export default function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleClose = () => {
    setSupportHubOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % guideSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + guideSlides.length) % guideSlides.length);
  };

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-80 md:w-96 bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#111]">
              <h2 className="text-xl font-bold tracking-wider text-white">SUPPORT HUB</h2>
              <button onClick={handleClose} className="text-white/50 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">

              {/* User Guide Carousel */}
              <section>
                <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-widest">User Guide</h3>
                <div className="bg-white/5 rounded-xl p-6 relative group border border-white/5 hover:border-white/10 transition-colors">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-4xl text-white mb-3">
                      {guideSlides[currentSlide].icon}
                    </span>
                    <h4 className="text-lg font-bold text-white mb-2">{guideSlides[currentSlide].title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed min-h-[60px]">
                      {guideSlides[currentSlide].text}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <button onClick={prevSlide} className="p-1 text-white/50 hover:text-white">
                      <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
                    </button>
                    <div className="flex gap-2">
                      {guideSlides.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentSlide ? 'bg-[#007AFF]' : 'bg-white/20'}`}
                        />
                      ))}
                    </div>
                    <button onClick={nextSlide} className="p-1 text-white/50 hover:text-white">
                      <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Caution */}
              <section>
                <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-widest">Caution</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1a1100] border border-yellow-500/20 rounded-xl p-4 flex flex-col items-center text-center">
                    <span className="material-symbols-outlined text-yellow-500 mb-2">light_mode</span>
                    <span className="text-[10px] text-yellow-500/80 font-bold uppercase">Good Lighting</span>
                  </div>
                  <div className="bg-[#1a1100] border border-yellow-500/20 rounded-xl p-4 flex flex-col items-center text-center">
                    <span className="material-symbols-outlined text-yellow-500 mb-2">straighten</span>
                    <span className="text-[10px] text-yellow-500/80 font-bold uppercase">2-3m Distance</span>
                  </div>
                </div>
              </section>

              {/* Q&A */}
              <section>
                <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-widest">Q&A</h3>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm font-bold text-gray-200">{faq.question}</span>
                        <span className={`material-symbols-outlined text-sm transition-transform text-gray-500 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>
                      <AnimatePresence>
                        {openFaqIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>

              {/* Footer */}
              <div className="pt-8 text-center">
                <p className="text-[10px] text-white/20 font-mono">S_FIT AI v2.0.0 (BETA)</p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
