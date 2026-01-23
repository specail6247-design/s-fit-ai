'use client';

// S_FIT AI - Digital Twin Mode Component
// Selfie + Full Body for 360° fitting

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  analyzeFace,
  analyzePose,
} from '@/lib/mediapipe';
import type { FaceAnalysis, PoseAnalysis } from '@/lib/mediapipe';
import { useStore } from '@/store/useStore';
import { analyzeClothingStyle } from '@/lib/visionService';

type UploadStep = 'face' | 'body';

interface DigitalTwinModeProps {
  onComplete: () => void;
}

export function DigitalTwinMode({ onComplete }: DigitalTwinModeProps) {
  const {
    clothingAnalysis,
    setSelfieData,
    setFaceAnalysis: setStoredFaceAnalysis,
    setPoseAnalysis: setStoredPoseAnalysis,
    setClothingAnalysis,
  } = useStore();
  
  const [step, setStep] = useState<UploadStep>('face');
  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [bodyPreview, setBodyPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [faceResult, setFaceResult] = useState<FaceAnalysis | null>(null);
  const [poseResult, setPoseResult] = useState<PoseAnalysis | null>(null);
  const [faceStatus, setFaceStatus] = useState<
    'idle' | 'loading' | 'ready' | 'error'
  >('idle');
  const [poseStatus, setPoseStatus] = useState<
    'idle' | 'loading' | 'ready' | 'error'
  >('idle');
  const [faceError, setFaceError] = useState<string | null>(null);
  const [poseError, setPoseError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const runFaceAnalysis = useCallback(async (dataUrl: string) => {
    setFaceStatus('loading');
    setFaceError(null);
    setFaceResult(null);

    try {
      const result = await analyzeFace(dataUrl);
      setFaceResult(result);
      setStoredFaceAnalysis(result);
      setFaceStatus('ready');
    } catch {
      setFaceStatus('error');
      setFaceError('MediaPipe face analysis failed.');
      setStoredFaceAnalysis(null);
    }
  }, [setStoredFaceAnalysis]);

  const runPoseAnalysis = useCallback(
    async (dataUrl: string) => {
      setPoseStatus('loading');
      setPoseError(null);
      setPoseResult(null);

      try {
        // 1. Run MediaPipe (Fast, Client-side)
        const result = await analyzePose(dataUrl);

        // 2. Run HMR 2.0 3D Scan (Server-side)
        try {
          // Convert DataURL to Blob
          const res = await fetch(dataUrl);
          const blob = await res.blob();
          const formData = new FormData();
          formData.append('image', blob, 'body-scan.jpg');

          const hmrResponse = await fetch('/api/scan-body', {
            method: 'POST',
            body: formData,
          });

          if (hmrResponse.ok) {
            const hmrData = await hmrResponse.json();
            if (hmrData.success && hmrData.measurements && result.proportions) {
              // Merge HMR measurements into the proportions
              result.proportions = {
                ...result.proportions,
                ...hmrData.measurements
              };
              result.note = (result.note || '') + ' • 3D Scan Active';
            }
          }
        } catch (e) {
          console.warn('HMR 3D Scan failed, using 2D estimation only:', e);
        }

        setPoseResult(result);
        setStoredPoseAnalysis(result);
        setPoseStatus('ready');
      } catch (e) {
        console.error(e);
        setPoseStatus('error');
        setPoseError('MediaPipe pose analysis failed.');
        setStoredPoseAnalysis(null);
      }
    },
    [setStoredPoseAnalysis]
  );

  const handleFileSelect = useCallback(
    (file: File) => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (step === 'face') {
            setFacePreview(result);
            runFaceAnalysis(result);
          } else {
            setBodyPreview(result);
            runPoseAnalysis(result);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [runFaceAnalysis, runPoseAnalysis, step]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleNext = async () => {
    if (step === 'face' && facePreview && faceStatus === 'ready' && faceResult?.faceCount) {
      setStep('body');
    } else if (step === 'body' && bodyPreview && poseStatus === 'ready' && poseResult?.landmarkCount) {
      // Trigger Masterpiece Deep Analysis
      setPoseStatus('loading');
      
      try {
        const deepAnalysis = await analyzeClothingStyle(bodyPreview);
        setClothingAnalysis(deepAnalysis);
        
        // Finalize
        setSelfieData({ faceImage: facePreview, fullBodyImage: bodyPreview });
        onComplete();
      } catch (err) {
        console.error("Deep Analysis failed:", err);
        // Fallback to basic completion
        setSelfieData({ faceImage: facePreview, fullBodyImage: bodyPreview });
        onComplete();
      }
    }
  };

  const handleBack = () => {
    if (step === 'body') {
      setStep('face');
    }
  };

  const currentPreview = step === 'face' ? facePreview : bodyPreview;
  const isFaceReady = Boolean(facePreview && faceStatus === 'ready' && faceResult?.faceCount);
  const isBodyReady = Boolean(bodyPreview && poseStatus === 'ready' && poseResult?.landmarkCount);
  const canContinue = step === 'face' ? isFaceReady : isBodyReady;

  return (
    <motion.div
      className="w-full max-w-md mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center">
        <span className="text-4xl mb-4 block">👤</span>
        <h2 className="text-2xl font-bold text-pure-white mb-2">Digital Twin</h2>
        <p className="text-sm text-soft-gray">
          Create your 3D avatar for realistic 360° fitting
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-4">
        <div
          className={`flex items-center gap-2 ${
            step === 'face' ? 'text-pure-white' : 'text-soft-gray/50'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              facePreview
                ? 'bg-cyber-lime border-cyber-lime text-void-black'
                : step === 'face'
                  ? 'border-pure-white'
                  : 'border-soft-gray/30'
            }`}
          >
            {facePreview ? '✓' : '1'}
          </div>
          <span className="text-sm">Face</span>
        </div>
        <div className="w-12 h-px bg-soft-gray/30" />
        <div
          className={`flex items-center gap-2 ${
            step === 'body' ? 'text-pure-white' : 'text-soft-gray/50'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              bodyPreview
                ? 'bg-cyber-lime border-cyber-lime text-void-black'
                : step === 'body'
                  ? 'border-pure-white'
                  : 'border-soft-gray/30'
            }`}
          >
            {bodyPreview ? '✓' : '2'}
          </div>
          <span className="text-sm">Body</span>
        </div>
      </div>

      {/* Upload Area */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: step === 'face' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative rounded-2xl border-2 border-dashed
            cursor-pointer transition-all duration-300 overflow-hidden
            flex items-center justify-center
            ${step === 'face' ? 'aspect-square' : 'aspect-[3/4]'}
            ${
              isDragging
                ? 'border-cyber-lime bg-cyber-lime/10'
                : currentPreview
                  ? 'border-pure-white'
                  : 'border-soft-gray/30 hover:border-soft-gray/60'
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />

          {currentPreview ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentPreview}
                alt={`${step} preview`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void-black/60 to-transparent" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (step === 'face') {
                    setFacePreview(null);
                    setFaceResult(null);
                    setStoredFaceAnalysis(null);
                    setFaceStatus('idle');
                    setFaceError(null);
                  } else {
                    setBodyPreview(null);
                    setPoseResult(null);
                    setStoredPoseAnalysis(null);
                    setPoseStatus('idle');
                    setPoseError(null);
                  }
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-void-black/50 
                           flex items-center justify-center text-pure-white hover:bg-void-black/80"
              >
                ✕
              </button>
            </>
          ) : (
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-soft-gray/30 flex items-center justify-center">
                <span className="text-2xl">{step === 'face' ? '👤' : '🧍'}</span>
              </div>
              <p className="text-pure-white font-medium mb-1">
                {step === 'face' ? 'Upload your face selfie' : 'Upload full body photo'}
              </p>
              <p className="text-sm text-soft-gray">
                {step === 'face'
                  ? 'Clear face shot for identity'
                  : 'Standing straight, front view'}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* MediaPipe Analysis */}
      {step === 'face' && faceStatus !== 'idle' && (
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-[0.2em] text-soft-gray">
              Face Analysis
            </span>
            {faceStatus === 'loading' && (
              <span className="text-xs text-cyber-lime">Analyzing...</span>
            )}
          </div>
          {faceStatus === 'error' && (
            <p className="text-sm text-red-400">{faceError}</p>
          )}
          {faceStatus === 'ready' && faceResult && (
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-soft-gray">Face detected</span>
                <span className="text-pure-white">
                  {faceResult.faceCount > 0 ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-soft-gray">Detection confidence</span>
                <span className="text-pure-white">
                  {Math.round(faceResult.confidence * 100)}%
                </span>
              </div>
              <p className="text-xs text-soft-gray/80 mt-2">{faceResult.note}</p>
            </div>
          )}
        </div>
      )}

      {step === 'body' && poseStatus !== 'idle' && (
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-[0.2em] text-soft-gray">
              Pose Analysis
            </span>
            {poseStatus === 'loading' && (
              <span className="text-xs text-cyber-lime">Analyzing...</span>
            )}
          </div>
          {poseStatus === 'error' && (
            <p className="text-sm text-red-400">{poseError}</p>
          )}
          {poseStatus === 'ready' && poseResult && (
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-soft-gray">Landmarks detected</span>
                <span className="text-pure-white">
                  {poseResult.landmarkCount} points
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-soft-gray">Twin readiness</span>
                <span className="text-cyber-lime font-semibold">
                  {poseResult.score} / 100
                </span>
              </div>
              
              {clothingAnalysis && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-5 border-l-4 border-l-cyber-lime relative overflow-hidden mt-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">✨</span>
                    <div>
                      <h4 className="text-xs font-bold text-pure-white italic tracking-wide uppercase">AI Masterpiece Insight</h4>
                      <p className="text-[10px] text-soft-gray/60">Professional Grade Analysis</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-soft-gray leading-relaxed mb-4 italic">
                    &ldquo;{clothingAnalysis.description}&rdquo;
                  </p>
                </motion.div>
              )}

              <p className="text-xs text-soft-gray/80 mt-2">{poseResult.note}</p>
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {step === 'body' && (
          <button onClick={handleBack} className="btn-secondary flex-1">
            ← Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canContinue}
          className={`
            btn-primary flex-1 transition-all
            ${!canContinue ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {step === 'face'
            ? !facePreview
              ? 'Upload face photo →'
              : canContinue
                ? 'Next: Body Photo →'
                : 'Analyzing face...'
            : !bodyPreview
              ? 'Upload body photo →'
              : canContinue
                ? 'Create My Digital Twin →'
                : 'Analyzing body...'}
        </button>
      </div>
    </motion.div>
  );
}
