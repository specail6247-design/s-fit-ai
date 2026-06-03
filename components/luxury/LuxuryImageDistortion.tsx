import React from 'react';

interface Props {
  imageUrl: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, alt, className = '' }: Props) {
  // A placeholder component that provides a distortion effect on hover.
  // We'll implement a basic CSS filter / scale effect for now as a "distortion"
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
      <img src={imageUrl} alt={alt} className="opacity-0 w-full h-full object-cover" />
    </div>
  );
}
