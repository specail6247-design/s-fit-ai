import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1000);
    setTimeout(() => { setStatus('idle'); onClose(); }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-6 shadow-2xl" onClick={e => e.stopPropagation()} initial={{ y: 20, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.95 }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Report an Issue</h2>
              <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">✕</button>
            </div>
            {status === 'success' ? (
              <div className="text-center py-8 text-green-400 font-bold">
                Thank you! We&apos;ve received your report.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Issue Type</label>
                  <select className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none">
                    <option>AI Generation Error</option>
                    <option>UI/UX Bug</option>
                    <option>Performance Issue</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Description</label>
                  <textarea required rows={4} className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none" placeholder="Please describe what happened..." />
                </div>
                <button type="submit" disabled={status === 'submitting'} className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors disabled:opacity-50">
                  {status === 'submitting' ? 'Submitting...' : 'Submit Report'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
