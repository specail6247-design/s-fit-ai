'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HyperZoomViewer({ material, imageUrl }: { material: string, imageUrl: string }) {
  const [isZoomed, setIsZoomed] = useState(false);
  return (
    <div
      className="relative w-full h-[60vh] overflow-hidden rounded-xl border border-white/20 cursor-crosshair"
      onClick={() => setIsZoomed(!isZoomed)}
    >
      <motion.img
        src={imageUrl}
        alt="Garment"
        className="w-full h-full object-cover saturate-[.9] contrast-[1.1]"
        animate={{ scale: isZoomed ? 3 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <div className="text-white text-center">
              <h3 className="text-2xl font-mono uppercase tracking-widest text-[#C9B037]">Hyper-Zoom Active</h3>
              <p className="text-sm font-sans mt-2">Revealing {material} Micro-Fiber Details</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
