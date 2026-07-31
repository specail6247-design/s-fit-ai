'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronRight, ChevronDown, Camera, Sun, Info, AlertTriangle } from 'lucide-react';

export function SupportDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-40 border border-white/10 hover:scale-105"
        aria-label="Open Support Hub"
      >
        <HelpCircle size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tighter text-white">SUPPORT HUB</h2>
                  <p className="text-xs text-white/40 font-mono tracking-widest mt-1">S_FIT ASSISTANCE</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-white transition-colors p-2"
                  aria-label="Close Support Hub"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex border-b border-white/10">
                <TabButton active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} label="HOW TO FIT" />
                <TabButton active={activeTab === 'caution'} onClick={() => setActiveTab('caution')} label="CAUTION" />
                <TabButton active={activeTab === 'faq'} onClick={() => setActiveTab('faq')} label="Q&A" />
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'guide' && <GuideTab key="guide" />}
                  {activeTab === 'caution' && <CautionTab key="caution" />}
                  {activeTab === 'faq' && <FaqTab key="faq" />}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function TabButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-4 text-xs font-mono tracking-widest transition-colors border-b-2 ${
        active ? 'text-white border-white' : 'text-white/40 border-transparent hover:text-white/70 hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );
}

function GuideTab() {
  const steps = [
    { num: "01", title: "Upload Photo", desc: "Start with a clear, full-body photo of yourself." },
    { num: "02", title: "Select Garment", desc: "Choose a clothing item to try on from your collection." },
    { num: "03", title: "Process", desc: "Our AI engine maps the garment to your body shape." },
    { num: "04", title: "Review", desc: "Check the fit, drape, and proportions in high fidelity." }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center aspect-video mb-8">
        <Info className="text-white/20 mb-4" size={32} />
        <p className="text-white/50 text-xs font-mono text-center">Visual guide illustration</p>
      </div>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <span className="text-xl font-black text-white/20">{step.num}</span>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
              <p className="text-xs text-white/60 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CautionTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5 mb-8 flex gap-4">
        <AlertTriangle className="text-orange-500 shrink-0" size={24} />
        <div>
          <h4 className="text-sm font-bold text-orange-500 mb-2">Optimal Conditions Required</h4>
          <p className="text-xs text-orange-500/70 leading-relaxed">For the most accurate AI fitting, please adhere to the following guidelines.</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Sun className="text-white/70" size={20} />
            <h4 className="text-sm font-bold text-white">Lighting</h4>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">Ensure bright, even lighting. Avoid strong backlighting or harsh shadows across your body.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Camera className="text-white/70" size={20} />
            <h4 className="text-sm font-bold text-white">Camera Distance & Angle</h4>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">Position the camera at waist height, approximately 2-3 meters away. The photo should show your full body from head to toe.</p>
        </div>
      </div>
    </motion.div>
  );
}

function FaqTab() {
  const faqs = [
    { q: "How long does processing take?", a: "Typically 5-15 seconds depending on network conditions and image complexity." },
    { q: "Are my photos stored?", a: "No. Photos are processed in memory and immediately discarded. We do not store your personal images." },
    { q: "Why is the fit sometimes slightly off?", a: "Complex poses, loose clothing in the original photo, or extreme lighting can confuse the AI mapping." },
    { q: "What garment types work best?", a: "Currently, our engine is optimized for tops, dresses, and outerwear." }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-bold text-white/90">{faq.q}</span>
            {openIdx === i ? <ChevronDown size={16} className="text-white/50" /> : <ChevronRight size={16} className="text-white/50" />}
          </button>

          <AnimatePresence>
            {openIdx === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-xs text-white/60 leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}
