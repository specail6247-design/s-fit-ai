'use client';

import { AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import LoginModal from '@/components/LoginModal';
import SupportHub from '@/components/SupportHub';
import { useEffect, useState } from 'react';

export default function GlobalOverlays() {
  const isLoginOpen = useStore((state) => state.isLoginOpen);
  const isSupportOpen = useStore((state) => state.isSupportOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {isLoginOpen && <LoginModal />}
      </AnimatePresence>
      <AnimatePresence>
        {isSupportOpen && <SupportHub />}
      </AnimatePresence>
    </>
  );
}
