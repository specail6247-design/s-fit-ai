'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { LandingPage } from '@/components/LandingPage';
import { VibeCheckMode } from '@/components/VibeCheckMode';
import { EasyFitMode } from '@/components/EasyFitMode';
import { DigitalTwinMode } from '@/components/DigitalTwinMode';
import { FittingRoom } from '@/components/FittingRoom';

export default function Home() {
  const { selectedMode } = useStore();
  const [showFittingRoom, setShowFittingRoom] = useState(false);

  const handleModeComplete = () => {
    setShowFittingRoom(true);
  };

  // If the user has completed the setup flow, show the Fitting Room
  if (showFittingRoom) {
    return <FittingRoom />;
  }

  // Routing based on selected mode
  switch (selectedMode) {
    case 'vibe-check':
      return <VibeCheckMode onComplete={handleModeComplete} />;
    case 'digital-twin':
      return <DigitalTwinMode onComplete={handleModeComplete} />;
    case 'easy-fit':
      return <EasyFitMode onComplete={handleModeComplete} />;
    default:
      return <LandingPage />;
  }
}
