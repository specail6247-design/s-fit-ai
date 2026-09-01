import React from 'react';
import { motion } from 'framer-motion';

export function LuxuryImageDistortion({ src, alt }: { src: string, alt: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
        <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${src}')` }}
            data-alt={alt}
        />
        {/* Subtle overlay for distortion effect (mock) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 mix-blend-overlay"></div>
    </div>
  );
}
