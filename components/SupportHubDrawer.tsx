import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHubDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-l-xl text-white z-40 border border-white/20 border-r-0 transition-all group"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">help</span>
          <span className="text-[10px] font-bold uppercase" style={{ writingMode: 'vertical-rl' }}>Support Hub</span>
        </div>
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
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40 backdrop-blur-md">
                <h2 className="text-xl font-bold tracking-widest uppercase">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 p-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'guide' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-white'}`}
                >
                  Guide
                </button>
                <button
                  onClick={() => setActiveTab('caution')}
                  className={`flex-1 p-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'caution' ? 'text-[#ecab13] border-b-2 border-[#ecab13]' : 'text-gray-500 hover:text-white'}`}
                >
                  Caution
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`flex-1 p-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'faq' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-white'}`}
                >
                  FAQ
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {activeTab === 'guide' && (
                  <div className="space-y-8">
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-bold">How to Fit</h3>
                      <p className="text-sm text-gray-400">Follow these steps for the perfect virtual try-on.</p>
                    </div>

                    <div className="relative group overflow-hidden rounded-xl border border-white/10 aspect-video bg-zinc-900 flex items-center justify-center snap-x snap-mandatory overflow-x-auto">
                      <div className="min-w-full h-full flex flex-col items-center justify-center p-6 text-center snap-center">
                        <span className="material-symbols-outlined text-4xl mb-4 text-[#007AFF]">person_add</span>
                        <h4 className="font-bold mb-2">1. Upload Photo</h4>
                        <p className="text-xs text-gray-400">Choose a clear, front-facing full-body photo for best results.</p>
                      </div>
                      <div className="min-w-full h-full flex flex-col items-center justify-center p-6 text-center snap-center">
                        <span className="material-symbols-outlined text-4xl mb-4 text-[#007AFF]">checkroom</span>
                        <h4 className="font-bold mb-2">2. Select Garment</h4>
                        <p className="text-xs text-gray-400">Pick an item from our catalog or upload a clean garment image.</p>
                      </div>
                      <div className="min-w-full h-full flex flex-col items-center justify-center p-6 text-center snap-center">
                        <span className="material-symbols-outlined text-4xl mb-4 text-[#007AFF]">magic_button</span>
                        <h4 className="font-bold mb-2">3. Try It On</h4>
                        <p className="text-xs text-gray-400">Click the button and let our AI seamlessly fit the garment to your body.</p>
                      </div>
                    </div>
                    <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest">Swipe to view steps</p>
                  </div>
                )}

                {activeTab === 'caution' && (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-xl border border-[#ecab13]/30 bg-[#ecab13]/5">
                      <span className="material-symbols-outlined text-[#ecab13] text-2xl mt-1">lightbulb</span>
                      <div>
                        <h4 className="font-bold text-[#ecab13] mb-1">Lighting Matters</h4>
                        <p className="text-sm text-gray-300">Ensure your photo is well-lit. Avoid harsh shadows or strong backlighting which can confuse the AI shape detection.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl border border-[#ecab13]/30 bg-[#ecab13]/5">
                      <span className="material-symbols-outlined text-[#ecab13] text-2xl mt-1">straighten</span>
                      <div>
                        <h4 className="font-bold text-[#ecab13] mb-1">Camera Distance</h4>
                        <p className="text-sm text-gray-300">Stand about 6-8 feet away from the camera. Make sure your entire body (or upper body for tops) is clearly visible without extreme angles.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl border border-[#ecab13]/30 bg-[#ecab13]/5">
                      <span className="material-symbols-outlined text-[#ecab13] text-2xl mt-1">accessibility_new</span>
                      <div>
                        <h4 className="font-bold text-[#ecab13] mb-1">Posture</h4>
                        <p className="text-sm text-gray-300">Stand naturally with your arms slightly away from your body (A-pose) for the most accurate garment draping.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-4">
                    {[
                      { q: "How long does a try-on take?", a: "Typically between 5 to 10 seconds depending on network speed and server load." },
                      { q: "Can I use photos with complex backgrounds?", a: "Yes, our AI isolates your body automatically, though solid backgrounds can yield slightly cleaner edges." },
                      { q: "Why did the garment look distorted?", a: "This usually happens if the pose is too complex or parts of the body are occluded. Try a simpler, front-facing pose." },
                      { q: "Are my photos stored securely?", a: "Yes. Photos are processed temporarily and are not stored permanently unless you choose to save them to your account." }
                    ].map((faq, i) => (
                      <details key={i} className="group border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <summary className="p-4 font-bold cursor-pointer list-none flex justify-between items-center hover:bg-white/5 transition-colors">
                          <span className="text-sm">{faq.q}</span>
                          <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                        </summary>
                        <div className="p-4 pt-0 text-sm text-gray-400 leading-relaxed border-t border-white/10 mt-2 bg-black/20">
                          {faq.a}
                        </div>
                      </details>
                    ))}
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
