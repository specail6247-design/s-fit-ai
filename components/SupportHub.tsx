'use client';

import { useState } from 'react';
import { HelpCircle, X, Camera, Sun, Info, ChevronDown, ChevronUp } from 'lucide-react';

const QA_ITEMS = [
  {
    question: "How long does virtual fitting take?",
    answer: "Our AI processes your image and generates a high-quality fitting in approximately 5-10 seconds."
  },
  {
    question: "Do I need to be in the photo?",
    answer: "Yes, for the best results, use a clear, full-body photo of yourself standing against a simple background."
  },
  {
    question: "Are my photos saved?",
    answer: "Your privacy is our priority. We process photos securely and they are not used for anything other than your virtual try-on session unless you choose to save them."
  }
];

const CAROUSEL_STEPS = [
  {
    title: "1. Upload Photo",
    desc: "Start by uploading a clear photo of yourself."
  },
  {
    title: "2. Select Garment",
    desc: "Choose the item you want to try on from our luxury collection."
  },
  {
    title: "3. AI Magic",
    desc: "Watch as our AI seamlessly fits the garment to your unique shape."
  }
];

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');
  const [openQA, setOpenQA] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const toggleQA = (index: number) => {
    if (openQA === index) {
      setOpenQA(null);
    } else {
      setOpenQA(index);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#0a0a0a] text-[#ecab13] p-4 rounded-full border border-[#ecab13]/30 shadow-[0_0_20px_rgba(236,171,19,0.15)] hover:bg-[#ecab13] hover:text-[#0a0a0a] transition-all duration-500 group"
        aria-label="Support Hub"
      >
        <HelpCircle size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] border-l border-[#ecab13]/20 shadow-2xl z-50 transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-serif text-white tracking-[0.1em] uppercase">Support Hub</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/50 hover:text-[#ecab13] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex border-b border-white/5">
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-4 text-xs font-serif uppercase tracking-widest transition-colors ${activeTab === 'guide' ? 'text-[#ecab13] border-b border-[#ecab13]' : 'text-white/40 hover:text-white/80'}`}
          >
            Guide
          </button>
          <button
            onClick={() => setActiveTab('caution')}
            className={`flex-1 py-4 text-xs font-serif uppercase tracking-widest transition-colors ${activeTab === 'caution' ? 'text-[#ecab13] border-b border-[#ecab13]' : 'text-white/40 hover:text-white/80'}`}
          >
            Caution
          </button>
          <button
            onClick={() => setActiveTab('qa')}
            className={`flex-1 py-4 text-xs font-serif uppercase tracking-widest transition-colors ${activeTab === 'qa' ? 'text-[#ecab13] border-b border-[#ecab13]' : 'text-white/40 hover:text-white/80'}`}
          >
            Q&A
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {activeTab === 'guide' && (
            <div className="space-y-6">
              <div className="mb-4">
                <h3 className="text-lg font-serif text-white mb-2 tracking-wide">How to Fit</h3>
                <p className="text-xs text-white/50 leading-relaxed">Follow these simple steps to ensure the perfect virtual try-on experience.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-none p-8 relative min-h-[200px] flex flex-col justify-center items-center text-center">
                <div className="text-2xl mb-4 text-[#ecab13] font-serif">{CAROUSEL_STEPS[carouselIndex].title}</div>
                <p className="text-sm text-white/70 font-light leading-relaxed">{CAROUSEL_STEPS[carouselIndex].desc}</p>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {CAROUSEL_STEPS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${carouselIndex === idx ? 'w-6 bg-[#ecab13]' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                      aria-label={`Go to step ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setCarouselIndex(prev => (prev > 0 ? prev - 1 : CAROUSEL_STEPS.length - 1))}
                  className="text-xs text-white/50 hover:text-white uppercase tracking-widest"
                >
                  Prev
                </button>
                <button
                  onClick={() => setCarouselIndex(prev => (prev < CAROUSEL_STEPS.length - 1 ? prev + 1 : 0))}
                  className="text-xs text-[#ecab13] hover:text-[#ecab13]/80 uppercase tracking-widest"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {activeTab === 'caution' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-lg font-serif text-white mb-2 tracking-wide">Optimal Conditions</h3>
                <p className="text-xs text-white/50 leading-relaxed">For the most realistic AI fitting, please observe these guidelines.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-4">
                  <div className="bg-[#ecab13]/10 p-2 rounded-full text-[#ecab13]">
                    <Sun size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm text-white font-serif tracking-wide mb-1">Good Lighting</h4>
                    <p className="text-xs text-white/60 leading-relaxed">Ensure you are well-lit, preferably with natural front-facing light. Avoid heavy shadows.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-4">
                  <div className="bg-[#ecab13]/10 p-2 rounded-full text-[#ecab13]">
                    <Camera size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm text-white font-serif tracking-wide mb-1">Camera Distance</h4>
                    <p className="text-xs text-white/60 leading-relaxed">Stand about 3-5 feet away from the camera. Ensure your full body is visible.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-4">
                  <div className="bg-[#ecab13]/10 p-2 rounded-full text-[#ecab13]">
                    <Info size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm text-white font-serif tracking-wide mb-1">Clothing</h4>
                    <p className="text-xs text-white/60 leading-relaxed">Wear form-fitting clothes for the best AI mapping. Avoid bulky layers.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="text-lg font-serif text-white mb-2 tracking-wide">Frequently Asked Questions</h3>
              </div>

              <div className="space-y-2">
                {QA_ITEMS.map((item, index) => (
                  <div key={index} className="border border-white/10 bg-white/5">
                    <button
                      onClick={() => toggleQA(index)}
                      className="w-full text-left px-4 py-4 flex justify-between items-center"
                    >
                      <span className="text-sm text-white font-light tracking-wide">{item.question}</span>
                      {openQA === index ? <ChevronUp size={16} className="text-[#ecab13]" /> : <ChevronDown size={16} className="text-white/40" />}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${openQA === index ? 'max-h-40 border-t border-white/10' : 'max-h-0'}`}
                    >
                      <div className="p-4 text-xs text-white/60 leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                 <button className="w-full border border-white/20 hover:border-[#ecab13] text-white/70 hover:text-[#ecab13] py-3 text-xs uppercase tracking-widest font-serif transition-colors">
                   Report an Issue
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
