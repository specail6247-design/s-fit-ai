'use client';

// S_FIT AI - Easy Fit Mode Component
// Stats-based fitting without camera

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore, BodyShape } from '@/store/useStore';

interface BodyShapeOption {
  id: BodyShape;
  icon: string;
  label: string;
}

const bodyShapes: BodyShapeOption[] = [
  { id: 'rectangle', icon: '▯', label: 'Rectangle' },
  { id: 'hourglass', icon: '⧗', label: 'Hourglass' },
  { id: 'pear', icon: '🍐', label: 'Pear' },
  { id: 'apple', icon: '🍎', label: 'Apple' },
  { id: 'inverted-triangle', icon: '▽', label: 'Inverted Triangle' },
];

interface EasyFitModeProps {
  onComplete: () => void;
}

export function EasyFitMode({ onComplete }: EasyFitModeProps) {
  const { setUserStats } = useStore();
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(65);
  const [selectedShape, setSelectedShape] = useState<BodyShape>('rectangle');

  const handleSubmit = () => {
    setUserStats({
      height,
      weight,
      bodyShape: selectedShape,
    });
    onComplete();
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center">
        <span className="text-4xl mb-4 block">📏</span>
        <h2 className="text-2xl font-bold text-pure-white mb-2">Easy Fit</h2>
        <p className="text-sm text-soft-gray">
          Enter your body stats for accurate size recommendations
        </p>
      </div>

      {/* Height Input */}
      <div className="space-y-3">
        <label className="block text-sm text-soft-gray uppercase tracking-wider">
          Height
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={140}
            max={210}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="flex-1 h-2 bg-charcoal rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-5
                       [&::-webkit-slider-thumb]:h-5
                       [&::-webkit-slider-thumb]:bg-pure-white
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:shadow-lg"
          />
          <div className="w-20 text-center">
            <span className="text-2xl font-bold text-pure-white">{height}</span>
            <span className="text-sm text-soft-gray ml-1">cm</span>
          </div>
        </div>
      </div>

      {/* Weight Input */}
      <div className="space-y-3">
        <label className="block text-sm text-soft-gray uppercase tracking-wider">
          Weight
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={40}
            max={150}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="flex-1 h-2 bg-charcoal rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-5
                       [&::-webkit-slider-thumb]:h-5
                       [&::-webkit-slider-thumb]:bg-pure-white
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:shadow-lg"
          />
          <div className="w-20 text-center">
            <span className="text-2xl font-bold text-pure-white">{weight}</span>
            <span className="text-sm text-soft-gray ml-1">kg</span>
          </div>
        </div>
      </div>

      {/* Body Shape Selection */}
      <div className="space-y-3">
        <label className="block text-sm text-soft-gray uppercase tracking-wider">
          Body Shape
        </label>
        <div className="grid grid-cols-5 gap-2">
          {bodyShapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() => setSelectedShape(shape.id)}
              className={`
                p-3 rounded-xl border text-center transition-all duration-200
                ${
                  selectedShape === shape.id
                    ? 'border-pure-white bg-charcoal'
                    : 'border-border-color hover:border-soft-gray/50'
                }
              `}
            >
              <span className="text-2xl block mb-1">{shape.icon}</span>
              <span className="text-[0.6rem] text-soft-gray uppercase tracking-wider">
                {shape.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* BMI Display */}
      <div className="glass-card p-4 text-center">
        <span className="text-xs text-soft-gray uppercase tracking-wider block mb-1">
          Your BMI
        </span>
        <span className="text-3xl font-bold text-pure-white">
          {(weight / Math.pow(height / 100, 2)).toFixed(1)}
        </span>
      </div>

      {/* Submit Button */}
      <button onClick={handleSubmit} className="btn-primary w-full">
        Continue to Fitting Room →
      </button>
    </motion.div>
  );
}
