import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ src, alt, className = '' }: Props) {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
        initial={{ scale: 1.1, filter: 'contrast(1.2) saturate(0)' }}
        animate={{ scale: 1, filter: 'contrast(1) saturate(1)' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.05, transition: { duration: 0.7 } }}
      />
    </div>
  );
}
