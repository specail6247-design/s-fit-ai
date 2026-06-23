'use client';

import React, { useState } from 'react';
import { BottomSheet } from './BottomSheet';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-void-black border border-white/20 hover:border-[#ecab13] hover:text-[#ecab13] text-white size-12 rounded-full flex items-center justify-center transition-colors shadow-2xl backdrop-blur-md"
        aria-label="Open Support Hub"
      >
        <span className="material-symbols-outlined">help</span>
      </button>

      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="SUPPORT HUB">
        <div className="space-y-8 pb-8">
          {/* User Guide */}
          <section>
            <h3 className="text-[#ecab13] text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              How to Fit
            </h3>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar">
              <div className="min-w-[240px] snap-center bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-xl font-mono text-[#ecab13] font-bold mb-2">01</div>
                <h4 className="text-white font-bold text-sm mb-1">Select Garment</h4>
                <p className="text-xs text-soft-gray">Browse our luxury or SPA collection and choose a piece to try on.</p>
              </div>
              <div className="min-w-[240px] snap-center bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-xl font-mono text-[#ecab13] font-bold mb-2">02</div>
                <h4 className="text-white font-bold text-sm mb-1">Upload Photo</h4>
                <p className="text-xs text-soft-gray">Upload a clear front-facing photo or use your device camera.</p>
              </div>
              <div className="min-w-[240px] snap-center bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-xl font-mono text-[#ecab13] font-bold mb-2">03</div>
                <h4 className="text-white font-bold text-sm mb-1">AI Processing</h4>
                <p className="text-xs text-soft-gray">Our AI engine maps the garment to your body for a realistic fit.</p>
              </div>
            </div>
          </section>

          {/* Caution Section */}
          <section>
            <h3 className="text-[#ecab13] text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              Best Results Guide
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
                <span className="material-symbols-outlined text-[#ecab13] mb-2">lightbulb</span>
                <h4 className="text-white text-xs font-bold mb-1">Good Lighting</h4>
                <p className="text-[10px] text-soft-gray">Ensure your photo is well-lit and not too dark or shadowy.</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
                <span className="material-symbols-outlined text-[#ecab13] mb-2">camera_front</span>
                <h4 className="text-white text-xs font-bold mb-1">Clear View</h4>
                <p className="text-[10px] text-soft-gray">Face the camera directly. Avoid extreme angles or poses.</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
                <span className="material-symbols-outlined text-[#ecab13] mb-2">straighten</span>
                <h4 className="text-white text-xs font-bold mb-1">Right Distance</h4>
                <p className="text-[10px] text-soft-gray">Stand about 3-5 feet away for full-body fitting.</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
                <span className="material-symbols-outlined text-[#ecab13] mb-2">accessibility_new</span>
                <h4 className="text-white text-xs font-bold mb-1">Fitted Clothes</h4>
                <p className="text-[10px] text-soft-gray">Wear form-fitting clothes for the best AI mapping.</p>
              </div>
            </div>
          </section>

          {/* Q&A Accordion */}
          <section>
            <h3 className="text-[#ecab13] text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">quiz</span>
              Frequently Asked Questions
            </h3>
            <div className="space-y-2">
              <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer open:bg-white/10 transition-colors">
                <summary className="p-4 flex items-center justify-between text-sm font-bold text-white select-none">
                  How long does the AI processing take?
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-soft-gray">expand_more</span>
                </summary>
                <div className="px-4 pb-4 text-xs text-soft-gray leading-relaxed">
                  Most virtual try-ons are processed within 10-15 seconds. If server load is high, it may take up to 30 seconds.
                </div>
              </details>

              <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer open:bg-white/10 transition-colors">
                <summary className="p-4 flex items-center justify-between text-sm font-bold text-white select-none">
                  Is my uploaded photo stored or shared?
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-soft-gray">expand_more</span>
                </summary>
                <div className="px-4 pb-4 text-xs text-soft-gray leading-relaxed">
                  No, your privacy is our priority. Photos are processed securely on our servers and are immediately deleted after the try-on image is generated.
                </div>
              </details>

              <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer open:bg-white/10 transition-colors">
                <summary className="p-4 flex items-center justify-between text-sm font-bold text-white select-none">
                  Why does my fit look distorted?
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-soft-gray">expand_more</span>
                </summary>
                <div className="px-4 pb-4 text-xs text-soft-gray leading-relaxed">
                  This usually happens if the uploaded photo has poor lighting, is taken from a low angle, or if you are wearing baggy clothing. Try again following our "Best Results Guide" above.
                </div>
              </details>
            </div>
          </section>
        </div>
      </BottomSheet>
    </>
  );
}
