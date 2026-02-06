'use client';

import { useEffect } from 'react';
import { FittingRoom } from '../../components/FittingRoom';
import { useStore } from '../../store/useStore';

export default function TestFittingPage() {
  const { setSelectedBrand } = useStore();

  useEffect(() => {
    // Force set the brand to Hermes for testing
    const timer = setTimeout(() => {
        setSelectedBrand('Hermes');
    }, 100);
    return () => clearTimeout(timer);
  }, [setSelectedBrand]);

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <FittingRoom />
    </main>
  );
}
