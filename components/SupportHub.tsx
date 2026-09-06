import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'faq'>('guide');

  const guides = [
    { id: 1, title: 'Lighting', desc: 'Ensure bright, even lighting on your face and body.', icon: '💡' },
    { id: 2, title: 'Distance', desc: 'Stand 2-3 meters from the camera for full-body scans.', icon: '📸' },
    { id: 3, title: 'Pose', desc: 'Stand straight with arms slightly apart (A-pose).', icon: '🧍' },
  ];

  const faqs = [
    { q: 'What is Cinematic Mode?', a: 'It turns your photo into a 4-second runway video.' },
    { q: 'How long does it take?', a: 'Standard fitting takes 5s. Video generation takes ~30s.' },
    { q: 'Is my data safe?', a: 'Photos are processed and deleted immediately unless saved to your vault.' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-colors border border-white/10 backdrop-blur-md"
      >
        Support
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
              className="fixed top-0 right-0 h-full w-[400px] max-w-[90vw] bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
                <h2 className="text-lg font-black tracking-widest uppercase">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  ✕
                </button>
              </div>

              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-xs font-mono tracking-widest uppercase transition-colors ${activeTab === 'guide' ? 'bg-white/5 text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  How to Fit
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`flex-1 py-4 text-xs font-mono tracking-widest uppercase transition-colors ${activeTab === 'faq' ? 'bg-white/5 text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Q&A
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'guide' ? (
                  <div className="space-y-8">
                    <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg flex gap-4 items-start">
                      <span className="text-2xl">⚠️</span>
                      <div>
                        <h4 className="text-red-400 font-bold text-sm mb-1 uppercase tracking-wider">Caution</h4>
                        <p className="text-xs text-gray-400">Poor lighting or incorrect distance will result in low-quality rendering. Please follow the guides below.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {guides.map(g => (
                        <div key={g.id} className="bg-white/5 p-4 rounded-lg border border-white/5 flex gap-4 items-center">
                          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-xl shrink-0">
                            {g.icon}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold mb-1">{g.id}. {g.title}</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">{g.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <details key={i} className="group bg-white/5 rounded-lg border border-white/5">
                        <summary className="p-4 cursor-pointer text-sm font-bold flex justify-between items-center list-none">
                          {faq.q}
                          <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5 mt-2">
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
