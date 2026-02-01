'use client';

import LandingPage from '@/components/LandingPage';
import { useStore } from '@/store/useStore';
import { FittingRoom } from '@/components/FittingRoom';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const { selectedMode } = useStore();

  return (
    <AnimatePresence mode="wait">
      {!selectedMode ? (
        <motion.div key="landing" exit={{ opacity: 0, y: -20 }}>
          <LandingPage />
        </motion.div>
      ) : (
        <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FittingRoom />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
