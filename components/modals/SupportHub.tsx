import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportHub: React.FC<SupportHubProps> = ({ isOpen, onClose }) => {
  const [reportIssue, setReportIssue] = useState('');
  const [issueSubmitted, setIssueSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportIssue.trim()) return;
    // Mock API call to submit issue
    setTimeout(() => {
      setIssueSubmitted(true);
      setReportIssue('');
      setTimeout(() => setIssueSubmitted(false), 3000);
    }, 500);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'How does S_FIT AI work?',
      a: 'We use advanced AI models to seamlessly blend the target garment onto your photo, preserving lighting and fabric details.'
    },
    {
      q: 'Why does my try-on look distorted?',
      a: 'Ensure you are facing forward and your original photo has good lighting. Complex poses might confuse the AI.'
    },
    {
      q: 'Can I use this for luxury brands?',
      a: 'Yes! Check out our Luxury Line for premium experiences with exclusive brands and cinematic rendering.'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-md bg-[#111] border-l border-white/10 shadow-2xl h-full overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#111]/90 backdrop-blur-md z-10">
              <h2 className="text-xl font-bold font-sans tracking-wide">Support Hub</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-2xl">
                ✕
              </button>
            </div>

            <div className="p-6 flex-1 space-y-8">
              {/* How to Fit Carousel Mockup */}
              <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">school</span> How to Fit
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                  <div className="min-w-[200px] h-32 bg-gradient-to-br from-blue-900/50 to-black rounded-xl p-4 flex flex-col justify-end border border-white/10 snap-center shrink-0">
                    <p className="font-bold text-sm">1. Stand Forward</p>
                    <p className="text-xs text-gray-400">Clear lighting is key.</p>
                  </div>
                  <div className="min-w-[200px] h-32 bg-gradient-to-br from-purple-900/50 to-black rounded-xl p-4 flex flex-col justify-end border border-white/10 snap-center shrink-0">
                    <p className="font-bold text-sm">2. Upload Garment</p>
                    <p className="text-xs text-gray-400">Front view preferred.</p>
                  </div>
                  <div className="min-w-[200px] h-32 bg-gradient-to-br from-green-900/50 to-black rounded-xl p-4 flex flex-col justify-end border border-white/10 snap-center shrink-0">
                    <p className="font-bold text-sm">3. Try It On</p>
                    <p className="text-xs text-gray-400">Magic in seconds.</p>
                  </div>
                </div>
              </section>

              {/* Data Safety Badge */}
              <section className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5 flex items-start gap-4">
                <div className="bg-green-500/20 p-2 rounded-full mt-1">
                  <span className="material-symbols-outlined text-green-400" aria-label="Security Badge" role="img">lock</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-green-400 mb-1">Data Safety Guaranteed</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Photos are processed securely and not shared. They are automatically deleted after your session ends. Your privacy is our priority.</p>
                </div>
              </section>

              {/* Caution Icons Mockup */}
              <section>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5 flex flex-col items-center text-center gap-2">
                      <span className="material-symbols-outlined text-yellow-500 text-3xl" aria-label="Caution lighting" role="img">lightbulb</span>
                      <p className="text-xs text-gray-400">Avoid harsh shadows</p>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5 flex flex-col items-center text-center gap-2">
                       <span className="material-symbols-outlined text-red-500 text-3xl" aria-label="Caution pose" role="img">accessibility_new</span>
                      <p className="text-xs text-gray-400">Avoid complex poses</p>
                    </div>
                 </div>
              </section>

              {/* FAQ Accordion */}
              <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">help</span> FAQs
                </h3>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-[#1a1a1a]">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 flex justify-between items-center text-sm font-bold hover:bg-white/5 transition-colors"
                      >
                        {faq.q}
                        <span className="material-symbols-outlined text-gray-400">
                          {expandedFaq === index ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 text-xs text-gray-400 leading-relaxed overflow-hidden"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>

              {/* Report Issue Form */}
              <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">bug_report</span> Report Issue
                </h3>
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <textarea
                    value={reportIssue}
                    onChange={(e) => setReportIssue(e.target.value)}
                    placeholder="Describe the bug or issue you experienced..."
                    className="w-full h-32 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#007AFF] resize-none transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!reportIssue.trim() || issueSubmitted}
                  >
                    {issueSubmitted ? 'Submitted!' : 'Send Report'}
                  </button>
                </form>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
