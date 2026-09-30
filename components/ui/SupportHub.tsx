'use client';
import React, { useState } from 'react';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button - Minimal & unobtrusive */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all z-40 backdrop-blur-md"
        aria-label="Support Hub"
      >
        <span className="text-xl">?</span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
          <h2 className="text-xl font-bold tracking-widest text-white uppercase flex items-center gap-2">
            <span className="text-cyber-lime">⚡</span> Support Hub
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/50 hover:text-white p-2"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* User Guide Carousel (Simplified for now) */}
          <section>
            <h3 className="text-sm font-bold text-soft-gray uppercase mb-4 tracking-wider">How to Fit</h3>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden group">
              <div className="flex transition-transform duration-300">
                <div className="w-full flex-shrink-0 text-center">
                  <div className="text-4xl mb-4">📸</div>
                  <h4 className="font-bold text-white mb-2">1. Snap a Photo</h4>
                  <p className="text-xs text-soft-gray">Take a clear, full-body photo against a plain background.</p>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-6">
                <div className="w-2 h-2 rounded-full bg-cyber-lime" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>
            </div>
          </section>

          {/* Caution Warnings */}
          <section>
            <h3 className="text-sm font-bold text-soft-gray uppercase mb-4 tracking-wider">Crucial Requirements</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">💡</div>
                <div className="text-xs text-red-200 font-bold">Good Lighting</div>
                <div className="text-[10px] text-red-200/70 mt-1">Avoid harsh shadows</div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">📏</div>
                <div className="text-xs text-orange-200 font-bold">Distance</div>
                <div className="text-[10px] text-orange-200/70 mt-1">Stand 2-3m away</div>
              </div>
            </div>
          </section>

          {/* Q&A Accordion */}
          <section>
            <h3 className="text-sm font-bold text-soft-gray uppercase mb-4 tracking-wider">FAQ</h3>
            <div className="space-y-2">
              <details className="bg-white/5 border border-white/10 rounded-lg group [&_summary::-webkit-details-marker]:hidden">
                <summary className="p-4 text-sm font-medium cursor-pointer flex justify-between items-center text-white">
                  Why is my result blurry?
                  <span className="text-white/50 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 pt-0 text-xs text-soft-gray border-t border-white/5 mt-2">
                  Ensure your original photo is high resolution and well-lit. The AI relies on clear input data to map textures accurately.
                </div>
              </details>
              <details className="bg-white/5 border border-white/10 rounded-lg group [&_summary::-webkit-details-marker]:hidden">
                <summary className="p-4 text-sm font-medium cursor-pointer flex justify-between items-center text-white">
                  What poses work best?
                  <span className="text-white/50 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 pt-0 text-xs text-soft-gray border-t border-white/5 mt-2">
                  A relaxed, front-facing A-pose with arms slightly away from the body yields the best 3D drape mapping.
                </div>
              </details>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
