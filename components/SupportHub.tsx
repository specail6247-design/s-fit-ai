'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, MessageSquare, AlertCircle, X, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { BottomSheet } from './ui/BottomSheet';

export const SupportHub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'none' | 'legal' | 'report'>('none');
  const [reportStatus, setReportStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setReportStatus('success');
      setTimeout(() => {
        setActiveModal('none');
        setReportStatus('idle');
      }, 2000);
    }, 1000);
  };

  return (
    <>
      {/* Trigger Button - VIP Club Aesthetic */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#050505] border border-[#C9B037]/30 text-[#C9B037] p-3 rounded-full shadow-[0_0_15px_rgba(201,176,55,0.15)] hover:shadow-[0_0_20px_rgba(201,176,55,0.3)] transition-all duration-300"
        aria-label="Support Hub"
      >
        <MessageSquare size={24} />
      </button>

      {/* Support Hub Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#050505] border-l border-[#C9B037]/20 z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#C9B037]/20 flex justify-between items-center bg-black">
              <h2 className="font-serif text-[#C9B037] text-xl tracking-widest uppercase">Support & Trust</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors p-2"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 overflow-y-auto space-y-6">

              {/* Trust Badge */}
              <div className="bg-[#C9B037]/10 border border-[#C9B037]/20 rounded-xl p-5 flex items-start gap-4">
                <div className="bg-[#C9B037]/20 p-2 rounded-lg text-[#C9B037]">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-[#C9B037] text-sm uppercase tracking-wider mb-1">Data Safety Guarantee</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Photos are processed securely and not shared. Your privacy is our highest priority.
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

              {/* Action Menu */}
              <nav className="space-y-3">
                <button
                  onClick={() => setActiveModal('report')}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3 text-white/90">
                    <AlertCircle size={20} className="text-[#C9B037]" />
                    <span className="font-medium">Report Issue</span>
                  </div>
                  <ChevronRight size={18} className="text-white/30 group-hover:text-[#C9B037] group-hover:translate-x-1 transition-all" />
                </button>

                <button
                  onClick={() => setActiveModal('legal')}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3 text-white/90">
                    <FileText size={20} className="text-[#C9B037]" />
                    <span className="font-medium">Privacy & Terms</span>
                  </div>
                  <ChevronRight size={18} className="text-white/30 group-hover:text-[#C9B037] group-hover:translate-x-1 transition-all" />
                </button>
              </nav>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/50 text-center">
              <p className="text-white/40 text-xs tracking-widest uppercase">S_FIT AI © 2024</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Issue Modal */}
      <BottomSheet isOpen={activeModal === 'report'} onClose={() => setActiveModal('none')} title="Report Issue">
        {reportStatus === 'success' ? (
          <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-[#C9B037]/20 rounded-full flex items-center justify-center text-[#C9B037]"
            >
              <CheckCircle2 size={32} />
            </motion.div>
            <h3 className="font-serif text-[#C9B037] text-xl">Report Submitted</h3>
            <p className="text-white/60">Our concierge team will investigate immediately.</p>
          </div>
        ) : (
          <form onSubmit={handleReportSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-serif">Issue Type</label>
              <select className="w-full bg-[#050505] border border-white/20 rounded-lg p-3 text-white focus:border-[#C9B037] focus:ring-1 focus:ring-[#C9B037] outline-none transition-all">
                <option>Visual Glitch / AR Issue</option>
                <option>Performance / Lag</option>
                <option>App Crash</option>
                <option>Other Feedback</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-serif">Description</label>
              <textarea
                required
                rows={4}
                placeholder="Please describe what happened..."
                className="w-full bg-[#050505] border border-white/20 rounded-lg p-3 text-white focus:border-[#C9B037] focus:ring-1 focus:ring-[#C9B037] outline-none transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={reportStatus === 'submitting'}
              className="w-full bg-[#C9B037] hover:bg-[#d4be52] text-black font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {reportStatus === 'submitting' ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        )}
      </BottomSheet>

      {/* Legal Modal */}
      <BottomSheet isOpen={activeModal === 'legal'} onClose={() => setActiveModal('none')} title="Legal & Compliance">
        <div className="space-y-6 text-white/80 text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <section>
            <h4 className="font-serif text-[#C9B037] text-lg mb-2 uppercase tracking-wider">Privacy Policy</h4>
            <p className="mb-4">
              At S_FIT AI, your privacy is our highest priority. We utilize on-device processing and temporary secure cloud endpoints for advanced AR generation.
              <strong> Your personal photos are never stored permanently, sold, or used to train public models without explicit consent.</strong>
            </p>
            <p>
              Data processing occurs exclusively within secure, compliant infrastructure. All temporary data is automatically purged immediately after your session concludes.
            </p>
          </section>

          <div className="h-px w-full bg-white/10" />

          <section>
            <h4 className="font-serif text-[#C9B037] text-lg mb-2 uppercase tracking-wider">Terms of Service</h4>
            <p className="mb-4">
              By utilizing the S_FIT AI virtual try-on experience, you agree to our terms of acceptable use. The service is provided &quot;as is&quot; for personal, non-commercial use.
            </p>
            <p>
              Generated content remains your property. However, abusive usage or attempts to reverse engineer the proprietary AR algorithms will result in immediate termination of access.
            </p>
          </section>
        </div>
      </BottomSheet>
    </>
  );
};
