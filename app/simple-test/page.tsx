'use client';

import React, { useEffect } from 'react';
import { FittingRoom } from '@/components/FittingRoom';
import { useStore } from '@/store/useStore';

export default function SimpleTestPage() {
  const { setSelectedBrand, setSelectedMode } = useStore();

  useEffect(() => {
    // Initialize store for testing
    setSelectedBrand('Hermes');
    setSelectedMode('easy-fit');
  }, [setSelectedBrand, setSelectedMode]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <FittingRoom />
    </div>
  );
}
