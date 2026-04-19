'use client';

import { useState } from 'react';
import { HelpCircle, X, Lightbulb, Camera, Ruler, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: "1. Good Lighting", desc: "Face a window or bright light. Avoid strong shadows.", icon: <Lightbulb className="w-8 h-8 text-[#C9B037]" /> },
    { title: "2. Clear Camera", desc: "Keep the camera at eye level, roughly 3-5 feet away.", icon: <Camera className="w-8 h-8 text-[#C9B037]" /> },
    { title: "3. Form-Fitting", desc: "Wear tight clothing for the most accurate 3D mapping.", icon: <Ruler className="w-8 h-8 text-[#C9B037]" /> }
  ];

  const faqs = [
    { q: "How accurate is the fit?", a: "Our AI uses millimeter-precise 3D mapping for 98% accuracy compared to physical garments." },
    { q: "Is my data secure?", a: "Yes. Photos are processed instantly and never stored without explicit consent." },
    { q: "What if lighting is bad?", a: "The system will warn you if lighting is insufficient. Try moving near a window." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#050505] border border-white/20 text-white p-3 rounded-full hover:border-[#C9B037] hover:text-[#C9B037] transition-all shadow-lg group focus-visible:ring-2 outline-none"
        aria-label="Open Support Hub"
      >
        <HelpCircle className="w-6 h-6 group-hover:scale-110 transition-transform" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#050505] border-l border-white/10 h-full overflow-y-auto shadow-2xl flex flex-col animate-slide-up">
            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#050505]/90 backdrop-blur z-10">
              <h2 className="text-xl font-serif tracking-widest text-[#C9B037] uppercase">Support Hub</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors" aria-label="Close Support Hub">
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 space-y-10">
              {/* User Guide Carousel */}
              <section>
                <h3 className="text-sm tracking-widest text-white uppercase mb-4 opacity-70">How to Fit</h3>
                <div className="bg-white/5 border border-white/10 p-6 flex flex-col items-center text-center relative overflow-hidden h-48">
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                    {slides[currentSlide].icon}
                    <div>
                      <h4 className="text-white font-medium mb-1">{slides[currentSlide].title}</h4>
                      <p className="text-xs text-gray-400">{slides[currentSlide].desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-[#C9B037] w-6' : 'bg-white/20 hover:bg-white/40'}`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Caution */}
              <section>
                <h3 className="text-sm tracking-widest text-white uppercase mb-4 opacity-70">Requirements</h3>
                <div className="bg-red-950/20 border border-red-900/30 p-4 space-y-3">
                  <div className="flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-200/80 leading-relaxed">Ensure full body is visible in the frame. Cropped photos or obscured limbs will result in analysis failure.</p>
                  </div>
                </div>
              </section>

              {/* Q&A Accordion */}
              <section>
                <h3 className="text-sm tracking-widest text-white uppercase mb-4 opacity-70">FAQ</h3>
                <div className="space-y-2">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-white/10 bg-white/5 overflow-hidden transition-all">
                      <button
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full text-left p-4 flex justify-between items-center text-sm text-white hover:bg-white/5"
                        aria-expanded={activeFaq === i}
                      >
                        {faq.q}
                        {activeFaq === i ? <ChevronUp className="w-4 h-4 text-[#C9B037]" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                      </button>
                      {activeFaq === i && (
                        <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed bg-white/5">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
