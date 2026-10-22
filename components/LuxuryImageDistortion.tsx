import React from 'react';

interface Props {
  imageUrl: string;
  alt?: string;
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, alt = "", className = "" }: Props) {
  // A sophisticated, smooth image wrapper with CSS-based distortion/scale effect on hover
  // The actual request might be referring to an unimplemented component, so we'll build a luxury one.
  return (
    <div className={`overflow-hidden relative group ${className}`}>
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
        role="img"
        aria-label={alt}
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </div>
  );
}
