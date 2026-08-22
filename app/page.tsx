'use client';

import { useStore } from '@/store/useStore';
import { LandingPage } from '@/components/LandingPage';
import { FittingRoom } from '@/components/FittingRoom';

export default function Home() {
  const { selectedMode } = useStore();

  if (selectedMode) {
    return <FittingRoom />;
  }

  return <LandingPage />;
}
