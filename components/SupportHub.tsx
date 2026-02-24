'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

// Icons (Simple SVGs)
const Icons = {
  Light: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>,
  Distance: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7"/></svg>,
  ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
};

export default function SupportHub() {
  const setSupportOpen = useStore((state) => state.setSupportOpen);
  const supportTab = useStore((state) => state.supportTab);
  const setSupportTab = useStore((state) => state.setSupportTab);

  return (
      <div className="fixed inset-0 z-[100] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSupportOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a] z-10">
            <div>
              <h2 className="text-xl font-serif tracking-wide text-white">SUPPORT HUB</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Assistant & Resources</p>
            </div>
            <button onClick={() => setSupportOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {(['guide', 'caution', 'qa'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSupportTab(tab)}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                  supportTab === tab ? 'text-[#007AFF] bg-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
                {supportTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]" />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <AnimatePresence mode="wait">
              {supportTab === 'guide' && <GuideSection key="guide" />}
              {supportTab === 'caution' && <CautionSection key="caution" />}
              {supportTab === 'qa' && <QASection key="qa" />}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 text-center">
            <p className="text-[10px] text-gray-600">S_FIT NEO v2.0 • SERVICE STATUS: <span className="text-green-500">ONLINE</span></p>
          </div>
        </motion.div>
      </div>
  );
}

// --- SECTIONS ---

function GuideSection() {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Identify", desc: "Upload a clear full-body photo of yourself. Ensure good lighting and high contrast for best body tracking.", icon: "📸" },
    { title: "Select", desc: "Browse our luxury collection or upload a garment image you wish to try on. Front-facing garment photos work best.", icon: "👗" },
    { title: "Transform", desc: "Our AI engine will analyze your pose and the garment fabric to create a photorealistic fitting in seconds.", icon: "✨" }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full flex flex-col justify-between py-4">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center text-5xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            {steps[step].icon}
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#007AFF] rounded-full flex items-center justify-center text-white text-xs font-bold font-mono">
            {step + 1}
          </div>
        </div>

        <div className="space-y-4 max-w-[280px]">
           <h3 className="text-2xl font-bold text-white tracking-tight">{steps[step].title}</h3>
           <p className="text-sm text-gray-400 leading-relaxed">{steps[step].desc}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-white/5 mt-auto">
        <button
          onClick={() => setStep(prev => Math.max(0, prev - 1))}
          disabled={step === 0}
          className="text-xs font-mono disabled:opacity-30 hover:text-[#007AFF] transition-colors uppercase tracking-wider px-4 py-2"
        >
          Previous
        </button>
        <div className="flex gap-2">
          {steps.map((_, i) => (
             <button
               key={i}
               onClick={() => setStep(i)}
               className={`w-2 h-2 rounded-full transition-all duration-300 ${i === step ? 'bg-[#007AFF] w-4' : 'bg-white/20 hover:bg-white/40'}`}
             />
          ))}
        </div>
        <button
          onClick={() => setStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={step === steps.length - 1}
          className="text-xs font-mono disabled:opacity-30 hover:text-[#007AFF] transition-colors uppercase tracking-wider px-4 py-2"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}

function CautionSection() {
  const items = [
    { title: "Lighting Conditions", desc: "Avoid strong backlighting or deep shadows. Soft, even lighting ensures accurate skin tone and fabric rendering.", icon: <Icons.Light /> },
    { title: "Camera Distance", desc: "Stand 2-3 meters away. Ensure your full body is visible in the frame, from head to toe.", icon: <Icons.Distance /> },
    { title: "Clothing Fit", desc: "Wear tight-fitting or minimal clothes for the most accurate body measurements and overlay.", icon: "👕" }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
      <div className="p-4 mb-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex gap-3">
        <span className="text-xl">⚠️</span>
        <p className="text-xs text-yellow-200/80 leading-relaxed">
          <span className="font-bold text-yellow-500 block mb-1">IMPORTANT</span>
          Poor quality photos are the #1 cause of failed fittings. Please review these guidelines.
        </p>
      </div>

      {items.map((item, i) => (
        <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group">
          <div className="text-[#007AFF] mt-1 p-2 bg-black rounded-lg h-fit">{item.icon}</div>
          <div>
            <h4 className="font-bold text-sm text-gray-200 group-hover:text-[#007AFF] transition-colors">{item.title}</h4>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function QASection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const qas = [
    { q: "Is my photo saved?", a: "No. Your photos are processed temporarily for the fitting session and are automatically deleted after 1 hour unless you explicitly save them to your secure Vault." },
    { q: "How accurate is the sizing?", a: "Our AI estimates measurements with ~95% accuracy when the guidelines are followed correctly. However, we recommend checking the brand's specific size chart." },
    { q: "Can I try on multiple items?", a: "Yes! In Member Mode, you can queue multiple items for a faster fitting session. Free users are limited to one item at a time." },
    { q: "What is 'Luxury Mode'?", a: "Luxury Mode uses a higher-fidelity rendering engine that simulates complex fabrics like silk, denim, and wool with greater realism. It takes slightly longer to process." }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
      {qas.map((qa, i) => (
        <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center p-4 text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-bold text-gray-300">{qa.q}</span>
            <motion.div
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              className="text-gray-500"
            >
              <Icons.ChevronDown />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5 bg-black/20">
                  <div className="py-2">{qa.a}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}
