'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 }
  },
  exit: {
    x: '100%',
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 }
  }
};

const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors ${
      active ? 'border-cyber-lime text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
    }`}
  >
    {children}
  </button>
);

const UserGuide = () => {
  const steps = [
    { title: "Prepare", desc: "Ensure good lighting and stand 2-3 meters from the camera.", icon: "📸" },
    { title: "Upload", desc: "Upload a full-body photo. Minimal background clutter is best.", icon: "📤" },
    { title: "Select", desc: "Choose a garment from our Luxury or SPA collections.", icon: "👗" },
    { title: "Fit", desc: "Our AI will map the garment to your pose in seconds.", icon: "✨" }
  ];

  return (
    <div className="space-y-8 mt-4">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl shrink-0">
            {step.icon}
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-1">{i + 1}. {step.title}</h4>
            <p className="text-zinc-400 text-xs leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Caution = () => {
    return (
        <div className="space-y-6 mt-4">
            <div className="p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                <div className="flex gap-3 mb-2">
                    <span className="text-yellow-500 text-lg">⚠️</span>
                    <h4 className="text-yellow-500 font-bold text-sm uppercase">Lighting Alert</h4>
                </div>
                <p className="text-zinc-400 text-xs">
                    Avoid backlighting. Ensure the light source is in front of you for the best AI body detection.
                </p>
            </div>

            <div className="p-4 bg-red-900/20 border border-red-700/30 rounded-lg">
                <div className="flex gap-3 mb-2">
                    <span className="text-red-500 text-lg">🚫</span>
                    <h4 className="text-red-500 font-bold text-sm uppercase">Pose Warning</h4>
                </div>
                <p className="text-zinc-400 text-xs">
                    Avoid crossing arms or legs. Stand naturally with limbs visible for accurate sizing.
                </p>
            </div>

             <div className="p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                <div className="flex gap-3 mb-2">
                    <span className="text-blue-500 text-lg">📏</span>
                    <h4 className="text-blue-500 font-bold text-sm uppercase">Distance</h4>
                </div>
                <p className="text-zinc-400 text-xs">
                    Position camera at waist height, roughly 6-8 feet away.
                </p>
            </div>
        </div>
    )
}

const QA = () => {
    const faqs = [
        { q: "Is my photo stored?", a: "Photos are processed in real-time and deleted after the session, unless you save them to your Vault." },
        { q: "How accurate is the sizing?", a: "Our AI estimates measurements within 95% accuracy given a clear photo." },
        { q: "Can I try multiple items?", a: "Yes, Premium members have unlimited try-ons. Free tier is limited to 5/day." },
        { q: "Why did the fit fail?", a: "Usually due to poor lighting, blurry photos, or obscured body parts." }
    ];

    return (
        <div className="space-y-4 mt-4">
            {faqs.map((faq, i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0">
                    <h4 className="text-white text-sm font-semibold mb-2">{faq.q}</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed">{faq.a}</p>
                </div>
            ))}
        </div>
    )
}

export function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen, activeSupportTab, setActiveSupportTab } = useStore();

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSupportHubOpen(false)}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-80 sm:w-96 bg-[#0a0a0a] border-l border-white/10 z-[61] shadow-2xl flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-white font-display">SUPPORT HUB</h2>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Assistance & Guide</p>
                </div>
                <button
                    onClick={() => setSupportHubOpen(false)}
                    className="p-2 text-zinc-500 hover:text-white transition-colors"
                >
                    ✕
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 px-6">
                <TabButton active={activeSupportTab === 'guide'} onClick={() => setActiveSupportTab('guide')}>Guide</TabButton>
                <TabButton active={activeSupportTab === 'caution'} onClick={() => setActiveSupportTab('caution')}>Caution</TabButton>
                <TabButton active={activeSupportTab === 'qa'} onClick={() => setActiveSupportTab('qa')}>Q&A</TabButton>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {activeSupportTab === 'guide' && <UserGuide />}
                {activeSupportTab === 'caution' && <Caution />}
                {activeSupportTab === 'qa' && <QA />}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-white/5">
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded uppercase tracking-wider transition-colors">
                    Contact Human Support
                </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
