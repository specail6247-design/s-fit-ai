"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"legal" | "report" | "guide" | "qa">("legal");

  const [issue, setIssue] = useState("");

  const toggleHub = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleHub}
        aria-label="Support Hub"
        className="fixed bottom-6 right-6 z-[100] flex size-12 items-center justify-center rounded-full bg-[#101622]/60 text-white backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-[#256af4]/80 transition-colors"
      >
        <span className="material-symbols-outlined">help</span>
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
              onClick={toggleHub}
              className="fixed inset-0 z-[101] bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-[102] w-full max-w-md bg-[#101622] border-l border-white/10 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
                <button
                  onClick={toggleHub}
                  aria-label="Close"
                  className="flex size-8 items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              {/* Navigation */}
              <div className="flex px-6 pt-4 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {(["legal", "report", "guide", "qa"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-sm font-medium capitalize whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === tab
                        ? "border-[#256af4] text-[#256af4]"
                        : "border-transparent text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "legal" && "Legal & Safety"}
                    {tab === "report" && "Report Issue"}
                    {tab === "guide" && "User Guide"}
                    {tab === "qa" && "Q&A"}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 text-gray-300">
                {activeTab === "legal" && (
                  <div className="space-y-6">
                    <div className="rounded-xl bg-[#256af4]/10 border border-[#256af4]/20 p-4 flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#256af4]">shield_lock</span>
                      <div>
                        <h3 className="text-white font-medium mb-1">Data Safety</h3>
                        <p className="text-sm text-gray-400">
                          Photos are processed securely and not shared. We prioritize your privacy.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-medium mb-2">Privacy Policy</h3>
                      <p className="text-sm text-gray-400">
                        We collect minimal data required to provide the virtual fitting service. Images are processed temporarily and are not stored permanently unless explicitly saved to your Vault. We do not sell your data to third parties.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-white font-medium mb-2">Terms of Service</h3>
                      <p className="text-sm text-gray-400">
                        By using S_FIT AI, you agree to our terms. The AI-generated results are simulations and may not perfectly reflect real-life fit. Use the service responsibly.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "report" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Issue reported. Thank you for your feedback!");
                      setIssue("");
                    }}
                    className="space-y-4"
                  >
                    <p className="text-sm text-gray-400">
                      Encountered a bug or have a suggestion? Let us know to help improve S_FIT AI.
                    </p>
                    <textarea
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      placeholder="Describe the issue..."
                      className="w-full h-32 rounded-lg bg-black/40 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[#256af4] transition-colors resize-none"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-[#256af4] py-3 text-sm font-medium text-white hover:bg-[#256af4]/90 transition-colors"
                    >
                      Submit Report
                    </button>
                  </form>
                )}

                {activeTab === "guide" && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-400">
                      Learn how to get the most out of your virtual fitting experience.
                    </p>
                    <div className="aspect-video rounded-xl bg-black/40 border border-white/10 flex items-center justify-center flex-col gap-2">
                       <span className="material-symbols-outlined text-4xl text-gray-500">photo_camera</span>
                       <span className="text-sm text-gray-500 font-mono">USER GUIDE CAROUSEL</span>
                    </div>
                    <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-3 flex items-start gap-3">
                       <span className="material-symbols-outlined text-yellow-500 text-sm mt-0.5">warning</span>
                       <p className="text-xs text-yellow-500/90">
                         Caution: Ensure good lighting for best results.
                       </p>
                    </div>
                  </div>
                )}

                {activeTab === "qa" && (
                  <div className="space-y-4">
                    {[
                      { q: "How accurate is the sizing?", a: "The AI provides a highly accurate simulation, but we recommend checking the brand's official size guide." },
                      { q: "Are my photos saved?", a: "No, photos are processed temporarily unless you save them to The Vault." },
                      { q: "What brands are supported?", a: "We support major brands like ZARA, Gucci, and Uniqlo. More coming soon." },
                    ].map((item, i) => (
                      <details key={i} className="group border-b border-white/10 pb-4">
                        <summary className="cursor-pointer text-white font-medium text-sm flex justify-between items-center list-none [&::-webkit-details-marker]:hidden">
                          {item.q}
                          <span className="material-symbols-outlined text-gray-500 group-open:rotate-180 transition-transform">expand_more</span>
                        </summary>
                        <p className="mt-2 text-sm text-gray-400">
                          {item.a}
                        </p>
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
