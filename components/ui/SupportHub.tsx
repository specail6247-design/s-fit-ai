import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LegalModal } from './LegalModal';
import { ChevronDown, ChevronUp, AlertCircle, HelpCircle, FileText, Send } from 'lucide-react';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [reportText, setReportText] = useState("");
  const [isReportSent, setIsReportSent] = useState(false);

  const faqs = [
    { q: "What kind of photos work best?", a: "Well-lit, front-facing photos against a solid background yield the best 3D mapping results." },
    { q: "How long does generation take?", a: "Typically between 15 to 45 seconds depending on server load and mesh complexity." },
    { q: "Can I use photos with complex backgrounds?", a: "Yes, our AI isolates the subject, but a clean background reduces processing errors." },
  ];

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    // Mock submission
    setIsReportSent(true);
    setTimeout(() => {
      setIsReportSent(false);
      setReportText("");
    }, 3000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white tracking-tighter">Support Hub</h2>
                  <button onClick={onClose} className="text-gray-400 hover:text-white bg-white/5 p-2 rounded-full transition-colors">
                    ✕
                  </button>
                </div>

                <div className="space-y-8">
                  {/* User Guide / Cautions */}
                  <section className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                    <h3 className="text-yellow-500 font-bold flex items-center gap-2 mb-2 text-sm uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4" /> Camera & Lighting Guide
                    </h3>
                    <ul className="text-xs text-yellow-200/70 space-y-2 list-disc list-inside">
                      <li>Ensure even lighting without harsh shadows on your face/body.</li>
                      <li>Stand straight with arms slightly away from your torso.</li>
                      <li>Avoid baggy clothing in the source photo for accurate body mapping.</li>
                    </ul>
                  </section>

                  {/* Report Issue Form */}
                  <section>
                    <h3 className="text-white font-bold flex items-center gap-2 mb-4 text-sm uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 text-[#007AFF]" /> Report an Issue
                    </h3>
                    {isReportSent ? (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm text-center">
                        Report submitted successfully. Thank you!
                      </div>
                    ) : (
                      <form onSubmit={handleReportSubmit} className="space-y-3">
                        <textarea
                          value={reportText}
                          onChange={(e) => setReportText(e.target.value)}
                          placeholder="Describe the bug or issue you encountered..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF] resize-none h-24"
                        />
                        <button
                          type="submit"
                          disabled={!reportText.trim()}
                          className="w-full py-2 bg-white/10 hover:bg-[#007AFF] disabled:opacity-50 disabled:hover:bg-white/10 text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" /> Send Report
                        </button>
                      </form>
                    )}
                  </section>

                  {/* FAQ Accordion */}
                  <section>
                    <h3 className="text-white font-bold flex items-center gap-2 mb-4 text-sm uppercase tracking-wider">
                      <HelpCircle className="w-4 h-4 text-[#007AFF]" /> Frequently Asked Questions
                    </h3>
                    <div className="space-y-2">
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-white/10 rounded-xl overflow-hidden">
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                            className="w-full p-4 flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors text-left"
                          >
                            <span className="text-sm font-medium text-gray-200">{faq.q}</span>
                            {expandedFaq === idx ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                          </button>
                          <AnimatePresence>
                            {expandedFaq === idx && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4 text-xs text-gray-400 bg-white/5"
                              >
                                {faq.a}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Legal Links */}
                  <section className="pt-6 border-t border-white/10">
                    <h3 className="text-gray-500 font-bold mb-4 text-xs uppercase tracking-wider">Legal & Compliance</h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setLegalModalType('privacy')}
                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-medium text-gray-300 transition-colors flex items-center justify-center gap-2"
                      >
                        <FileText className="w-3 h-3" /> Privacy Policy
                      </button>
                      <button
                        onClick={() => setLegalModalType('terms')}
                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-medium text-gray-300 transition-colors flex items-center justify-center gap-2"
                      >
                        <FileText className="w-3 h-3" /> Terms of Service
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LegalModal
        isOpen={legalModalType !== null}
        onClose={() => setLegalModalType(null)}
        type={legalModalType || 'privacy'}
      />
    </>
  );
}
