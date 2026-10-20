import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHubDrawer({ isOpen, onClose }: SupportHubDrawerProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');
  const [openQA, setOpenQA] = useState<number | null>(null);

  const toggleQA = (index: number) => {
    setOpenQA(openQA === index ? null : index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 z-[110] w-full max-w-md h-full bg-[#0A0A0A] border-l border-white/10 shadow-2xl overflow-y-auto flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#0A0A0A]/90 backdrop-blur-md z-10">
              <h2 className="text-xl font-display font-light text-white tracking-wide">
                Support Hub
              </h2>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Close Support Hub"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="p-6 flex-1">
              {/* Tabs */}
              <div className="flex border-b border-white/10 mb-8">
                {(['guide', 'caution', 'qa'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 pb-3 text-sm tracking-widest uppercase transition-colors relative ${
                      activeTab === tab ? 'text-white font-medium' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9B037]"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Guide Tab */}
                  {activeTab === 'guide' && (
                    <div className="space-y-8">
                      <h3 className="text-lg font-light text-white/90">How to Fit</h3>
                      <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[15px] before:w-[1px] before:bg-white/10">
                        {[
                          { title: "Select Garment", desc: "Choose an item from the SPA or Luxury line." },
                          { title: "Upload Photo", desc: "Ensure good lighting and a clear view of your body." },
                          { title: "AI Processing", desc: "Our engine maps the garment to your unique proportions." },
                          { title: "Review Fit", desc: "Inspect the 3D visualization for drape and sizing." }
                        ].map((step, i) => (
                          <div key={i} className="relative pl-10">
                            <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#1A1A1A] border border-white/20 flex items-center justify-center text-xs text-[#C9B037] font-mono">
                              0{i + 1}
                            </div>
                            <h4 className="text-white font-medium mb-1">{step.title}</h4>
                            <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Caution Tab */}
                  {activeTab === 'caution' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-light text-white/90 mb-4">Important Guidelines</h3>

                      <div className="bg-[#1A1A1A] border border-red-500/20 rounded-xl p-5 flex gap-4">
                        <div className="text-red-400 mt-1">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">Lighting & Camera</h4>
                          <p className="text-sm text-white/60 leading-relaxed">
                            For accurate measurements, avoid harsh shadows or backlighting. Maintain a distance of 1.5 to 2 meters from the camera.
                          </p>
                        </div>
                      </div>

                      <div className="bg-[#1A1A1A] border border-orange-500/20 rounded-xl p-5 flex gap-4">
                         <div className="text-orange-400 mt-1">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">Clothing Restrictions</h4>
                          <p className="text-sm text-white/60 leading-relaxed">
                            Wear form-fitting clothes. Baggy clothing will distort the AI&apos;s estimation of your body shape.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Q&A Tab */}
                  {activeTab === 'qa' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white/90 mb-6">Frequently Asked Questions</h3>
                      {[
                        { q: "Is my data secure?", a: "Yes. All uploaded photos are processed ephemerally and deleted immediately after the session." },
                        { q: "How accurate is the sizing?", a: "Our AI model achieves 94% accuracy compared to physical measurements when guidelines are followed." },
                        { q: "Can I try on luxury items?", a: "Luxury items are available to premium members or those with an invite code." },
                        { q: "What devices are supported?", a: "S_FIT works on any modern browser on mobile, tablet, or desktop." }
                      ].map((item, i) => (
                        <div key={i} className="border-b border-white/10 pb-4">
                          <button
                            onClick={() => toggleQA(i)}
                            className="w-full flex justify-between items-center text-left py-2 hover:text-white/80 transition-colors"
                          >
                            <span className="text-sm font-medium text-white/90">{item.q}</span>
                            <motion.span
                              animate={{ rotate: openQA === i ? 180 : 0 }}
                              className="text-white/50"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </motion.span>
                          </button>
                          <AnimatePresence>
                            {openQA === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <p className="text-sm text-white/50 pt-2 leading-relaxed">
                                  {item.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-6 border-t border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md">
              <p className="text-xs text-center text-white/30 font-mono">
                S_FIT AI SYSTEM <br/>
                SUPPORT MODULE v2.0
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
