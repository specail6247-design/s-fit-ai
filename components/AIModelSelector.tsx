'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { AIModel, AIModelId } from '@/data/aiModels';

interface AIModelSelectorProps {
  isOpen: boolean;
  title: string;
  models: AIModel[];
  selectedModelId: AIModelId;
  recommendedModelId?: AIModelId;
  onClose: () => void;
  onSelect: (modelId: AIModelId) => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 20,
    transition: {
      duration: 0.25,
    },
  },
};

export function AIModelSelector({
  isOpen,
  title,
  models,
  selectedModelId,
  recommendedModelId,
  onClose,
  onSelect,
}: AIModelSelectorProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="absolute inset-0 bg-void-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-md glass-card overflow-hidden"
            variants={modalVariants}
          >
            <div className="p-6">
              <div className="mb-5">
                <p className="text-xs uppercase tracking-[0.2em] text-soft-gray">
                  AI Model
                </p>
                <h3 className="text-lg text-pure-white font-semibold mt-1">
                  {title}
                </h3>
                <p className="text-xs text-soft-gray/70 mt-1">
                  Pick the engine that powers this experience.
                </p>
              </div>

              <div className="space-y-3">
                {models.map((model) => {
                  const isSelected = model.id === selectedModelId;
                  const isRecommended = model.id === recommendedModelId;

                  return (
                    <motion.button
                      key={model.id}
                      type="button"
                      onClick={() => onSelect(model.id)}
                      className={
                        `w-full text-left rounded-lg border px-4 py-3 transition-all ` +
                        `${
                          isSelected
                            ? 'border-cyber-lime bg-cyber-lime/10'
                            : 'border-border-color hover:border-soft-gray/40'
                        }`
                      }
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{model.icon}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-pure-white">
                                {model.name}
                              </span>
                              {isRecommended && (
                                <span className="text-[0.55rem] uppercase tracking-[0.2em] text-cyber-lime">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-soft-gray">
                              {model.provider}
                            </p>
                          </div>
                        </div>
                        {model.pricing === 'premium' && (
                          <span className="premium-badge text-[0.55rem]">
                            Premium
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-soft-gray/80 mt-2">
                        {model.description}
                      </p>
                      <div className="flex items-center gap-4 text-[0.65rem] text-soft-gray/70 mt-3">
                        <span>Speed: {model.speed}</span>
                        <span>Accuracy: {model.accuracy}%</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {model.capabilities.slice(0, 3).map((capability) => (
                          <span
                            key={capability}
                            className="rounded-full border border-border-color px-2 py-1 text-[0.6rem] text-soft-gray/70"
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <button onClick={onClose} className="btn-secondary w-full mt-6">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
