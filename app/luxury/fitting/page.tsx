'use client';

import { FittingRoom } from "@/components/FittingRoom";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";

export default function LuxuryFittingPage() {
  const { setSelectedBrand } = useStore();

  useEffect(() => {
    // Default to Hermes for the Luxury Line experience
    setSelectedBrand('Hermes');
  }, [setSelectedBrand]);

  return (
    <div className="w-full h-screen">
      <FittingRoom />
    </div>
  );
}
