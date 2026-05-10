"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"guide" | "caution" | "qa">("guide");

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black/50 backdrop-blur-md border border-white/20 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all group shadow-xl"
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring" as const, damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 flex justify-between items-center border-b border-white/10">
                <h2 className="text-xl font-bold tracking-widest uppercase">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors p-2"
                >
                  ✕
                </button>
              </div>

              <div className="flex border-b border-white/10">
                {(["guide", "caution", "qa"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${
                      activeTab === tab ? "text-white border-b-2 border-white" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "guide" && (
                      <div className="space-y-6">
                        <h3 className="text-sm text-white/50 uppercase tracking-widest mb-4">How to Fit</h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="text-lg mb-2">📸</div>
                            <h4 className="font-bold mb-1">1. The Perfect Shot</h4>
                            <p className="text-sm text-white/60">Take a clear, full-body photo against a plain background.</p>
                          </div>
                          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="text-lg mb-2">👕</div>
                            <h4 className="font-bold mb-1">2. Select Garment</h4>
                            <p className="text-sm text-white/60">Choose an item from our catalog or upload your own.</p>
                          </div>
                          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="text-lg mb-2">✨</div>
                            <h4 className="font-bold mb-1">3. AI Magic</h4>
                            <p className="text-sm text-white/60">Wait a few seconds while our AI generates your virtual fit.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "caution" && (
                      <div className="space-y-6">
                        <h3 className="text-sm text-white/50 uppercase tracking-widest mb-4">Best Practices</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <span className="text-xl">⚠️</span>
                            <div>
                              <h4 className="font-bold text-red-200 mb-1">Avoid Bad Lighting</h4>
                              <p className="text-sm text-white/60">Backlit or deeply shadowed photos will reduce AI accuracy.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                            <span className="text-xl">📏</span>
                            <div>
                              <h4 className="font-bold text-yellow-200 mb-1">Camera Distance</h4>
                              <p className="text-sm text-white/60">Stand exactly 2-3 meters away for accurate sizing.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                            <span className="text-xl">🧍</span>
                            <div>
                              <h4 className="font-bold text-white mb-1">A-Pose Recommended</h4>
                              <p className="text-sm text-white/60">Stand with arms slightly away from the body.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "qa" && (
                      <div className="space-y-4">
                        <h3 className="text-sm text-white/50 uppercase tracking-widest mb-4">FAQ</h3>
                        {[
                          { q: "Are my photos stored?", a: "No, all uploaded photos are processed ephemerally and deleted immediately." },
                          { q: "How accurate is the sizing?", a: "Our AI estimates fit based on visual proportions. Easy Fit mode provides actual size recommendations." },
                          { q: "Can I try my own clothes?", a: "Yes, you can upload flat-lay photos of garments in the Custom mode." }
                        ].map((faq, i) => (
                          <div key={i} className="border-b border-white/10 pb-4">
                            <h4 className="font-bold mb-2 text-sm">{faq.q}</h4>
                            <p className="text-sm text-white/60">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
