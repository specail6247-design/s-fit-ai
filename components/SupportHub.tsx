import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export const SupportHub: React.FC = () => {
  const { isSupportHubOpen, toggleSupportHub } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa' | 'report'>('guide');

  // Report Form State
  const [reportSubject, setReportSubject] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportSubject || !reportDescription) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/support/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: reportSubject,
          description: reportDescription,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      setSubmitSuccess(true);
      setReportSubject('');
      setReportDescription('');

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSupportHubOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={() => toggleSupportHub(false)}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-transparent to-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#007AFF]/20 flex items-center justify-center text-[#007AFF]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
              <p className="text-xs text-gray-400">Assistance & Feedback</p>
            </div>
          </div>
          <button
            onClick={() => toggleSupportHub(false)}
            className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 overflow-x-auto custom-scrollbar">
          {(['guide', 'caution', 'qa', 'report'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-2 text-xs font-bold uppercase tracking-wider transition-colors min-w-[80px] ${
                activeTab === tab
                  ? 'bg-white/5 text-[#007AFF] border-b-2 border-[#007AFF]'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              {tab === 'qa' ? 'Q&A' : tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-black/20">

          {activeTab === 'guide' && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-[#007AFF] font-bold mb-2 flex items-center gap-2">
                  <span>📸</span> Best Photo Practices
                </h3>
                <ul className="text-sm text-gray-300 space-y-2 list-disc pl-4">
                  <li>Use a full-body photo with good lighting.</li>
                  <li>Wear fitted clothing for best body estimation.</li>
                  <li>Ensure the background is relatively simple.</li>
                  <li>Avoid loose or baggy clothes if possible.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-[#007AFF] font-bold mb-2 flex items-center gap-2">
                  <span>👕</span> Garment Selection
                </h3>
                <ul className="text-sm text-gray-300 space-y-2 list-disc pl-4">
                  <li>Upload a clear front-view image of the item.</li>
                  <li>&quot;Flat lay&quot; or &quot;ghost mannequin&quot; photos work best.</li>
                  <li>Ensure the entire garment is visible.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'caution' && (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-500">
                <h3 className="font-bold flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  Beta Limitation
                </h3>
                <p className="text-sm opacity-90">
                  Complex poses (e.g., crossing arms, sitting) may result in distortion. Stand straight with arms slightly away from your body for optimal results.
                </p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
                <h3 className="font-bold flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                  Prohibited Content
                </h3>
                <p className="text-sm opacity-90">
                  Uploading explicit, offensive, or illegal content will result in an immediate ban.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="space-y-4">
               {[
                 { q: "Is my photo stored?", a: "No. Photos are processed in RAM and discarded immediately after your session." },
                 { q: "Why is the face blurred?", a: "For privacy protection in public demos, we may apply face obfuscation." },
                 { q: "Can I use this commercially?", a: "The current version is for personal use only." }
               ].map((item, idx) => (
                 <div key={idx} className="bg-white/5 rounded-lg p-4">
                   <h4 className="text-white font-bold text-sm mb-1">{item.q}</h4>
                   <p className="text-gray-400 text-xs">{item.a}</p>
                 </div>
               ))}
            </div>
          )}

          {activeTab === 'report' && (
            <div className="h-full flex flex-col">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
                 <p className="text-blue-400 text-xs">
                   Found a bug? Let us know. Your feedback helps us improve the S_FIT engine.
                 </p>
              </div>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-black mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-500">Report Sent!</h3>
                  <p className="text-gray-400 text-sm">Thank you for your feedback. We&apos;ll look into it shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitReport} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Subject</label>
                    <input
                      type="text"
                      value={reportSubject}
                      onChange={(e) => setReportSubject(e.target.value)}
                      placeholder="e.g., Try-on failed, UI glitch..."
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                    <textarea
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      placeholder="Describe what happened..."
                      rows={6}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none transition-colors resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
                      isSubmitting
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-[#007AFF] hover:bg-[#0066cc] text-white shadow-[0_0_20px_rgba(0,122,255,0.3)]'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Report'}
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
