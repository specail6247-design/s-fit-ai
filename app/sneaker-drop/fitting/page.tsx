'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const ARFootwearMode = dynamic(() => import('@/components/ARFootwearMode'), { ssr: false });

export default function SneakerFittingPage() {
  return <ARFootwearMode />;
}
