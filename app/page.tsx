'use client';

import RealLifeFitting from '@/components/RealLifeFitting';
import { SupportHub } from '@/components/SupportHub/SupportHub';
import { AuthButton } from '@/components/AuthButton';

export default function Home() {
  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <AuthButton />
      </div>
      <RealLifeFitting />
      <SupportHub />
    </>
  );
}
