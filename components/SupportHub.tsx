'use client';

// S_FIT AI - Support Hub
// Slide-out drawer with Guide, Cautions, and Q&A

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { ease: 'easeInOut' as const, duration: 0.3 }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
  exit: { opacity: 0, y: -10 }
};

export function SupportHub() {
  const { isSupportOpen, setSupportOpen, supportTab, setSupportTab } = useStore();

  const handleClose = () => setSupportOpen(false);

  // Tabs Configuration
  const tabs = [
    { id: 'guide', label: 'Guide', icon: '📘' },
    { id: 'caution', label: 'Caution', icon: '⚠️' },
    { id: 'qa', label: 'Q&A', icon: '❓' },
    { id: 'issue', label: 'Report', icon: '🐞' }
  ] as const;

  return (
    <AnimatePresence>
      {isSupportOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
                <p className="text-xs text-gray-400">Assistance & Resources</p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSupportTab(tab.id)}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                    supportTab === tab.id ? 'text-white bg-white/5' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <span className="block text-lg mb-1">{tab.icon}</span>
                  {tab.label}
                  {supportTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={supportTab}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {supportTab === 'guide' && <GuideSection />}
                  {supportTab === 'caution' && <CautionSection />}
                  {supportTab === 'qa' && <QASection />}
                  {supportTab === 'issue' && <IssueSection />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 text-center">
              <p className="text-[10px] text-gray-600">
                S_FIT AI Support System v1.0 • <a href="#" className="hover:text-white underline">Privacy Policy</a>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// --- Sub-Components ---

function GuideSection() {
  const steps = [
    { title: 'Upload Photo', desc: 'Use a clear full-body photo with good lighting. Stand straight with arms slightly away from your body.', icon: '📸' },
    { title: 'Select Garment', desc: 'Browse our exclusive collection or upload your own garment image (front view recommended).', icon: '👕' },
    { title: 'Instant Fit', desc: 'Our AI analyzes your body shape and drapes the fabric realistically in seconds.', icon: '⚡' },
    { title: 'Interactive View', desc: 'Zoom in to see fabric details. Rotate the model in 3D mode (coming soon).', icon: '🔍' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white mb-4">How to Fit</h3>
      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#007AFF]/20 text-[#007AFF] flex items-center justify-center font-bold text-sm shrink-0">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <span>{step.icon}</span> {step.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CautionSection() {
  const warnings = [
    { title: 'Lighting Matters', desc: 'Avoid backlighting or dark shadows. Even lighting produces the best results.', level: 'critical' },
    { title: 'Body Posture', desc: 'Complex poses (sitting, crossing arms) may reduce fitting accuracy.', level: 'medium' },
    { title: 'Tight Clothing', desc: 'Wear form-fitting clothes for the most accurate body measurements.', level: 'medium' },
    { title: 'Privacy Note', desc: 'Your photos are processed temporarily and deleted after the session.', level: 'info' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-yellow-500">⚠️</span> Best Practices
      </h3>
      <div className="space-y-3">
        {warnings.map((warn, idx) => (
          <div key={idx} className={`p-4 rounded-lg border ${
            warn.level === 'critical' ? 'bg-red-500/10 border-red-500/20' :
            warn.level === 'info' ? 'bg-blue-500/10 border-blue-500/20' :
            'bg-yellow-500/10 border-yellow-500/20'
          }`}>
            <h4 className={`text-sm font-bold mb-1 ${
               warn.level === 'critical' ? 'text-red-400' :
               warn.level === 'info' ? 'text-blue-400' :
               'text-yellow-400'
            }`}>
              {warn.title}
            </h4>
            <p className="text-xs text-gray-300 opacity-80">{warn.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function QASection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: 'Is this service free?', a: 'Yes, S_FIT NEO is currently in beta and free for up to 5 tries per day.' },
    { q: 'How accurate is the sizing?', a: 'Our AI estimates fit based on visual data. It is for visualization, not precise tailoring.' },
    { q: 'Do you save my photos?', a: 'No. Photos are processed in memory and discarded immediately after your session ends.' },
    { q: 'Why did the generation fail?', a: 'Common causes: blurry photos, multiple people in frame, or unsupported file formats.' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h3>
      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex justify-between items-center p-4 text-left hover:bg-white/5 transition-colors"
            >
              <span className="text-sm font-medium text-white">{faq.q}</span>
              <span className={`text-gray-400 transform transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

function IssueSection() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-white mb-4">Report an Issue</h3>
            <p className="text-sm text-gray-400 mb-4">
                Encountered a bug or have feedback? Let us know.
            </p>
            <form className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Topic</label>
                    <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none">
                        <option>Bug Report</option>
                        <option>Feature Request</option>
                        <option>General Feedback</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Message</label>
                    <textarea
                        rows={5}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none resize-none"
                        placeholder="Describe your issue..."
                    />
                </div>
                <button type="button" className="w-full bg-[#007AFF] hover:bg-[#0066cc] text-white font-bold py-3 rounded-lg transition-colors" onClick={() => alert('Feedback sent! Thank you.')}>
                    Submit Report
                </button>
            </form>
        </div>
    )
}
