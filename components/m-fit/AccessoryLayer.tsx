import React from 'react';

interface AccessoryLayerProps {
    type: 'necklace' | 'ring' | 'bag' | 'scarf' | 'hat';
    imageUrl: string;
    zIndex?: number;
    className?: string;
}

export default function AccessoryLayer({ type, imageUrl, zIndex = 20, className = '' }: AccessoryLayerProps) {
    // Determine positioning based on type to simulate interactions (e.g. resting on blouse)
    let positioning = 'absolute top-1/4 left-1/2 -translate-x-1/2 w-1/4';

    if (type === 'bag') {
        positioning = 'absolute bottom-1/4 right-1/4 w-1/3';
    } else if (type === 'ring') {
        positioning = 'absolute bottom-1/3 right-1/3 w-12';
    } else if (type === 'hat') {
        positioning = 'absolute top-0 left-1/2 -translate-x-1/2 w-1/2 -translate-y-1/4';
    } else if (type === 'scarf') {
        positioning = 'absolute top-1/4 left-1/2 -translate-x-1/2 w-1/2';
    }

    return (
        <div
            className={`${positioning} pointer-events-none drop-shadow-2xl ${className}`}
            style={{ zIndex }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={imageUrl}
                alt={`${type} accessory`}
                className="w-full h-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]"
            />
        </div>
    );
}