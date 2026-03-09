'use client';

// S_FIT AI - Support Hub Drawer
// Slide-out drawer with User Guide, Caution, and FAQ

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: {
    x: '100%',
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
};

const guideSteps = [
  { title: 'Upload Photo', desc: 'Take a clear photo with good lighting, preferably against a solid background.' },
  { title: 'Select Garment', desc: 'Choose the clothing item you want to try on. Ensure the image is flat and front-facing.' },
  { title: 'AI Fitting', desc: 'Our advanced AI maps the garment to your body for a realistic fit.' },
  { title: 'Review', desc: 'Check the result and adjust lighting or angle if needed for optimal results.' },
];

const faqs = [
  { q: 'What kind of photos work best?', a: 'Clear, well-lit photos taken from straight on. Avoid loose clothing in the base photo.' },
  { q: 'How long does processing take?', a: 'Typically 5-15 seconds depending on server load and image complexity.' },
  { q: 'Are my photos saved?', a: 'No, we do not store your personal photos. They are processed securely and discarded.' },
  { q: 'Can I try on any brand?', a: 'Yes! We support most major brands. Just upload a clear image of the garment.' },
];

export function SupportHub() {
  const { showSupportHub, setShowSupportHub } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'faq'>('guide');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleClose = () => {
    setShowSupportHub(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <AnimatePresence>
      {showSupportHub && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col z-10"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold tracking-widest uppercase text-white">
                Support <span className="text-[#007AFF] italic">Hub</span>
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'guide' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                How to Fit
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'faq' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                FAQ
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {activeTab === 'guide' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Caution Box */}
                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-4 flex gap-4">
                     <div className="text-orange-500 mt-1">
                        {/* Lightbulb/Warning Icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                     </div>
                     <div>
                       <h3 className="text-sm font-bold text-orange-400 mb-1">Important Note</h3>
                       <p className="text-xs text-orange-200/70">Ensure your room is well-lit and you are positioned 1.5 - 2 meters away from the camera for best tracking accuracy.</p>
                     </div>
                  </div>

                  {/* Step-by-Step Guide */}
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {guideSteps.map((step, idx) => (
                      <div key={idx} className="relative flex items-start gap-4">
                        <div className="relative z-10 w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center font-bold text-sm text-[#007AFF] shrink-0">
                          {idx + 1}
                        </div>
                        <div className="pt-2">
                          <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
                          <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm font-bold text-white pr-4">{faq.q}</span>
                        <svg
                          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          className={`transform transition-transform duration-300 text-gray-500 ${openFaqIndex === idx ? 'rotate-180' : ''}`}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>

                      <AnimatePresence>
                        {openFaqIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/50">
               <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-colors">
                  Contact Support
               </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}