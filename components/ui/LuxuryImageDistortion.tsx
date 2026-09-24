'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative overflow-hidden w-full h-full rounded-2xl group cursor-none">
      <motion.img
        src={imageUrl}
        alt="Luxury Garment"
        className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
    </div>
  );
}
