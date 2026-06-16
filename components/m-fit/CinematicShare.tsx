"use client";

import React, { useRef, useState } from 'react';

interface CinematicShareProps {
    imageUrl: string;
}

export default function CinematicShare({ imageUrl }: CinematicShareProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isExporting, setIsExporting] = useState(false);

    const handleShare = async () => {
        setIsExporting(true);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Create new image object with crossOrigin anonymous to prevent tainting
        const img = new window.Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            // Draw background image
            ctx.filter = 'saturate(0.9) contrast(1.1)';
            // calculate aspect ratio cover
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);

            // Draw Vignette
            const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, canvas.width/4, canvas.width/2, canvas.height/2, canvas.height);
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(1, 'rgba(0,0,0,0.8)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0,0, canvas.width, canvas.height);

            // Draw Logos
            ctx.filter = 'none';
            ctx.fillStyle = '#ecab13'; // Brand gold
            ctx.font = 'bold 80px "Cinzel"';
            ctx.textAlign = 'center';
            ctx.fillText('M_FIT', canvas.width / 2, canvas.height - 200);

            ctx.fillStyle = 'white';
            ctx.font = '40px "Space Grotesk"';
            ctx.fillText('S_FIT AI', canvas.width / 2, canvas.height - 120);

            // Export to data URL
            const dataUrl = canvas.toDataURL('image/jpeg', 1.0);

            // Create a fake download link
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = 'm-fit-cinematic-share.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setIsExporting(false);
        };

        img.src = imageUrl;
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={handleShare}
                disabled={isExporting}
                className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-[#ecab13]/30 rounded-full transition-all duration-700 active:scale-95 group disabled:opacity-50"
            >
                <span className="material-symbols-outlined text-[#ecab13] group-hover:rotate-12 transition-transform duration-700">ios_share</span>
                <span className="font-['Space_Grotesk'] text-sm tracking-[0.2em] uppercase text-white font-medium">
                    {isExporting ? 'Exporting 4K...' : 'Share Cinematic'}
                </span>
            </button>

            {/* Hidden canvas for rendering the 9:16 story (e.g. 1080x1920) */}
            <canvas
                ref={canvasRef}
                width={1080}
                height={1920}
                className="hidden"
            />
        </div>
    );
}