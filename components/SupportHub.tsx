'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronDown, ChevronUp, Camera, Sun, Ruler } from 'lucide-react';

const QA_DATA = [
  {
    q: "How accurate is the virtual fit?",
    a: "Our AI analyzes your body shape and the garment's 3D mesh to provide a 95% accurate representation of how the item will drape and fit in real life."
  },
  {
    q: "Do I need a special camera?",
    a: "No, a standard smartphone camera works perfectly. Just ensure good lighting and a clear view of your full body for the best results."
  },
  {
    q: "Are my photos stored?",
    a: "Your privacy is our priority. Photos are processed in real-time for the fitting and are never stored on our servers."
  }
];

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'qa'>('guide');
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#050505] border border-[#C9B037]/30 text-[#C9B037] p-3 rounded-full hover:bg-[#C9B037] hover:text-black transition-all shadow-lg"
        aria-label="Open Support Hub"
      >
        <HelpCircle size={24} />
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#050505] border-l border-[#C9B037]/20 z-50 overflow-y-auto flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#050505] sticky top-0 z-10">
                <h2 className="text-2xl text-[#C9B037] uppercase tracking-widest font-serif">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close Support Hub"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-sm tracking-widest uppercase transition-colors ${activeTab === 'guide' ? 'text-[#C9B037] border-b-2 border-[#C9B037]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  How to Fit
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`flex-1 py-4 text-sm tracking-widest uppercase transition-colors ${activeTab === 'qa' ? 'text-[#C9B037] border-b-2 border-[#C9B037]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Q&A
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                {activeTab === 'guide' ? (
                  <div className="space-y-8">
                    {/* Carousel logic simplified to vertical steps for robustness, matching "visual step-by-step" */}
                    <div className="space-y-6">
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h3 className="text-[#C9B037] uppercase text-sm tracking-widest mb-2 font-serif">Step 1: Front Pose</h3>
                        <p className="text-gray-300 text-sm">Stand straight facing the camera with arms slightly away from your body.</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h3 className="text-[#C9B037] uppercase text-sm tracking-widest mb-2 font-serif">Step 2: Garment Selection</h3>
                        <p className="text-gray-300 text-sm">Choose from our curated collection of Masterpiece items.</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h3 className="text-[#C9B037] uppercase text-sm tracking-widest mb-2 font-serif">Step 3: Analyze</h3>
                        <p className="text-gray-300 text-sm">Allow our AI to weave the digital fabric onto your avatar.</p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-red-400 uppercase text-sm tracking-widest mb-4 flex items-center gap-2"><X size={16} /> Important Cautions</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 bg-red-950/20 p-3 rounded border border-red-900/30">
                          <Sun className="text-red-400 mt-0.5 shrink-0" size={18} />
                          <div>
                            <h4 className="text-sm font-bold text-white">Lighting</h4>
                            <p className="text-xs text-gray-400">Avoid strong backlighting or deep shadows. Even lighting works best.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 bg-red-950/20 p-3 rounded border border-red-900/30">
                          <Camera className="text-red-400 mt-0.5 shrink-0" size={18} />
                          <div>
                            <h4 className="text-sm font-bold text-white">Camera Angle</h4>
                            <p className="text-xs text-gray-400">Position the camera at chest height. Avoid high or low angles.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 bg-red-950/20 p-3 rounded border border-red-900/30">
                          <Ruler className="text-red-400 mt-0.5 shrink-0" size={18} />
                          <div>
                            <h4 className="text-sm font-bold text-white">Distance</h4>
                            <p className="text-xs text-gray-400">Stand about 2 meters away so your full body is visible in the frame.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {QA_DATA.map((item, idx) => (
                      <div key={idx} className="border border-white/10 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setExpandedQ(expandedQ === idx ? null : idx)}
                          className="w-full text-left p-4 bg-white/5 hover:bg-white/10 transition-colors flex justify-between items-center"
                        >
                          <span className="font-serif text-[#C9B037]">{item.q}</span>
                          {expandedQ === idx ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                        </button>
                        <AnimatePresence>
                          {expandedQ === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="bg-[#050505]"
                            >
                              <div className="p-4 text-sm text-gray-300">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
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
