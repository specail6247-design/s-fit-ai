'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

type Tab = 'Help & Guide' | 'Report Issue' | 'Legal';
const TABS: Tab[] = ['Help & Guide', 'Report Issue', 'Legal'];

const LegalModal = ({ title, content, onClose }: { title: string, content: React.ReactNode, onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#111] rounded-t-2xl z-10">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">✕</button>
      </div>
      <div className="p-8 overflow-y-auto text-sm text-gray-300 leading-relaxed space-y-4 custom-scrollbar">
        {content}
      </div>
    </motion.div>
  </motion.div>
);

export default function SupportHub() {
  const { isSupportOpen, toggleSupport } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('Help & Guide');

  // Report Issue State
  const [reportSubject, setReportSubject] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportEmail, setReportEmail] = useState('');
  const [reportStatus, setReportStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Legal Modal State
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setReportStatus('success');
      setReportSubject('');
      setReportDescription('');
      setReportEmail('');
      setTimeout(() => setReportStatus('idle'), 3000);
    }, 1500);
  };

  // Prevent background scrolling when open
  React.useEffect(() => {
    if (isSupportOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSupportOpen]);

  return (
    <AnimatePresence>
      {isSupportOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSupport}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#050505]">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
                <p className="text-xs text-gray-400 mt-1">We are here to help.</p>
              </div>
              <button
                onClick={toggleSupport}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 bg-[#050505]">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                    activeTab === tab ? 'text-[#007AFF] bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'Help & Guide' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <span className="text-[#007AFF]">01.</span> Upload Photo
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          Upload a full-body photo of yourself. For best results, ensure good lighting and a clear view of your body shape. Avoid baggy clothes if possible.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <span className="text-[#007AFF]">02.</span> Select Garment
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          Upload a clear image of the garment you want to try on. Front-facing images work best.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <span className="text-[#007AFF]">03.</span> AI Magic
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          Our AI analyzes your pose and the garment&apos;s fabric to generate a realistic try-on result in seconds.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Report Issue' && (
                    <form onSubmit={handleReportSubmit} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Subject</label>
                        <input
                          type="text"
                          value={reportSubject}
                          onChange={(e) => setReportSubject(e.target.value)}
                          placeholder="e.g., Bug in Fitting Room"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#007AFF] transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                        <textarea
                          value={reportDescription}
                          onChange={(e) => setReportDescription(e.target.value)}
                          placeholder="Please describe the issue..."
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white h-32 resize-none focus:outline-none focus:border-[#007AFF] transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Email (Optional)</label>
                        <input
                          type="email"
                          value={reportEmail}
                          onChange={(e) => setReportEmail(e.target.value)}
                          placeholder="For follow-up"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#007AFF] transition-colors"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={reportStatus === 'submitting' || reportStatus === 'success'}
                        className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                          reportStatus === 'success'
                            ? 'bg-green-500 text-black'
                            : 'bg-[#007AFF] hover:bg-[#005bb5] text-white'
                        }`}
                      >
                        {reportStatus === 'submitting' ? 'Sending...' : reportStatus === 'success' ? 'Report Sent ✓' : 'Submit Report'}
                      </button>
                    </form>
                  )}

                  {activeTab === 'Legal' && (
                     <div className="space-y-4">
                        <button
                          onClick={() => setLegalModal('privacy')}
                          className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-between group transition-all"
                        >
                          <div className="text-left">
                            <h4 className="font-bold text-white group-hover:text-[#007AFF] transition-colors">Privacy Policy</h4>
                            <p className="text-xs text-gray-400 mt-1">Data usage and protection</p>
                          </div>
                          <span className="text-gray-500 group-hover:text-white transition-colors">→</span>
                        </button>

                        <button
                          onClick={() => setLegalModal('terms')}
                          className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-between group transition-all"
                        >
                          <div className="text-left">
                            <h4 className="font-bold text-white group-hover:text-[#007AFF] transition-colors">Terms of Service</h4>
                            <p className="text-xs text-gray-400 mt-1">Usage guidelines and agreements</p>
                          </div>
                          <span className="text-gray-500 group-hover:text-white transition-colors">→</span>
                        </button>

                        <div className="pt-4 border-t border-white/10">
                          <p className="text-xs text-gray-500 text-center">
                            By using S_FIT AI, you agree to our Terms and Privacy Policy.
                          </p>
                        </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 text-center text-[10px] text-gray-500 uppercase tracking-widest">
              S_FIT AI v1.0.0
            </div>
          </motion.div>
        </div>
      )}

      {/* Legal Modals */}
      {legalModal === 'privacy' && (
        <LegalModal
          title="Privacy Policy"
          content={
            <>
              <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
              <p>At S_FIT AI, we prioritize your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
              <h4 className="text-white font-bold mt-4">1. Data Collection</h4>
              <p>We collect images you upload solely for the purpose of providing the virtual try-on service. We do not store biometric data permanently.</p>
              <h4 className="text-white font-bold mt-4">2. Data Usage</h4>
              <p>Your photos are processed securely and deleted from our servers within 24 hours. We do not sell your data to third parties.</p>
              <h4 className="text-white font-bold mt-4">3. Security</h4>
              <p>We implement industry-standard security measures to protect your data during transmission and processing.</p>
            </>
          }
          onClose={() => setLegalModal(null)}
        />
      )}
      {legalModal === 'terms' && (
        <LegalModal
          title="Terms of Service"
          content={
            <>
              <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
              <p>By using S_FIT AI, you agree to these Terms of Service.</p>
              <h4 className="text-white font-bold mt-4">1. Acceptance of Terms</h4>
              <p>You agree to use our service only for lawful purposes and in accordance with these terms.</p>
              <h4 className="text-white font-bold mt-4">2. User Content</h4>
              <p>You retain ownership of the content you upload. By uploading, you grant us a temporary license to process the content for the service.</p>
              <h4 className="text-white font-bold mt-4">3. Limitation of Liability</h4>
              <p>S_FIT AI is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from your use of the service.</p>
            </>
          }
          onClose={() => setLegalModal(null)}
        />
      )}
    </AnimatePresence>
  );
}
