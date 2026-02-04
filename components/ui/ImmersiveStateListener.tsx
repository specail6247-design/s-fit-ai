'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export const ImmersiveStateListener = () => {
  const isAnalyzing = useStore((state) => state.isAnalyzing);
  const isFitting = useStore((state) => state.isFitting);

  useEffect(() => {
    const isImmersive = isAnalyzing || isFitting;
    if (isImmersive) {
      document.body.classList.add('immersive-mode');
    } else {
      document.body.classList.remove('immersive-mode');
    }
  }, [isAnalyzing, isFitting]);

  return null;
};
