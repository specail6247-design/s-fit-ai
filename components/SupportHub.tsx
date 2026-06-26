import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment key="support-hub">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-widest text-white">SUPPORT HUB</h2>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">How to achieve the perfect fit</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                aria-label="Close Support Hub"
              >
                ✕
              </button>
            </div>

            {/* Navigation */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'guide' ? 'text-[#ecab13] border-b-2 border-[#ecab13]' : 'text-gray-500 hover:text-white'}`}
              >
                Guide
              </button>
              <button
                onClick={() => setActiveTab('caution')}
                className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'caution' ? 'text-[#ecab13] border-b-2 border-[#ecab13]' : 'text-gray-500 hover:text-white'}`}
              >
                Caution
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'qa' ? 'text-[#ecab13] border-b-2 border-[#ecab13]' : 'text-gray-500 hover:text-white'}`}
              >
                Q&A
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {activeTab === 'guide' && <GuideSection />}
              {activeTab === 'caution' && <CautionSection />}
              {activeTab === 'qa' && <QASection />}
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}

// --- SUB-SECTIONS ---

function GuideSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      title: 'Upload Photo',
      desc: 'Ensure you are facing forward and your body is fully visible.',
      icon: 'person_outline'
    },
    {
      title: 'Select Garment',
      desc: 'Choose a clear, flat-lay image of the clothing item.',
      icon: 'apparel'
    },
    {
      title: 'Generate Fit',
      desc: 'Click Try It On. Our AI will map the garment to your unique proportions.',
      icon: 'auto_awesome'
    },
  ];

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-bold tracking-wider text-white border-l-2 border-[#ecab13] pl-3 mb-6">How to Fit</h3>

      <div className="relative bg-white/5 border border-white/10 rounded-xl p-8 overflow-hidden min-h-[250px] flex flex-col justify-center items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-[#ecab13]/10 border border-[#ecab13]/30 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[#ecab13] text-3xl" aria-hidden="true">{steps[currentStep].icon}</span>
            </div>
            <div className="text-[#ecab13] font-mono text-sm opacity-50 mb-2">0{currentStep + 1}</div>
            <h4 className="text-white font-bold text-xl mb-3">{steps[currentStep].title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[250px]">{steps[currentStep].desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#ecab13] hover:border-[#ecab13] transition-colors"
            aria-label="Previous step"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">chevron_left</span>
          </button>

          <div className="flex gap-2">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentStep === idx ? 'w-6 bg-[#ecab13]' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#ecab13] hover:border-[#ecab13] transition-colors"
            aria-label="Next step"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CautionSection() {
  return (
    <div className="space-y-8">
      <h3 className="text-lg font-bold tracking-wider text-white border-l-2 border-red-500 pl-3 mb-6">Important Guidelines</h3>

      <div className="grid gap-4">
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start gap-4">
          <span className="material-symbols-outlined text-yellow-500 text-2xl" aria-hidden="true">light_mode</span>
          <div>
            <h4 className="text-white font-bold text-sm">Lighting is Crucial</h4>
            <p className="text-gray-400 text-xs mt-1">Avoid harsh shadows. Use soft, even, front-facing natural light when possible.</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start gap-4">
          <span className="material-symbols-outlined text-blue-400 text-2xl" aria-hidden="true">photo_camera</span>
          <div>
            <h4 className="text-white font-bold text-sm">Camera Distance</h4>
            <p className="text-gray-400 text-xs mt-1">Stand approximately 4-6 feet away. Ensure your head to knees are visible.</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start gap-4">
          <span className="material-symbols-outlined text-green-400 text-2xl" aria-hidden="true">accessibility_new</span>
          <div>
            <h4 className="text-white font-bold text-sm">Pose and Clothing</h4>
            <p className="text-gray-400 text-xs mt-1">Stand straight with arms slightly apart. Wear form-fitting clothes for accurate body mapping.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QASection() {
  const faqs = [
    { q: 'Is my data stored securely?', a: 'Yes. Images are processed ephemerally and are not saved unless you explicitly save them to your Vault.' },
    { q: 'Why is the garment distorted?', a: 'This usually happens if the user photo has complex poses or if the garment image is not a clear flat-lay. Try different images.' },
    { q: 'Can I try on bottoms?', a: 'Currently, the S_FIT NEO engine is optimized for tops and full-body dresses. Bottoms support is arriving in v2.0.' },
  ];

  return (
    <div className="space-y-6">
       <h3 className="text-lg font-bold tracking-wider text-white border-l-2 border-[#ecab13] pl-3 mb-6">Frequently Asked Questions</h3>

       <div className="space-y-4">
         {faqs.map((faq, i) => (
           <details key={i} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
             <summary className="p-4 cursor-pointer text-sm font-bold text-white flex items-center justify-between hover:bg-white/5 transition-colors">
               {faq.q}
               <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
             </summary>
             <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/10 mt-2 bg-black/20">
               {faq.a}
             </div>
           </details>
         ))}
       </div>
    </div>
  );
}
