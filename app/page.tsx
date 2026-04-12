'use client';

import RealLifeFitting from '@/components/RealLifeFitting';
import { Navbar } from '@/components/Navbar';
import { SupportHub } from '@/components/SupportHub';

export default function Home() {
  return (
    <>
      <Navbar />
      <RealLifeFitting />
      <SupportHub />
    </>
  );
}
