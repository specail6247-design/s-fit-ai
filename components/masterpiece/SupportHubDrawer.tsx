'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, Lightbulb, Camera, X } from 'lucide-react';

export default function SupportHubDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');

  const faqs = [
    { q: "How does the virtual fit work?", a: "We use advanced AI to map garments onto your photo, preserving lighting and proportions." },
    { q: "Is my photo stored securely?", a: "Yes, photos are only used during the session and are not permanently stored on our servers without permission." },
    { q: "What if the clothes don't look right?", a: "Ensure good lighting and avoid baggy clothes in your base photo for the best results." },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-96 bg-void-black border-l border-white/10 z-50 p-6 flex flex-col shadow-2xl overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold font-mono tracking-wider">SUPPORT_HUB</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-soft-gray hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="flex gap-4 mb-6 border-b border-white/10 pb-2">
            <button
              onClick={() => setActiveTab('guide')}
              className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'guide' ? 'text-white' : 'text-soft-gray hover:text-white'}`}
            >
              Guide
              {activeTab === 'guide' && <motion.div layoutId="underline" className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-cyber-lime" />}
            </button>
            <button
              onClick={() => setActiveTab('caution')}
              className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'caution' ? 'text-white' : 'text-soft-gray hover:text-white'}`}
            >
              Caution
              {activeTab === 'caution' && <motion.div layoutId="underline" className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-cyber-lime" />}
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'qa' ? 'text-white' : 'text-soft-gray hover:text-white'}`}
            >
              Q&A
              {activeTab === 'qa' && <motion.div layoutId="underline" className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-cyber-lime" />}
            </button>
          </div>

          <div className="flex-1">
            {activeTab === 'guide' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="w-full h-32 bg-white/10 rounded-lg mb-4 flex items-center justify-center">
                    <Camera className="text-soft-gray" size={32} />
                  </div>
                  <h3 className="font-bold mb-2">Step 1: Front Facing</h3>
                  <p className="text-sm text-soft-gray">Ensure you are facing the camera directly for optimal mapping.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="w-full h-32 bg-white/10 rounded-lg mb-4 flex items-center justify-center">
                    <Lightbulb className="text-soft-gray" size={32} />
                  </div>
                  <h3 className="font-bold mb-2">Step 2: Good Lighting</h3>
                  <p className="text-sm text-soft-gray">Natural, even lighting yields the most realistic fabric rendering.</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'caution' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                 <div className="p-4 border border-red-500/30 bg-red-500/10 rounded-xl flex items-start gap-3">
                   <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={20} />
                   <div>
                     <h4 className="font-bold text-red-100 text-sm mb-1">Avoid Dark Silhouettes</h4>
                     <p className="text-xs text-red-200/70">Backlighting prevents the AI from detecting body contours.</p>
                   </div>
                 </div>
                 <div className="p-4 border border-yellow-500/30 bg-yellow-500/10 rounded-xl flex items-start gap-3">
                   <AlertTriangle className="text-yellow-400 shrink-0 mt-0.5" size={20} />
                   <div>
                     <h4 className="font-bold text-yellow-100 text-sm mb-1">Distance Matters</h4>
                     <p className="text-xs text-yellow-200/70">Stand roughly 3-5 feet from the camera for full-body shots.</p>
                   </div>
                 </div>
              </motion.div>
            )}

            {activeTab === 'qa' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {faqs.map((faq, idx) => (
                   <FAQItem key={idx} question={faq.q} answer={faq.a} />
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors text-left"
      >
        <span className="text-sm font-medium pr-4">{question}</span>
        <ChevronDown size={16} className={`text-soft-gray transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-black/20"
          >
            <div className="p-4 text-xs text-soft-gray leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
