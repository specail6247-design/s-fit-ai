'use client';

import RealLifeFitting from '@/components/RealLifeFitting';


import { useState } from 'react';
import MemberAccessModal from '@/components/service-essentials/MemberAccessModal';
import SupportHubDrawer from '@/components/service-essentials/SupportHubDrawer';

export default function Home() {

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  return (
    <>
      <RealLifeFitting onLoginClick={() => setIsLoginOpen(true)} onSupportClick={() => setIsSupportOpen(true)} />

      <MemberAccessModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SupportHubDrawer isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </>
  );
}
