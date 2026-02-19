"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useState } from "react";

// --- Data ---

const GUIDE_STEPS = [
  {
    title: "Vibe Check",
    description: "Upload a clear full-body selfie. Ensure good lighting and a simple background for best results.",
  },
  {
    title: "Select Style",
    description: "Browse our curated collection of luxury items or upload your own inspiration.",
  },
  {
    title: "Digital Twin",
    description: "Our AI generates your hyper-realistic digital twin wearing the selected item.",
  },
  {
    title: "Share & Shop",
    description: "Download the look or shop directly from our partner links.",
  },
];

const CAUTIONS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
    ),
    title: "Lighting",
    description: "Avoid strong backlighting. Ensure your face and body are evenly lit.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    ),
    title: "Distance",
    description: "Stand about 6-8 feet away from the camera. Capture your full body from head to toe.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    ),
    title: "Background",
    description: "A plain, contrasting background works best. Avoid cluttered environments.",
  },
];

const FAQS = [
  {
    question: "How accurate is the sizing?",
    answer: "Our AI estimates size based on your proportions, but we recommend checking the brand's specific size chart for the perfect fit.",
  },
  {
    question: "Is my photo stored?",
    answer: "Your photos are processed securely and are only used for the fitting session. We do not store your personal photos permanently.",
  },
  {
    question: "Can I try on any item?",
    answer: "You can try on items from our supported catalogue. We are constantly adding new brands and styles.",
  },
  {
    question: "Is it free?",
    answer: "You have a daily limit of free try-ons. Upgrade to Member Access for unlimited fittings and premium features.",
  },
];

export default function SupportHub() {
  const {
    isSupportHubOpen,
    setSupportHubOpen,
    supportHubTab,
    setSupportHubTab,
  } = useStore();

  const [currentGuideStep, setCurrentGuideStep] = useState(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const nextStep = () => {
    setCurrentGuideStep((prev) => (prev + 1) % GUIDE_STEPS.length);
  };

  const prevStep = () => {
    setCurrentGuideStep((prev) => (prev - 1 + GUIDE_STEPS.length) % GUIDE_STEPS.length);
  };

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setSupportHubOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-zinc-900/95 border-l border-white/10 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl font-mono uppercase tracking-wider text-white">
                Support Hub
              </h2>
              <button
                onClick={() => setSupportHubOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5">
              {(['guide', 'caution', 'qa'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSupportHubTab(tab)}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                    supportHubTab === tab ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {tab === 'guide' ? 'User Guide' : tab === 'caution' ? 'Caution' : 'Q&A'}
                  {supportHubTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {supportHubTab === "guide" && (
                  <motion.div
                    key="guide"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-mono text-white">
                        {currentGuideStep + 1}
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {GUIDE_STEPS[currentGuideStep].title}
                      </h3>
                      <p className="text-white/60 leading-relaxed">
                        {GUIDE_STEPS[currentGuideStep].description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                        <button onClick={prevStep} className="p-2 text-white/50 hover:text-white transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                        </button>
                        <div className="flex space-x-2">
                            {GUIDE_STEPS.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentGuideStep ? 'bg-white' : 'bg-white/20'}`}
                                />
                            ))}
                        </div>
                        <button onClick={nextStep} className="p-2 text-white/50 hover:text-white transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                        </button>
                    </div>
                  </motion.div>
                )}

                {supportHubTab === "caution" && (
                  <motion.div
                    key="caution"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {CAUTIONS.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-4 bg-white/5 p-4 rounded-lg">
                            <div className="text-yellow-500 mt-1">
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                                <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                  </motion.div>
                )}

                {supportHubTab === "qa" && (
                  <motion.div
                    key="qa"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    {FAQS.map((faq, idx) => (
                        <div key={idx} className="border border-white/10 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setExpandedFaqIndex(expandedFaqIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="text-sm font-medium text-white">{faq.question}</span>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`transition-transform duration-200 ${expandedFaqIndex === idx ? 'rotate-180' : ''}`}
                                >
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>
                            <AnimatePresence>
                                {expandedFaqIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-black/20"
                                    >
                                        <div className="p-4 pt-0 text-xs text-white/60 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
