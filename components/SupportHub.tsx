'use client';

import { useState } from 'react';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa' | 'legal'>('guide');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Slide-out drawer
  return (
    <>
      {/* Floating Action Button - Minimalist trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-void-black/80 backdrop-blur-md border border-white/10 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all shadow-lg group"
        aria-label="Open Support Hub"
      >
        <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">
          help
        </span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold font-display uppercase tracking-wider">Support Hub</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-soft-gray hover:text-white transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-white/5 p-2">
          {[
            { id: 'guide', label: 'How to Fit', icon: 'auto_stories' },
            { id: 'caution', label: 'Guidelines', icon: 'warning' },
            { id: 'qa', label: 'Q&A', icon: 'forum' },
            { id: 'legal', label: 'Trust', icon: 'verified_user' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'guide' | 'caution' | 'qa' | 'legal')}
              className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-wider transition-colors min-w-[80px] ${
                activeTab === tab.id
                  ? 'text-cyber-lime border-b-2 border-cyber-lime'
                  : 'text-soft-gray hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg mb-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">


          {/* USER GUIDE CAROUSEL */}
          {activeTab === 'guide' && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="text-sm text-soft-gray uppercase tracking-widest font-mono mb-4">Step-by-Step Guide</h3>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 relative">
                {/* Carousel Navigation Buttons */}
                <button
                  onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
                  className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-white/10 transition-colors ${activeSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={activeSlide === 0}
                  aria-label="Previous step"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>

                <button
                  onClick={() => setActiveSlide((prev) => Math.min(2, prev + 1))}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-white/10 transition-colors ${activeSlide === 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={activeSlide === 2}
                  aria-label="Next step"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-cyber-lime font-mono">0{activeSlide + 1}</span>
                  <span className="text-xs text-soft-gray">
                    {activeSlide === 0 ? 'Lighting & Pose' : activeSlide === 1 ? 'Clothing Choice' : 'Final Check'}
                  </span>
                </div>

                <div className="aspect-[3/4] bg-gradient-to-br from-white/5 to-white/10 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden transition-all">
                   <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
                   <span className="material-symbols-outlined text-6xl text-white/20">
                     {activeSlide === 0 ? 'light_mode' : activeSlide === 1 ? 'checkroom' : 'camera_alt'}
                   </span>
                </div>

                <h4 className="text-lg font-medium mb-2">
                  {activeSlide === 0 ? 'Find good lighting' : activeSlide === 1 ? 'Wear tight clothes' : 'Ready to snap'}
                </h4>
                <p className="text-sm text-soft-gray leading-relaxed">
                  {activeSlide === 0
                    ? 'Stand in a well-lit area facing the light source. Avoid harsh shadows or strong backlighting for the most accurate body analysis.'
                    : activeSlide === 1
                      ? 'Wear form-fitting clothes (like a tank top and leggings). Baggy clothes will hide your actual body shape and ruin the fit.'
                      : 'Ensure your entire body from head to toe is visible in the frame. Keep your phone straight.'}
                </p>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${activeSlide === idx ? 'bg-cyber-lime' : 'bg-white/20'}`}
                    aria-label={`Go to step ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* CAUTION & GUIDELINES */}
          {activeTab === 'caution' && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="text-sm text-soft-gray uppercase tracking-widest font-mono mb-4">Important Guidelines</h3>

              <div className="grid gap-4">
                {[
                  { icon: 'straighten', title: 'Camera Distance', desc: 'Maintain 1.5 - 2 meters distance from the camera so your full body is visible.' },
                  { icon: 'accessibility_new', title: 'Clothing', desc: 'Wear form-fitting clothes for accurate sizing. Baggy clothes may obscure your shape.' },
                  { icon: 'wallpaper', title: 'Background', desc: 'Use a plain, contrasting background without clutter to help the AI detect your outline.' },
                  { icon: 'center_focus_strong', title: 'Framing', desc: 'Ensure your head and feet are completely within the camera frame.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-cyber-lime">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-soft-gray leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Q&A ACCORDION */}
          {activeTab === 'qa' && (
            <div className="space-y-4 animate-fade-in-up">
               <h3 className="text-sm text-soft-gray uppercase tracking-widest font-mono mb-4">Frequently Asked Questions</h3>

               {[
                 { q: 'How accurate is the sizing recommendation?', a: 'Our AI analyzes over 50 body points to provide sizing recommendations with 94% accuracy compared to manual measurements.' },
                 { q: 'Are my photos saved on your servers?', a: 'No. All image processing happens locally on your device or is immediately deleted after processing. We never store your photos without explicit permission.' },
                 { q: 'Can I try on clothes from any brand?', a: 'Currently we support a curated list of global brands. We are constantly expanding our catalog.' },
                 { q: 'Why is the fit looking distorted?', a: 'Distortion usually happens due to poor lighting or baggy clothing. Try retaking the photo following our guidelines.' }
               ].map((item, i) => (
                 <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                   <button
                     onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                     className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
                   >
                     <span className="font-medium text-sm">{item.q}</span>
                     <span className="material-symbols-outlined text-soft-gray transform transition-transform duration-200" style={{ transform: activeAccordion === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                       expand_more
                     </span>
                   </button>
                   <div
                     className="overflow-hidden transition-all duration-300 ease-in-out bg-black/20"
                     style={{ maxHeight: activeAccordion === i ? '200px' : '0px' }}
                   >
                     <p className="p-4 text-sm text-soft-gray leading-relaxed">
                       {item.a}
                     </p>
                   </div>
                 </div>
               ))}
            </div>
          )}

          {/* LEGAL / TRUST */}
          {activeTab === 'legal' && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="text-sm text-soft-gray uppercase tracking-widest font-mono mb-4">Trust & Growth</h3>

              <div className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Data Safety', 'Report an Issue'].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left group">
                    <span className="font-medium text-sm">{item}</span>
                    <span className="material-symbols-outlined text-soft-gray group-hover:text-white transition-colors">
                      arrow_forward
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 p-4 border border-white/10 rounded-xl bg-gradient-to-b from-white/5 to-transparent text-center">
                <span className="material-symbols-outlined text-3xl text-cyber-lime mb-2">shield_lock</span>
                <h4 className="font-medium text-sm mb-2">Bank-Grade Security</h4>
                <p className="text-xs text-soft-gray">Your biometric data is encrypted end-to-end.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
