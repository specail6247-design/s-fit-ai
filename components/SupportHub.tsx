import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full border border-white/20 shadow-lg backdrop-blur-sm transition-all"
        aria-label="Support Hub"
      >
        <span className="text-xl font-mono block w-6 h-6 leading-none text-center">?</span>
      </button>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-md">
                <h2 className="text-lg font-bold text-white tracking-widest uppercase">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-soft-gray hover:text-white transition-colors p-1"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10">
                <button
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'guide' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-soft-gray hover:text-white'}`}
                  onClick={() => setActiveTab('guide')}
                >
                  Guide
                </button>
                <button
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'caution' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-soft-gray hover:text-white'}`}
                  onClick={() => setActiveTab('caution')}
                >
                  Caution
                </button>
                <button
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'qa' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-soft-gray hover:text-white'}`}
                  onClick={() => setActiveTab('qa')}
                >
                  Q&A
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {activeTab === 'guide' && (
                  <div className="space-y-6">
                    <p className="text-sm text-gray-300">Follow these steps for the perfect fit:</p>
                    {/* Placeholder for visual carousel */}
                    <div className="relative h-64 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center p-4">
                      <div className="text-4xl mb-4">📸</div>
                      <h3 className="font-bold text-white mb-2">1. Snap a Photo</h3>
                      <p className="text-xs text-center text-soft-gray">Stand straight, ensure full body is visible.</p>

                      {/* Simple dots for carousel indicator */}
                      <div className="absolute bottom-4 flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                        <div className="w-2 h-2 rounded-full bg-white/20"></div>
                        <div className="w-2 h-2 rounded-full bg-white/20"></div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'caution' && (
                  <div className="space-y-4">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex gap-4 items-start">
                      <div className="text-amber-500 text-xl mt-1">💡</div>
                      <div>
                        <h4 className="font-bold text-amber-500 text-sm mb-1">Good Lighting is Key</h4>
                        <p className="text-xs text-amber-500/80 leading-relaxed">Avoid strong backlighting or deep shadows. Natural, even light works best.</p>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex gap-4 items-start">
                      <div className="text-amber-500 text-xl mt-1">📏</div>
                      <div>
                        <h4 className="font-bold text-amber-500 text-sm mb-1">Camera Distance</h4>
                        <p className="text-xs text-amber-500/80 leading-relaxed">Position the camera at waist height, about 2-3 meters away.</p>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex gap-4 items-start">
                      <div className="text-amber-500 text-xl mt-1">👕</div>
                      <div>
                        <h4 className="font-bold text-amber-500 text-sm mb-1">Fitted Clothing</h4>
                        <p className="text-xs text-amber-500/80 leading-relaxed">Wear form-fitting clothes for accurate body shape analysis.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div className="space-y-3">
                    <div className="border border-white/10 rounded-xl p-4 hover:border-white/30 transition-colors cursor-pointer group">
                      <h4 className="font-bold text-white text-sm mb-2 group-hover:text-cyber-lime transition-colors">How long does it take?</h4>
                      <p className="text-xs text-soft-gray leading-relaxed">Usually under 10 seconds. Complex garments may take up to 20 seconds.</p>
                    </div>
                    <div className="border border-white/10 rounded-xl p-4 hover:border-white/30 transition-colors cursor-pointer group">
                      <h4 className="font-bold text-white text-sm mb-2 group-hover:text-cyber-lime transition-colors">Is my data secure?</h4>
                      <p className="text-xs text-soft-gray leading-relaxed">Photos are processed instantly and never stored permanently on our servers.</p>
                    </div>
                    <div className="border border-white/10 rounded-xl p-4 hover:border-white/30 transition-colors cursor-pointer group">
                      <h4 className="font-bold text-white text-sm mb-2 group-hover:text-cyber-lime transition-colors">Why did my try-on fail?</h4>
                      <p className="text-xs text-soft-gray leading-relaxed">Usually due to poor lighting or the garment image not being a clear front-view.</p>
                    </div>
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
