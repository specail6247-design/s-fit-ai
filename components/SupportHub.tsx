'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export function SupportHub() {
  const { isSupportOpen, toggleSupportModal, supportTab, setSupportTab } = useStore();
  const [issueType, setIssueType] = useState('bug');
  const [issueDescription, setIssueDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleClose = () => {
    toggleSupportModal(false);
    setSubmitStatus('idle'); // Reset status on close
  };

  const handleTabChange = (tab: 'guide' | 'qa' | 'issue' | 'caution') => {
    setSupportTab(tab);
  };

  const handleSubmitIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus('success');
    setIssueDescription(''); // Clear form
  };

  return (
    <AnimatePresence>
      {isSupportOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-void-black/80 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-md glass-card border-l border-white/10 flex flex-col shadow-2xl"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-void-black/50">
              <h2 className="text-xl font-bold text-white uppercase tracking-widest">Support Hub</h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 bg-void-black/30 overflow-x-auto scrollbar-hide">
              {[
                { id: 'guide', label: 'Guide', icon: 'menu_book' },
                { id: 'caution', label: 'Caution', icon: 'warning' },
                { id: 'qa', label: 'Q&A', icon: 'help' },
                { id: 'issue', label: 'Report', icon: 'bug_report' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as any)}
                  className={`flex-1 flex flex-col items-center justify-center p-3 text-xs font-bold uppercase tracking-wider transition-colors min-w-[80px] ${
                    supportTab === tab.id
                      ? 'text-cyber-lime bg-white/5 border-b-2 border-cyber-lime'
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined mb-1 text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-void-black/20">
              {supportTab === 'guide' && (
                <div className="space-y-6">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h3 className="text-lg font-bold text-cyber-lime mb-2">How to use S_FIT AI</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                      <li>Upload a full-body photo of yourself.</li>
                      <li>Ensure good lighting and a clear background.</li>
                      <li>Upload a clear image of the garment you want to try.</li>
                      <li>Wait for the AI to process the fitting.</li>
                      <li>Download or share your result!</li>
                    </ol>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-2">Best Practices</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
                      <li>Avoid loose clothing in your input photo for better accuracy.</li>
                      <li>Front-facing poses work best.</li>
                      <li>High-resolution images yield better results.</li>
                    </ul>
                  </div>
                </div>
              )}

              {supportTab === 'caution' && (
                <div className="space-y-4">
                  <div className="bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-yellow-500">warning</span>
                      <h3 className="text-lg font-bold text-yellow-500">Limitations</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      Currently, the AI may struggle with:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
                      <li>Very complex patterns or textures.</li>
                      <li>Extreme poses or obscured body parts.</li>
                      <li>Accessories like bags or hats.</li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    We are constantly improving our models. Thank you for your patience!
                  </p>
                </div>
              )}

              {supportTab === 'qa' && (
                <div className="space-y-4">
                  {[
                    { q: "Is my photo saved?", a: "No, photos are processed in real-time and deleted after the session." },
                    { q: "Is it free?", a: "You have 5 free tries daily. Premium unlocks unlimited access." },
                    { q: "Can I use any clothing image?", a: "Yes! But clear, front-facing product shots work best." },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-white text-sm mb-1">Q: {item.q}</h4>
                      <p className="text-sm text-gray-400">A: {item.a}</p>
                    </div>
                  ))}
                </div>
              )}

              {supportTab === 'issue' && (
                <div className="space-y-6">
                   <div className="text-center mb-4">
                     <p className="text-sm text-gray-300">
                       Found a bug or have feedback? Let us know!
                     </p>
                   </div>

                   {submitStatus === 'success' ? (
                     <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 text-center"
                     >
                       <span className="material-symbols-outlined text-4xl text-green-500 mb-2">check_circle</span>
                       <h3 className="text-xl font-bold text-white mb-1">Report Sent!</h3>
                       <p className="text-sm text-gray-300">Thank you for helping us improve S_FIT AI.</p>
                       <button
                         onClick={() => setSubmitStatus('idle')}
                         className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors"
                       >
                         Send Another
                       </button>
                     </motion.div>
                   ) : (
                     <form onSubmit={handleSubmitIssue} className="space-y-4">
                       <div>
                         <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Issue Type</label>
                         <select
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                            className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white focus:border-cyber-lime outline-none transition-colors"
                         >
                           <option value="bug">Bug Report</option>
                           <option value="feature">Feature Request</option>
                           <option value="billing">Billing Issue</option>
                           <option value="other">Other</option>
                         </select>
                       </div>

                       <div>
                         <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description</label>
                         <textarea
                            value={issueDescription}
                            onChange={(e) => setIssueDescription(e.target.value)}
                            required
                            rows={5}
                            placeholder="Please describe the issue in detail..."
                            className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white focus:border-cyber-lime outline-none transition-colors resize-none"
                         />
                       </div>

                       <button
                         type="submit"
                         disabled={isSubmitting || !issueDescription.trim()}
                         className={`w-full py-3 rounded-xl font-bold text-black uppercase tracking-wider transition-all transform active:scale-95 ${
                           isSubmitting || !issueDescription.trim()
                             ? 'bg-gray-600 cursor-not-allowed'
                             : 'bg-cyber-lime hover:bg-lime-400 shadow-[0_0_20px_rgba(204,255,0,0.3)]'
                         }`}
                       >
                         {isSubmitting ? (
                           <span className="flex items-center justify-center gap-2">
                             <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span>
                             Sending...
                           </span>
                         ) : 'Submit Report'}
                       </button>
                     </form>
                   )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-void-black/50 text-center">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                S_FIT AI Support Team
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
