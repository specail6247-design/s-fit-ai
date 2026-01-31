'use client';
import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { FittingRoom } from "@/components/FittingRoom";

export default function LuxuryFittingPage() {
  const setSelectedBrand = useStore((state) => state.setSelectedBrand);

  useEffect(() => {
    setSelectedBrand('Gucci');
  }, [setSelectedBrand]);

  return (
    <FittingRoom />
  );
}
