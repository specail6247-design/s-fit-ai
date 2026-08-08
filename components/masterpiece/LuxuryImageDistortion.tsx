import React from 'react';
import { motion } from 'framer-motion';

export default function LuxuryImageDistortion({ src, alt }: { src: string, alt?: string }) {
  return (
    <motion.div
      className="relative overflow-hidden w-full h-full rounded-2xl border border-[rgba(201,176,55,0.3)] shadow-[0_0_40px_rgba(201,176,55,0.1)]"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: `url('${src}')` }}
        aria-label={alt}
      />
      {/* Luxury shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.1)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    </motion.div>
  );
}
