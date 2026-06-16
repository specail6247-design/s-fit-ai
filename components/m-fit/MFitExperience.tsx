"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SmoothScroll from './SmoothScroll';
import GoldRingCursor from './GoldRingCursor';
import HyperZoomView from './HyperZoomView';
import AccessoryLayer from './AccessoryLayer';
import CinematicShare from './CinematicShare';

// Using the provided photo fitting image for the base mannequin
const baseImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGfKW7fSSx0BbN4w9CP-cPpb_GgcZgK3IAWtBDg18Z4EDDIvAvw0CYBp2ynyLSCTfQa3XtdTA5PTl7gZiCiugdiuuJGRvvmUlvjBFrWthED8dEe3CP3REf2b2s3LD1jlGYxcOkEBqgVsRXmY3sN7_6LsADaLzbcd5SrJPyiMiop4OSdYyRPcnzNh9Boe6dav_PUsJn_t0Fo1urrSzWCUnXU8cLgZY7rJmKnal8LfghoMed8GtjDMO9ruztSGEQMUNqhhkDtR0k60g';
// Using a placeholder ring accessory
const ringImage = 'https://cdn-icons-png.flaticon.com/512/121/121114.png';

export default function MFitExperience() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showAccessory, setShowAccessory] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsGenerating(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    };

    return (
        <SmoothScroll>
            <GoldRingCursor />
            <div className="min-h-screen bg-black text-white selection:bg-[#ecab13] selection:text-black font-['Space_Grotesk'] pb-32">

                {/* Header */}
                <header className="fixed top-0 w-full z-50 mix-blend-difference p-8 flex justify-between items-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-['Cinzel'] text-2xl tracking-[0.3em]"
                    >
                        M_FIT
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-xs tracking-[0.2em] uppercase font-light"
                    >
                        Masterpiece Collection
                    </motion.div>
                </header>

                {/* Hero / Studio View */}
                <main className="pt-32 px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Left: 3D/Hyper-Zoom Viewport */}
                    <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0">
                        {/* Decorative corners */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-[#ecab13]/30 pointer-events-none" />
                        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-[#ecab13]/30 pointer-events-none" />

                        <HyperZoomView imageUrl={baseImage} altText="M_FIT Virtual Mannequin" />

                        {showAccessory && (
                            <AccessoryLayer type="ring" imageUrl={ringImage} className="opacity-80 mix-blend-screen" />
                        )}

                        {/* Processing Overlay */}
                        {isGenerating && (
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center rounded-2xl border border-[#ecab13]/20 z-30">
                                 <motion.div
                                    className="w-16 h-16 border-t-2 border-l-2 border-[#ecab13] rounded-full mb-8"
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                 />
                                 <div className="font-['Cinzel'] tracking-[0.2em] text-[#ecab13] mb-4 text-xl">Synthesizing</div>
                                 <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                                     <motion.div
                                        className="h-full bg-[#ecab13]"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.5 }}
                                     />
                                 </div>
                                 <div className="mt-4 text-xs tracking-widest text-white/50">{progress}%</div>
                            </div>
                        )}
                    </div>

                    {/* Right: Atelier Controls */}
                    <div className="flex flex-col justify-center gap-12">

                        {/* Title & Price */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="flex items-center gap-4 mb-4"
                            >
                                <span className="w-12 h-px bg-[#ecab13]"></span>
                                <span className="text-[#ecab13] text-xs uppercase tracking-[0.3em] font-semibold">Look 01</span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="font-['Cinzel'] text-5xl md:text-7xl leading-tight mb-6"
                            >
                                Liquid Gold <br/>
                                <span className="font-light italic text-white/70">Silhouette</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="text-3xl font-light tracking-wider"
                            >
                                $12,500
                            </motion.p>
                        </div>

                        {/* Specs */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="grid grid-cols-2 gap-8 py-8 border-y border-white/10"
                        >
                            <div>
                                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">Material</div>
                                <div className="text-sm tracking-wider">24K Woven Silk</div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">Physics Engine</div>
                                <div className="text-sm tracking-wider">Runway Gen-4</div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">Texture Resolution</div>
                                <div className="text-sm tracking-wider">8K Hyper-Zoom</div>
                            </div>
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="flex flex-col gap-6"
                        >
                            <button
                                onClick={handleGenerate}
                                className="w-full py-6 bg-white text-black font-['Space_Grotesk'] text-sm uppercase tracking-[0.2em] font-bold transition-all duration-700 hover:bg-[#ecab13] hover:text-black hover:shadow-[0_0_40px_rgba(236,171,19,0.3)] active:scale-95"
                            >
                                Initiate Motion Synthesis
                            </button>

                            <button
                                onClick={() => setShowAccessory(!showAccessory)}
                                className="w-full py-6 border border-white/20 text-white font-['Space_Grotesk'] text-sm uppercase tracking-[0.2em] transition-all duration-700 hover:border-white hover:bg-white/5 active:scale-95"
                            >
                                {showAccessory ? 'Remove Accessories' : 'Layer Accessories'}
                            </button>

                            <div className="pt-8">
                                 <CinematicShare imageUrl={baseImage} />
                            </div>
                        </motion.div>

                    </div>
                </main>
            </div>
        </SmoothScroll>
    );
}