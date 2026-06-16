"use client";

import React, { useState } from 'react';

interface HyperZoomViewProps {
    imageUrl: string;
    altText: string;
}

export default function HyperZoomView({ imageUrl, altText }: HyperZoomViewProps) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [origin, setOrigin] = useState('50% 50%');

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setOrigin(`${x}% ${y}%`);
    };

    return (
        <div
            className="relative overflow-hidden cursor-zoom-in w-full h-full rounded-2xl border border-white/10 group"
            onClick={() => setIsZoomed(!isZoomed)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setIsZoomed(false); setOrigin('50% 50%'); }}
            style={{
                cursor: isZoomed ? 'zoom-out' : 'zoom-in'
            }}
        >
            <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    transform: isZoomed ? 'scale(3)' : 'scale(1)',
                    transformOrigin: origin,
                    filter: 'saturate(0.9) contrast(1.1)'
                }}
                title={altText}
            />
            {/* Overlay hint */}
            {!isZoomed && (
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                     <span className="material-symbols-outlined text-white text-4xl drop-shadow-lg font-light">zoom_in</span>
                </div>
            )}
        </div>
    );
}