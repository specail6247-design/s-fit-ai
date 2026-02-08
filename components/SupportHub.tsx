'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

type Tab = 'guide' | 'caution' | 'qna';

// --- TAB CONTENT COMPONENTS (Moved outside to prevent re-creation) ---

const GuideContent = () => (
  <div className="space-y-6">
      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-sm font-bold text-[#007AFF] mb-2">01. Prepare Your Space</h3>
          <p className="text-xs text-gray-400">Find a well-lit area with a simple background. Ensure your full body is visible.</p>
      </div>
      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-sm font-bold text-[#007AFF] mb-2">02. Upload & Analyze</h3>
          <p className="text-xs text-gray-400">Upload a clear photo. Our AI analyzes your pose and proportions instantly.</p>
      </div>
      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-sm font-bold text-[#007AFF] mb-2">03. Virtual Fitting</h3>
          <p className="text-xs text-gray-400">Select garments to see how they fit on your digital twin with physics simulation.</p>
      </div>
  </div>
);

const CautionContent = () => (
  <div className="space-y-4">
      <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <span className="text-2xl">⚠️</span>
          <div>
              <h4 className="text-sm font-bold text-red-400">Lighting Warning</h4>
              <p className="text-[10px] text-gray-400 mt-1">Avoid backlighting or extremely dark rooms. This affects body tracking accuracy.</p>
          </div>
      </div>
      <div className="flex items-start gap-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
          <span className="text-2xl">📏</span>
          <div>
              <h4 className="text-sm font-bold text-orange-400">Distance Check</h4>
              <p className="text-[10px] text-gray-400 mt-1">Stand 2-3 meters away from the camera for full-body capture.</p>
          </div>
      </div>
      <div className="flex items-start gap-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <span className="text-2xl">👗</span>
          <div>
              <h4 className="text-sm font-bold text-yellow-400">Clothing Fit</h4>
              <p className="text-[10px] text-gray-400 mt-1">Wear tight-fitting clothes for the most accurate body measurements.</p>
          </div>
      </div>
  </div>
);

const QnAContent = () => {
  const faqs = [
      { q: "Is my photo stored?", a: "No. Your photos are processed in real-time and not permanently stored on our servers." },
      { q: "How accurate is the sizing?", a: "Our AI is 95% accurate when proper lighting and distance guidelines are followed." },
      { q: "Can I use this on mobile?", a: "Yes, S_FIT NEO is optimized for both mobile and desktop browsers." },
  ];

  return (
      <div className="space-y-2">
          {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                  <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/5 transition-colors">
                      <span className="text-xs font-bold text-gray-200">{faq.q}</span>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 pt-0 text-[10px] text-gray-400 leading-relaxed border-t border-white/5">
                      {faq.a}
                  </div>
              </details>
          ))}
      </div>
  );
};

export default function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('guide');

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSupportHubOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
            />

            {/* Drawer */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[100] flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Guidance & Help</p>
                    </div>
                    <button onClick={() => setSupportHubOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                        ✕
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex p-2 gap-2 bg-black/40">
                    {(['guide', 'caution', 'qna'] as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                                activeTab === tab
                                ? 'bg-[#007AFF] text-white shadow-lg'
                                : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                            }`}
                        >
                            {tab === 'qna' ? 'Q&A' : tab}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'guide' && <GuideContent />}
                            {activeTab === 'caution' && <CautionContent />}
                            {activeTab === 'qna' && <QnAContent />}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 text-center">
                    <p className="text-[9px] text-gray-600">S_FIT NEO &copy; 2024. Need human help? <a href="#" className="text-[#007AFF] hover:underline">Contact Support</a></p>
                </div>
            </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
