"use client";
import React, { useState } from 'react';
import { BottomSheet } from './BottomSheet';
import { HelpCircle, AlertTriangle, ChevronDown, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SupportHub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // FAQs data
  const faqs = [
    { q: "What should I wear for best results?", a: "Form-fitting solid colors work best. Avoid heavily patterned or extremely loose clothing." },
    { q: "How long does generation take?", a: "Typically 5-15 seconds per garment, depending on current server load." },
    { q: "My result looks distorted. Why?", a: "This usually happens due to poor lighting or incorrect distance. Ensure you are well-lit and 3-5 feet away." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#050505] border border-[#C9B037]/30 text-[#C9B037] p-3 rounded-full hover:bg-[#C9B037] hover:text-black transition-colors z-40 shadow-[0_0_20px_rgba(201,176,55,0.15)] group"
        aria-label="Help and Support"
      >
        <HelpCircle size={24} aria-hidden="true" className="group-hover:scale-110 transition-transform" />
      </button>

      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="SUPPORT HUB">
        <div className="space-y-10 text-white max-w-2xl mx-auto pb-8">

          <section>
            <h4 className="text-[#C9B037] font-[family-name:var(--font-display)] uppercase tracking-widest text-sm mb-4 border-b border-[#C9B037]/20 pb-2">User Guide: How to Fit</h4>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x scrollbar-hide">
              {[
                { title: "POSITION", desc: "Stand 3-5 feet from camera." },
                { title: "LIGHTING", desc: "Ensure even, front-facing light." },
                { title: "POSTURE", desc: "Stand straight, arms slightly relaxed." }
              ].map((step, i) => (
                <div key={i} className="min-w-[220px] bg-[#050505] border border-white/10 p-5 rounded-none snap-center">
                  <div className="text-[#C9B037] font-bold mb-2 font-[family-name:var(--font-display)] tracking-widest text-xs uppercase">Step 0{i + 1}</div>
                  <div className="text-white font-bold text-sm mb-1 uppercase tracking-wider">{step.title}</div>
                  <div className="text-xs text-gray-400">{step.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
             <h4 className="text-[#C9B037] font-[family-name:var(--font-display)] uppercase tracking-widest text-sm mb-4 border-b border-[#C9B037]/20 pb-2">Caution & Warning</h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#050505] border border-red-500/30 p-4 rounded-none flex items-start gap-3">
                  <Sun className="text-red-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h5 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">Bad Lighting</h5>
                    <p className="text-[10px] text-gray-400 leading-relaxed">Avoid heavily backlit environments or harsh shadows. Soft, even lighting produces the best AI analysis.</p>
                  </div>
                </div>
                <div className="bg-[#050505] border border-orange-500/30 p-4 rounded-none flex items-start gap-3">
                  <AlertTriangle className="text-orange-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h5 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">Camera Distance</h5>
                    <p className="text-[10px] text-gray-400 leading-relaxed">Keep camera at eye or chest level. Shooting from too high or too low distorts garment proportions.</p>
                  </div>
                </div>
             </div>
          </section>

          <section>
             <h4 className="text-[#C9B037] font-[family-name:var(--font-display)] uppercase tracking-widest text-sm mb-4 border-b border-[#C9B037]/20 pb-2">Q&A</h4>
             <div className="space-y-2">
               {faqs.map((faq, i) => (
                 <div key={i} className="border border-white/10 bg-[#050505] rounded-none overflow-hidden transition-colors hover:border-white/20">
                   <button
                     onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                     className="w-full p-4 text-left flex justify-between items-center text-xs font-bold uppercase tracking-wider text-white/90"
                   >
                     {faq.q}
                     <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }}>
                       <ChevronDown size={16} className="text-[#C9B037]" />
                     </motion.div>
                   </button>
                   <AnimatePresence>
                     {activeFaq === i && (
                       <motion.div
                         initial={{height: 0, opacity: 0}} animate={{height: 'auto', opacity: 1}} exit={{height: 0, opacity: 0}}
                         className="px-4 pb-4 text-xs text-gray-400 leading-relaxed"
                       >
                         {faq.a}
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
               ))}
             </div>
          </section>

        </div>
      </BottomSheet>
    </>
  );
};
