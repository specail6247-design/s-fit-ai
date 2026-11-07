'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 transition-all z-40 group"
        aria-label="Support Hub"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">?</span>
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
                <h2 className="text-xl font-bold font-mono tracking-wider">SUPPORT HUB</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-soft-gray hover:text-white p-2"
                >
                  ✕
                </button>
              </div>

              <div className="flex border-b border-white/10 bg-black/30">
                {['guide', 'caution', 'qa'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as 'guide' | 'caution' | 'qa')}
                    className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${
                      activeTab === tab
                        ? 'text-cyber-lime border-b-2 border-cyber-lime bg-white/5'
                        : 'text-soft-gray hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-void-black">
                {activeTab === 'guide' && (
                  <div className="space-y-8">
                    <h3 className="text-lg font-bold mb-4">How to Fit</h3>

                    <div className="space-y-6">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-white/30 transition-colors">
                        <div className="absolute top-0 right-0 bg-white/10 px-3 py-1 text-xs font-mono rounded-bl-xl text-soft-gray">STEP 01</div>
                        <div className="text-4xl mb-4">📸</div>
                        <h4 className="font-bold mb-2">Upload Photo</h4>
                        <p className="text-sm text-soft-gray">Take a clear front-facing photo in good lighting. Tight clothes work best.</p>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-white/30 transition-colors">
                        <div className="absolute top-0 right-0 bg-white/10 px-3 py-1 text-xs font-mono rounded-bl-xl text-soft-gray">STEP 02</div>
                        <div className="text-4xl mb-4">👕</div>
                        <h4 className="font-bold mb-2">Select Garment</h4>
                        <p className="text-sm text-soft-gray">Browse our collection and select the item you want to try on.</p>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-white/30 transition-colors">
                        <div className="absolute top-0 right-0 bg-white/10 px-3 py-1 text-xs font-mono rounded-bl-xl text-soft-gray">STEP 03</div>
                        <div className="text-4xl mb-4">✨</div>
                        <h4 className="font-bold mb-2">AI Processing</h4>
                        <p className="text-sm text-soft-gray">Our AI engine maps the garment to your body for a realistic fit.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'caution' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold mb-4 text-orange-400">Important Guidelines</h3>

                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5 flex gap-4">
                      <div className="text-2xl mt-1">☀️</div>
                      <div>
                        <h4 className="font-bold text-orange-200 mb-1">Lighting Matters</h4>
                        <p className="text-sm text-orange-200/70">Ensure you are in a well-lit room. Harsh shadows can affect the AI&apos;s body mapping accuracy.</p>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4">
                      <div className="text-2xl mt-1">📏</div>
                      <div>
                        <h4 className="font-bold text-white mb-1">Distance & Angle</h4>
                        <p className="text-sm text-soft-gray">Stand about 2-3 meters from the camera. Ensure your entire body (head to toe) is visible in the frame.</p>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4">
                      <div className="text-2xl mt-1">👗</div>
                      <div>
                        <h4 className="font-bold text-white mb-1">Current Clothing</h4>
                        <p className="text-sm text-soft-gray">Wear form-fitting clothes. Bulky items like thick jackets will distort the final fitting result.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold mb-4">Frequently Asked</h3>

                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <summary className="p-4 font-medium cursor-pointer list-none flex justify-between items-center group-open:bg-white/5">
                        How accurate is the sizing?
                        <span className="transition group-open:rotate-180">↓</span>
                      </summary>
                      <div className="p-4 pt-0 text-sm text-soft-gray border-t border-white/5 mt-2">
                        Our AI uses your provided height/weight and photo proportions to estimate sizing with ~85% accuracy. For luxury items, we use the brand&apos;s specific measurement charts.
                      </div>
                    </details>

                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <summary className="p-4 font-medium cursor-pointer list-none flex justify-between items-center group-open:bg-white/5">
                        Is my photo saved?
                        <span className="transition group-open:rotate-180">↓</span>
                      </summary>
                      <div className="p-4 pt-0 text-sm text-soft-gray border-t border-white/5 mt-2">
                        No. Your photos are processed securely in memory and deleted immediately after the fitting result is generated. We do not store user images.
                      </div>
                    </details>

                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <summary className="p-4 font-medium cursor-pointer list-none flex justify-between items-center group-open:bg-white/5">
                        Why did the try-on fail?
                        <span className="transition group-open:rotate-180">↓</span>
                      </summary>
                      <div className="p-4 pt-0 text-sm text-soft-gray border-t border-white/5 mt-2">
                        Common reasons include: complex backgrounds, low lighting, or obstructed body parts. Try taking a new photo against a plain, well-lit wall.
                      </div>
                    </details>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
