'use client';

// S_FIT AI - Mode Selector Component
// 3-Tier Entry System: Vibe Check, Digital Twin, Easy Fit

import { motion } from 'framer-motion';
import { useState } from 'react';
import { AIModelSelector } from './AIModelSelector';
import { aiModels, getAIModelById, type AIModelId } from '@/data/aiModels';
import { useStore, type FittingModeKey } from '@/store/useStore';

interface ModeOption {
  id: FittingModeKey;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  time: string;
  gradient: string;
  recommendedAI: AIModelId;
  compatibleModels: AIModelId[];
  agents: string[];
}

const modeOptions: ModeOption[] = [
  {
    id: 'vibe-check',
    icon: '📸',
    title: 'VIBE CHECK',
    subtitle: 'Selfie Only',
    description: 'Does this style match my face?',
    time: '< 3 sec',
    gradient: 'from-white/5 to-white/0',
    recommendedAI: 'claude-3.5',
    compatibleModels: ['claude-3.5', 'gpt-4o', 'gemini-pro'],
    agents: ['Face analysis', 'Style match', 'Color harmony'],
  },
  {
    id: 'digital-twin',
    icon: '👤',
    title: 'DIGITAL TWIN',
    subtitle: 'Selfie + Full Body',
    description: 'Realistic 360° fitting experience',
    time: '~ 10 sec',
    gradient: 'from-white/10 to-white/0',
    recommendedAI: 'gpt-4o',
    compatibleModels: ['gpt-4o', 'claude-3.5', 'gemini-pro'],
    agents: ['Body pose', 'Measurement', '3D fit'],
  },
  {
    id: 'easy-fit',
    icon: '📏',
    title: 'EASY FIT',
    subtitle: 'No Camera Required',
    description: 'Size check with your body stats',
    time: 'Instant',
    gradient: 'from-white/5 to-white/0',
    recommendedAI: 'gemini-pro',
    compatibleModels: ['gemini-pro', 'claude-3.5', 'gpt-4o'],
    agents: ['Sizing logic', 'Fit prediction', 'Brand map'],
  },
  {
    id: 'training',
    icon: '🧠',
    title: 'AI TRAINING',
    subtitle: 'Teach the AI',
    description: 'Improve accuracy with your data',
    time: 'Interactive',
    gradient: 'from-cyber-lime/10 to-transparent',
    recommendedAI: 'gpt-4o',
    compatibleModels: ['gpt-4o'],
    agents: ['Data Collection', 'Model Training'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function ModeSelector() {
  const {
    selectedMode,
    setSelectedMode,
    selectedAIModels,
    setSelectedAIModel,
    isPremium,
    setShowPremiumModal,
  } = useStore();
  const [activeMode, setActiveMode] = useState<FittingModeKey | null>(null);

  const handleModeSelect = (mode: FittingModeKey) => {
    setSelectedMode(mode);
  };

  const handleModelSelect = (mode: FittingModeKey, modelId: AIModelId) => {
    const model = getAIModelById(modelId);
    if (model?.pricing === 'premium' && !isPremium) {
      setShowPremiumModal(true);
      return;
    }
    setSelectedAIModel(mode, modelId);
  };

  const activeOption = activeMode
    ? modeOptions.find((mode) => mode.id === activeMode)
    : null;
  const activeModels = activeOption
    ? aiModels.filter((model) => activeOption.compatibleModels.includes(model.id))
    : [];
  const activeModelId = activeOption
    ? selectedAIModels[activeOption.id] || activeOption.recommendedAI
    : null;

  return (
    <>
      <motion.div
        className="w-full max-w-md mx-auto space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-sm uppercase tracking-[0.2em] text-soft-gray mb-2">
            Choose Your Experience
          </h2>
          <p className="text-xs text-soft-gray/60">
            Select how you want to try on clothes
          </p>
        </motion.div>

        {/* Mode Cards */}
        {modeOptions.map((mode) => {
          const selectedModelId = selectedAIModels[mode.id] || mode.recommendedAI;
          const selectedModel =
            getAIModelById(selectedModelId) || aiModels[0];

          return (
            <motion.div
              key={mode.id}
              role="button"
              tabIndex={0}
              aria-pressed={selectedMode === mode.id}
              variants={itemVariants}
              onClick={() => handleModeSelect(mode.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleModeSelect(mode.id);
                }
              }}
              className={
                `mode-card w-full text-left flex items-start gap-4 ` +
                `${selectedMode === mode.id ? 'selected' : ''}`
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon */}
              <div className="text-3xl flex-shrink-0 mt-1">{mode.icon}</div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="logo-text text-lg text-pure-white">
                    {mode.title}
                  </h3>
                  <span className="text-xs text-soft-gray bg-charcoal px-2 py-1 rounded-full">
                    {mode.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-soft-gray/70 mb-2">
                  <span className="text-cyber-lime">
                    {selectedModel.icon} {selectedModel.name}
                  </span>
                  <span className="text-soft-gray/60">
                    {selectedModel.accuracy}%
                  </span>
                  {selectedModel.pricing === 'premium' && (
                    <span className="premium-badge text-[0.55rem]">Premium</span>
                  )}
                </div>
                <p className="text-sm text-soft-gray mb-1">{mode.subtitle}</p>
                <p className="text-xs text-soft-gray/60">{mode.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[0.6rem] text-soft-gray/70">
                  {mode.agents.map((agent) => (
                    <span
                      key={agent}
                      className="rounded-full border border-border-color px-2 py-1"
                    >
                      {agent}
                    </span>
                  ))}
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedMode(mode.id);
                      setActiveMode(mode.id);
                    }}
                    className="text-xs text-soft-gray/80 hover:text-pure-white transition-colors"
                  >
                    Change model →
                  </button>
                </div>
              </div>

              {/* Selection Indicator */}
              <div
                className={`
                  w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1
                  flex items-center justify-center transition-all
                  ${
                    selectedMode === mode.id
                      ? 'border-cyber-lime bg-cyber-lime'
                      : 'border-soft-gray/30'
                  }
                `}
              >
                {selectedMode === mode.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-void-black rounded-full"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {activeOption && activeModelId && (
        <AIModelSelector
          isOpen={Boolean(activeMode)}
          title={activeOption.title}
          models={activeModels}
          selectedModelId={activeModelId}
          recommendedModelId={activeOption.recommendedAI}
          onClose={() => setActiveMode(null)}
          onSelect={(modelId: AIModelId) => {
            handleModelSelect(activeOption.id, modelId);
            setActiveMode(null);
          }}
        />
      )}
    </>
  );
}
