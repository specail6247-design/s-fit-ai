'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

// Icons (Using simple SVGs to avoid dependency issues if lucide-react isn't installed)
const Icons = {
  Lightbulb: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
  ),
  Camera: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  )
};

const guideSteps = [
  {
    title: "Upload Photo",
    desc: "Use a clear, full-body photo with good lighting.",
    icon: "📸"
  },
  {
    title: "Choose Garment",
    desc: "Select a piece from our luxury or SPA collection.",
    icon: "👗"
  },
  {
    title: "See the Magic",
    desc: "Our AI visualizes the fit on your body instantly.",
    icon: "✨"
  }
];

const faqs = [
  { q: "Is my photo saved?", a: "No. Your photos are processed in real-time and deleted immediately after the session." },
  { q: "How accurate is the size?", a: "Our AI estimates size within a 95% accuracy range based on standard brand charts." },
  { q: "Can I use any background?", a: "For best results, use a plain, uncluttered background." },
  { q: "Is this free?", a: "You get 5 free try-ons daily. Premium unlocks unlimited access." }
];

export function SupportHub() {
  const { isSupportOpen, toggleSupport } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'faq'>('guide');
  const [guideStep, setGuideStep] = useState(0);

  const nextStep = () => setGuideStep((prev) => (prev + 1) % guideSteps.length);

  return (
    <AnimatePresence>
      {isSupportOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSupport}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#0A0A0A] border-l border-white/10 z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-cinzel text-white tracking-widest uppercase">Support Hub</h2>
              <button onClick={toggleSupport} className="text-soft-gray hover:text-white transition-colors">
                <Icons.X />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'guide' ? 'bg-white/5 text-white' : 'text-soft-gray hover:text-white'}`}
              >
                Start Guide
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'faq' ? 'bg-white/5 text-white' : 'text-soft-gray hover:text-white'}`}
              >
                Q & A
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {activeTab === 'guide' ? (
                <div className="space-y-8">
                  {/* Carousel */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden min-h-[250px] flex flex-col items-center justify-center text-center">
                    <AnimatePresence mode='wait'>
                      <motion.div
                        key={guideStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="text-6xl mb-4">{guideSteps[guideStep].icon}</div>
                        <h3 className="text-lg font-bold text-white">{guideSteps[guideStep].title}</h3>
                        <p className="text-sm text-gray-400">{guideSteps[guideStep].desc}</p>
                      </motion.div>
                    </AnimatePresence>

                    <button
                      onClick={nextStep}
                      className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full hover:scale-110 transition-transform"
                    >
                      <Icons.ArrowRight />
                    </button>

                    <div className="absolute bottom-6 left-6 flex gap-1">
                      {guideSteps.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all ${i === guideStep ? 'w-6 bg-white' : 'w-1.5 bg-white/20'}`} />
                      ))}
                    </div>
                  </div>

                  {/* Cautions */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-soft-gray uppercase tracking-widest mb-4">Fitting Best Practices</h3>

                    <div className="flex items-start gap-4 p-4 bg-yellow-900/10 border border-yellow-500/20 rounded-xl">
                      <div className="text-yellow-500 mt-1"><Icons.Lightbulb /></div>
                      <div>
                        <h4 className="text-sm font-bold text-yellow-500 mb-1">Lighting Matters</h4>
                        <p className="text-xs text-gray-400">Ensure your room is well-lit. Avoid strong backlighting or shadows on your body.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-blue-900/10 border border-blue-500/20 rounded-xl">
                      <div className="text-blue-500 mt-1"><Icons.Camera /></div>
                      <div>
                        <h4 className="text-sm font-bold text-blue-500 mb-1">Camera Distance</h4>
                        <p className="text-xs text-gray-400">Stand 6-8 feet away. Your full body should be visible from head to toe.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <FaqItem key={idx} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 text-center">
              <p className="text-[10px] text-soft-gray uppercase tracking-widest">
                Need more help? <a href="mailto:support@sfit.ai" className="text-white underline">Contact Us</a>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-sm font-medium text-white">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-soft-gray"
        >
          <Icons.ChevronRight />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/10">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
