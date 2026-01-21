'use client';

// S_FIT AI - Vibe Check Mode Component
// Face selfie only - quick style match

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { analyzeFace, type FaceAnalysis } from '@/lib/mediapipe';
import { useStore } from '@/store/useStore';

interface VibeCheckModeProps {
  onComplete: () => void;
}

export function VibeCheckMode({ onComplete }: VibeCheckModeProps) {
  const { setSelfieData, setFaceAnalysis } = useStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysis, setAnalysis] = useState<FaceAnalysis | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<
    'idle' | 'loading' | 'ready' | 'error'
  >('idle');
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const runAnalysis = useCallback(async (dataUrl: string) => {
    setAnalysisStatus('loading');
    setAnalysisError(null);
    setAnalysis(null);

    try {
      const result = await analyzeFace(dataUrl);
      setAnalysis(result);
      setAnalysisStatus('ready');
      setFaceAnalysis(result);
    } catch {
      setAnalysisStatus('error');
      setAnalysisError('MediaPipe analysis failed. Try another photo.');
      setFaceAnalysis(null);
    }
  }, [setFaceAnalysis]);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        runAnalysis(result);
      };
      reader.readAsDataURL(file);
    }
  }, [runAnalysis]);

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

  const handleContinue = () => {
    if (preview && analysisStatus === 'ready' && analysis?.faceCount) {
      setSelfieData({ faceImage: preview });
      onComplete();
    }
  };

  const handleReset = () => {
    setPreview(null);
    setAnalysis(null);
    setAnalysisStatus('idle');
    setAnalysisError(null);
    setFaceAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const canContinue = Boolean(
    preview && analysisStatus === 'ready' && analysis?.faceCount
  );

  return (
    <motion.div
      className="w-full max-w-md mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center">
        <span className="text-4xl mb-4 block">📸</span>
        <h2 className="text-2xl font-bold text-pure-white mb-2">Vibe Check</h2>
        <p className="text-sm text-soft-gray">
          Upload a selfie to see if this style matches your face
        </p>
        <p className="text-xs text-cyber-lime mt-2">⚡ Results in 3 seconds</p>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative aspect-square rounded-2xl border-2 border-dashed
          cursor-pointer transition-all duration-300 overflow-hidden
          flex items-center justify-center
          ${
            isDragging
              ? 'border-cyber-lime bg-cyber-lime/10'
              : preview
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

        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Selfie preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void-black/60 to-transparent" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
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
              <span className="text-2xl">👤</span>
            </div>
            <p className="text-pure-white font-medium mb-1">
              Drop your selfie here
            </p>
            <p className="text-sm text-soft-gray">or click to browse</p>
          </div>
        )}
      </div>

      {/* MediaPipe Analysis */}
      {analysisStatus !== 'idle' && (
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-[0.2em] text-soft-gray">
              MediaPipe Analysis
            </span>
            {analysisStatus === 'loading' && (
              <span className="text-xs text-cyber-lime">Analyzing...</span>
            )}
          </div>

          {analysisStatus === 'error' && (
            <p className="text-sm text-red-400">{analysisError}</p>
          )}

          {analysisStatus === 'ready' && analysis && (
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-soft-gray">Face detected</span>
                <span className="text-pure-white">
                  {analysis.faceCount > 0 ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-soft-gray">Detection confidence</span>
                <span className="text-pure-white">
                  {Math.round(analysis.confidence * 100)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-soft-gray">Vibe score</span>
                <span className="text-cyber-lime font-semibold">
                  {analysis.score} / 100
                </span>
              </div>
              <p className="text-xs text-soft-gray/80 mt-2">{analysis.note}</p>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { icon: '💡', text: 'Good lighting' },
          { icon: '👁️', text: 'Face the camera' },
          { icon: '😊', text: 'Natural expression' },
        ].map((tip, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-charcoal/50 border border-border-color"
          >
            <span className="text-lg block mb-1">{tip.icon}</span>
            <span className="text-[0.65rem] text-soft-gray uppercase tracking-wider">
              {tip.text}
            </span>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!canContinue}
        className={`
          btn-primary w-full transition-all
          ${!canContinue ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {preview
          ? canContinue
            ? 'Check My Vibe →'
            : 'Analyzing photo...'
          : 'Upload a selfie to continue'}
      </button>
    </motion.div>
  );
}
