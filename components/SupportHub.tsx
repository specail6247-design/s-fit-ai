'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa' | 'report'>('guide');

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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[100] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">SUPPORT HUB</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Assistance & Resources</p>
              </div>
              <button
                onClick={() => setSupportHubOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-gray-400">close</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 overflow-x-auto scrollbar-hide">
              {[
                { id: 'guide', label: 'Guide', icon: 'menu_book' },
                { id: 'caution', label: 'Caution', icon: 'warning' },
                { id: 'qa', label: 'Q&A', icon: 'help' },
                { id: 'report', label: 'Report', icon: 'flag' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 min-w-[80px] py-4 text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-2 transition-colors relative ${
                    activeTab === tab.id ? 'text-[#ecab13] bg-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ecab13]" />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <AnimatePresence mode="wait">
                {activeTab === 'guide' && <UserGuide key="guide" />}
                {activeTab === 'caution' && <CautionPanel key="caution" />}
                {activeTab === 'qa' && <QAPanel key="qa" />}
                {activeTab === 'report' && <ReportIssueForm key="report" />}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-black/40 text-center">
              <p className="text-[10px] text-gray-600">S_FIT AI v1.0.0 • Service Essentials</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// --- Sub-components ---

function UserGuide() {
  const steps = [
    { title: 'Upload Photo', desc: 'Upload a full-body photo of yourself. Ensure good lighting and clear visibility.', icon: 'upload_file' },
    { title: 'Select Garment', desc: 'Choose a clothing item from our luxury collection or upload your own.', icon: 'checkroom' },
    { title: 'AI Processing', desc: 'Our AI analyzes your body shape and the garment to create a realistic fit.', icon: 'psychology' },
    { title: 'Interactive View', desc: 'Zoom, rotate, and explore the fit details in high resolution.', icon: '3d_rotation' },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="bg-white/5 rounded-xl p-6 border border-white/10 aspect-square flex flex-col items-center justify-center text-center mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ecab13]/10 to-transparent opacity-20" />
        <span className="material-symbols-outlined text-6xl text-[#ecab13] mb-4">{steps[currentStep].icon}</span>
        <h3 className="text-xl font-bold text-white mb-2">{steps[currentStep].title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{steps[currentStep].desc}</p>
      </div>

      <div className="flex justify-between items-center bg-black/20 p-2 rounded-full border border-white/10">
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
        </button>
        <div className="flex gap-2">
            {steps.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentStep ? 'bg-[#ecab13]' : 'bg-gray-700'}`} />
            ))}
        </div>
        <button
          onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={currentStep === steps.length - 1}
          className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
        </button>
      </div>
    </motion.div>
  );
}

function CautionPanel() {
  const warnings = [
    { title: 'Lighting', desc: 'Avoid backlighting. Ensure your face and body are evenly lit.', icon: 'lightbulb' },
    { title: 'Distance', desc: 'Stand 2-3 meters away from the camera for the best body tracking.', icon: 'straighten' },
    { title: 'Clothing', desc: 'Wear tight-fitting clothes for accurate body measurements.', icon: 'accessibility_new' },
    { title: 'Background', desc: 'Use a plain background if possible to help the AI separate you.', icon: 'wallpaper' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
      {warnings.map((warn, i) => (
        <div key={i} className="flex gap-4 p-4 bg-red-900/10 border border-red-500/20 rounded-xl items-start">
            <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                <span className="material-symbols-outlined">{warn.icon}</span>
            </div>
            <div>
                <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-1">{warn.title}</h4>
                <p className="text-xs text-gray-400">{warn.desc}</p>
            </div>
        </div>
      ))}
    </motion.div>
  );
}

function QAPanel() {
  const faqs = [
    { q: 'Is my photo saved?', a: 'No, your photos are processed in real-time and deleted after the session unless you choose to save them to your private vault.' },
    { q: 'How accurate is the sizing?', a: 'Our AI estimates measurements with 95% accuracy compared to manual tape measurements when guidelines are followed.' },
    { q: 'Can I try multiple items?', a: 'Yes, you can swap garments instantly once your digital twin is generated.' },
    { q: 'What is the "Luxury Line"?', a: 'The Luxury Line features exclusive high-end brands with enhanced texture rendering and physics simulation.' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-2">
      {faqs.map((faq, i) => (
        <details key={i} className="group bg-white/5 rounded-lg border border-white/10 overflow-hidden">
          <summary className="p-4 cursor-pointer flex justify-between items-center hover:bg-white/5 transition-colors">
            <span className="text-sm font-bold text-gray-200">{faq.q}</span>
            <span className="material-symbols-outlined text-gray-500 group-open:rotate-180 transition-transform">expand_more</span>
          </summary>
          <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5">
            {faq.a}
          </div>
        </details>
      ))}
    </motion.div>
  );
}

function ReportIssueForm() {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const res = await fetch('/api/support/report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, description }),
            });
            if (!res.ok) throw new Error('Failed');
            setStatus('success');
            setSubject('');
            setDescription('');
            setTimeout(() => setStatus('idle'), 3000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="mb-6 p-4 bg-blue-900/10 border border-blue-500/20 rounded-xl">
                <h4 className="text-sm font-bold text-blue-400 mb-1">We value your feedback</h4>
                <p className="text-xs text-gray-400">Found a bug or have a suggestion? Let us know directly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest">Subject</label>
                    <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-sm text-white focus:border-[#ecab13] outline-none"
                        required
                    >
                        <option value="" disabled>Select a topic...</option>
                        <option value="Bug Report">Bug Report</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="Account Issue">Account Issue</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-sm text-white focus:border-[#ecab13] outline-none min-h-[150px] resize-none"
                        placeholder="Describe the issue in detail..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting' || status === 'success'}
                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                        status === 'success' ? 'bg-green-600 text-white' :
                        status === 'error' ? 'bg-red-600 text-white' :
                        'bg-white text-black hover:bg-gray-200'
                    }`}
                >
                    {status === 'submitting' ? 'Sending...' :
                     status === 'success' ? 'Report Sent ✓' :
                     status === 'error' ? 'Failed - Try Again' :
                     'Submit Report'}
                </button>
            </form>
        </motion.div>
    );
}
