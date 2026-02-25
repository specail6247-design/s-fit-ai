'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function SupportHub() {
  const isSupportOpen = useStore((state) => state.isSupportOpen);
  const setSupportOpen = useStore((state) => state.setSupportOpen);
  const activeTab = useStore((state) => state.supportTab);
  const setActiveTab = useStore((state) => state.setSupportTab);

  const handleClose = () => setSupportOpen(false);

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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-void-black border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-void-black/80 backdrop-blur-md sticky top-0 z-10">
              <h2 className="text-xl font-display font-bold text-white tracking-wider">
                SUPPORT HUB
              </h2>
              <button
                onClick={handleClose}
                className="p-2 text-soft-gray hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex p-2 bg-white/5 mx-6 mt-6 rounded-xl">
              <TabButton
                isActive={activeTab === 'guide'}
                onClick={() => setActiveTab('guide')}
                label="User Guide"
              />
              <TabButton
                isActive={activeTab === 'caution'}
                onClick={() => setActiveTab('caution')}
                label="Caution"
              />
              <TabButton
                isActive={activeTab === 'qa'}
                onClick={() => setActiveTab('qa')}
                label="Q&A"
              />
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'guide' && <GuideSection />}
                  {activeTab === 'caution' && <CautionSection />}
                  {activeTab === 'qa' && <QASection />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
             <div className="p-6 border-t border-white/10 text-center text-xs text-soft-gray">
                Need more help? <a href="mailto:support@s-fit.ai" className="text-cyber-lime hover:underline">Contact Us</a>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function TabButton({ isActive, onClick, label }: { isActive: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
        isActive
          ? 'bg-cyber-lime text-void-black shadow-lg'
          : 'text-soft-gray hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );
}

/* ===========================
   GUIDE SECTION (Carousel)
   =========================== */
function GuideSection() {
  const steps = [
    {
      title: "Choose Your Mode",
      desc: "Select from Live Fitting, Photo Try-On, or Digital Twin based on your needs.",
      icon: "🎯"
    },
    {
      title: "Upload or Capture",
      desc: "Upload a clear full-body photo or use your camera for live AR fitting.",
      icon: "📸"
    },
    {
      title: "Select Garments",
      desc: "Browse our luxury collection and tap to try on instantly.",
      icon: "👗"
    },
    {
      title: "Adjust & Share",
      desc: "Fine-tune the fit, explore details, and share your look on social media.",
      icon: "✨"
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % steps.length);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <div className="space-y-6">
      <div className="glass-card bg-white/5 p-8 rounded-2xl text-center min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Decorative Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyber-lime/20 rounded-full animate-pulse" />

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="relative z-10"
        >
          <div className="text-6xl mb-6">{steps[currentStep].icon}</div>
          <h3 className="text-xl font-bold text-white mb-3">{steps[currentStep].title}</h3>
          <p className="text-soft-gray text-sm leading-relaxed max-w-[250px] mx-auto">
            {steps[currentStep].desc}
          </p>
        </motion.div>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 flex gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentStep ? 'bg-cyber-lime w-6' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={prevStep}
          className="flex-1 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-medium"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="flex-1 py-3 rounded-xl bg-white text-black font-bold hover:bg-cyber-lime transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

/* ===========================
   CAUTION SECTION
   =========================== */
function CautionSection() {
  const warnings = [
    {
      icon: "☀️",
      title: "Lighting Matters",
      desc: "Ensure you are in a well-lit environment. Avoid strong backlighting or deep shadows for the best AI tracking."
    },
    {
      icon: "📏",
      title: "Camera Distance",
      desc: "Stand 6-8 feet away from the camera. Your full body should be visible within the frame."
    },
    {
      icon: "👚",
      title: "Clothing Contrast",
      desc: "Wear tight-fitting clothes that contrast with the background to help the AI identify your body shape accurately."
    },
     {
      icon: "🧹",
      title: "Clear Background",
      desc: "A cluttered background can confuse the AI. Try to use a plain wall or a tidy space."
    }
  ];

  return (
    <div className="space-y-4">
      {warnings.map((warn, idx) => (
        <div key={idx} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-cyber-lime/30 transition-colors">
          <div className="text-2xl pt-1">{warn.icon}</div>
          <div>
            <h3 className="text-white font-bold text-sm mb-1">{warn.title}</h3>
            <p className="text-soft-gray text-xs leading-relaxed">{warn.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ===========================
   Q&A SECTION (Accordion)
   =========================== */
function QASection() {
  const faqs = [
    {
      q: "How accurate is the size recommendation?",
      a: "Our AI analyzes your body measurements with 98% accuracy compared to manual measuring tape. However, brand sizing varies, so always check the specific size chart."
    },
    {
      q: "Is my photo stored securely?",
      a: "Yes. Your photos are processed instantly and are not stored on our servers unless you explicitly save them to your profile or Vault."
    },
    {
      q: "Can I try on clothes with friends?",
      a: "Currently, the fitting room is designed for one person at a time for optimal tracking. Multiplayer mode is coming in Phase 6!"
    },
    {
      q: "Why does the garment look distorted?",
      a: "This usually happens due to poor lighting or loose clothing. Try tightening your clothes or moving to a better-lit area."
    }
  ];

  return (
    <div className="space-y-2">
      {faqs.map((faq, idx) => (
        <AccordionItem key={idx} question={faq.q} answer={faq.a} />
      ))}
    </div>
  );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-sm font-medium text-white">{question}</span>
        <span className={`text-cyber-lime transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-xs text-soft-gray leading-relaxed border-t border-white/5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
