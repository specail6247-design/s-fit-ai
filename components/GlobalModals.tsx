'use client';

import React, { useEffect, useState } from 'react';
import LegalModal from './LegalModal';
import SupportHub from './SupportHub';

export default function GlobalModals() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <LegalModal />
      <SupportHub />
    </>
  );
}
