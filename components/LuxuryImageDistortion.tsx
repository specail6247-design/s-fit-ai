import React from 'react';

interface LuxuryImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ src, alt, className = '' }: LuxuryImageDistortionProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Fallback dummy component for the requested distortion effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
      {/* Simulated subtle distortion/glare overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  );
}
