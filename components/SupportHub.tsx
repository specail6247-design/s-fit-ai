'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronRight, Lightbulb, Camera, X } from 'lucide-react';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How accurate is the 3D fitting?", a: "Our AI model creates a 95% accurate digital twin based on your uploaded photos and measurements." },
    { q: "What kind of photos work best?", a: "Clear, well-lit, full-body photos against a plain background work best. Avoid baggy clothing." },
    { q: "Is my data secure?", a: "Yes. Your photos are encrypted and only used to generate your fit model. We do not share them." }
  ];

  return (
    <>
      {/* Floating Action Button - Hidden until needed style */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-3 bg-void-black/80 backdrop-blur-md border border-white/10 rounded-full text-white/70 hover:text-white hover:border-white/30 transition-all z-40 group"
        aria-label="Support Hub"
      >
        <HelpCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide-out Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-[#050505] border-l border-luxury-gold/20 z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-light uppercase tracking-widest text-luxury-gold">Support</h2>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Guide Carousel */}
          <div className="mb-10">
            <h3 className="text-xs font-[family-name:var(--font-display)] text-luxury-gold/70 uppercase tracking-[0.2em] mb-4">How to Fit</h3>
            <div className="bg-white/5 border border-white/5 rounded p-4 flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
              <div className="min-w-[80%] snap-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center mb-3">
                  <span className="text-luxury-gold font-light font-[family-name:var(--font-display)]">I</span>
                </div>
                <h4 className="text-white text-sm font-light tracking-wide mb-1 uppercase font-[family-name:var(--font-display)]">Upload Photo</h4>
                <p className="text-xs text-white/50 font-light">Take a clear, full-body shot.</p>
              </div>
              <div className="min-w-[80%] snap-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center mb-3">
                  <span className="text-luxury-gold font-light font-[family-name:var(--font-display)]">II</span>
                </div>
                <h4 className="text-white text-sm font-light tracking-wide mb-1 uppercase font-[family-name:var(--font-display)]">Select Garment</h4>
                <p className="text-xs text-white/50 font-light">Choose any item from our catalog.</p>
              </div>
              <div className="min-w-[80%] snap-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center mb-3">
                  <span className="text-luxury-gold font-light font-[family-name:var(--font-display)]">III</span>
                </div>
                <h4 className="text-white text-sm font-light tracking-wide mb-1 uppercase font-[family-name:var(--font-display)]">View Result</h4>
                <p className="text-xs text-white/50 font-light">See your highly accurate virtual try-on.</p>
              </div>
            </div>
          </div>

          {/* Cautions */}
          <div className="mb-10">
            <h3 className="text-xs font-[family-name:var(--font-display)] text-luxury-gold/70 uppercase tracking-[0.2em] mb-4">Crucial Warnings</h3>
            <div className="space-y-3">
              <div className="bg-red-950/20 border border-red-500/20 rounded p-4 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-red-400/80 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs text-red-200/90 font-light tracking-wider uppercase font-[family-name:var(--font-display)] mb-1">Lighting Matters</h4>
                  <p className="text-xs text-red-200/50 font-light">Avoid heavy shadows or backlit photos for best results.</p>
                </div>
              </div>
              <div className="bg-orange-950/20 border border-orange-500/20 rounded p-4 flex items-start gap-3">
                <Camera className="w-5 h-5 text-orange-400/80 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs text-orange-200/90 font-light tracking-wider uppercase font-[family-name:var(--font-display)] mb-1">Camera Distance</h4>
                  <p className="text-xs text-orange-200/50 font-light">Stand about 6 feet (2 meters) from the lens.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Q&A Accordion */}
          <div>
            <h3 className="text-xs font-[family-name:var(--font-display)] text-luxury-gold/70 uppercase tracking-[0.2em] mb-4">FAQ</h3>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 rounded overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left"
                  >
                    <span className="text-xs text-white/90 font-light tracking-wide">{faq.q}</span>
                    <ChevronRight className={`w-4 h-4 text-white/30 transition-transform ${openFaq === idx ? 'rotate-90' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 pt-1">
                      <p className="text-xs text-white/50 font-light leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
