'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import LuxuryCursor from './LuxuryCursor';
import LuxuryImageDistortion from './LuxuryImageDistortion';
import Link from 'next/link';

export default function LuxuryLiveFitting() {
  const { isAnalyzing, isFitting, setAnalyzing, setFitting } = useStore();

  // Example toggle for testing state simulation
  const handleStartFitting = () => {
    setAnalyzing(true);
    // Simulate flow
    setTimeout(() => {
        setAnalyzing(false);
        setFitting(true);
        setTimeout(() => {
            setFitting(false);
        }, 3000);
    }, 2000);
  };

  const easeBezier = [0.16, 1, 0.3, 1] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.8,
            ease: easeBezier
        }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: easeBezier }
    }
  };

  const isImmersive = isAnalyzing || isFitting;

  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden text-[#f5f5f5] font-sans selection:bg-[#ecab13] selection:text-black cursor-none">
      <LuxuryCursor />

      {/* Background / Main Visual - Always Visible but Clean */}
      <div className="absolute inset-0 z-0">
         <LuxuryImageDistortion imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCGfKW7fSSx0BbN4w9CP-cPpb_GgcZgK3IAWtBDg18Z4EDDIvAvw0CYBp2ynyLSCTfQa3XtdTA5PTl7gZiCiugdiuuJGRvvmUlvjBFrWthED8dEe3CP3REf2b2s3LD1jlGYxcOkEBqgVsRXmY3sN7_6LsADaLzbcd5SrJPyiMiop4OSdYyRPcnzNh9Boe6dav_PUsJn_t0Fo1urrSzWCUnXU8cLgZY7rJmKnal8LfghoMed8GtjDMO9ruztSGEQMUNqhhkDtR0k60g" />
      </div>

      {/* Digital Mirror Overlay - Fades out UI */}
      <AnimatePresence mode="wait">
        {!isImmersive && (
          <motion.div
            key="ui-layer"
            className="absolute inset-0 z-10 flex flex-col pointer-events-none"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <header className="flex justify-between items-center p-8 pointer-events-auto">
               <motion.div variants={itemVariants} className="flex items-center gap-4">
                 <Link href="/luxury" className="hover:opacity-70 transition-opacity flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-[#ecab13] hover:text-[#ecab13]">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                 </Link>
                 <div>
                    <h1 className="text-xl tracking-[0.2em] uppercase text-white font-[family-name:var(--font-cinzel)]">S_FIT AI</h1>
                    <p className="font-[family-name:var(--font-space)] text-[10px] tracking-widest text-[#ecab13] uppercase">Masterpiece Collection</p>
                 </div>
               </motion.div>

               <motion.div variants={itemVariants} className="flex gap-6">
                 <button className="text-[10px] font-bold uppercase tracking-widest hover:text-[#ecab13] transition-colors font-[family-name:var(--font-space)]">Settings</button>
                 <button className="text-[10px] font-bold uppercase tracking-widest hover:text-[#ecab13] transition-colors font-[family-name:var(--font-space)]">Account</button>
               </motion.div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col justify-end p-12 pb-24 pointer-events-auto pl-24">
                <div className="max-w-xl">
                    <motion.p variants={itemVariants} className="font-[family-name:var(--font-space)] text-[#ecab13] text-xs tracking-[0.3em] mb-4 uppercase">
                        Virtual Atelier
                    </motion.p>
                    <motion.h2 variants={itemVariants} className="font-[family-name:var(--font-cinzel)] text-7xl leading-none mb-6">
                        The Liquid <br/> Silk Blazer
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-zinc-400 leading-relaxed max-w-md mb-8 font-light font-[family-name:var(--font-space)] text-sm">
                        Experience the fluid dynamics of digital silk. Our proprietary physics engine simulates 42,000 tension points for hyper-realistic draping.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex gap-6 items-center">
                        <button
                            onClick={handleStartFitting}
                            className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#ecab13] hover:text-white transition-all duration-500 font-[family-name:var(--font-space)] text-xs hover:scale-105"
                        >
                            Start Fitting
                        </button>
                        <button className="flex items-center gap-2 group">
                             <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#ecab13] transition-colors">
                                <span className="material-symbols-outlined group-hover:text-[#ecab13] transition-colors text-lg">play_arrow</span>
                             </div>
                             <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-[#ecab13] transition-colors font-[family-name:var(--font-space)]">View Film</span>
                        </button>
                    </motion.div>
                </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive/Analysis State Overlay */}
      <AnimatePresence>
        {isImmersive && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none bg-black/20 backdrop-blur-[2px]"
            >
                <div className="text-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            borderColor: ['rgba(236, 171, 19, 0.3)', 'rgba(236, 171, 19, 1)', 'rgba(236, 171, 19, 0.3)']
                        }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="w-32 h-32 border border-[#ecab13] rounded-full flex items-center justify-center mx-auto mb-8 relative"
                    >
                        <motion.div
                             animate={{ rotate: 360 }}
                             transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                             className="absolute inset-0 border-t border-[#ecab13] rounded-full"
                        />
                        <div className="w-1 h-1 bg-[#ecab13] rounded-full" />
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-[family-name:var(--font-space)] text-[#ecab13] text-[10px] tracking-[0.4em] uppercase"
                    >
                        {isAnalyzing ? 'Scanning Geometry' : 'Draping Fabric'}
                    </motion.p>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Footer / Legal */}
      <AnimatePresence>
        {!isImmersive && (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute bottom-0 w-full p-8 flex justify-between items-end z-10 pointer-events-none px-12"
            >
                <motion.div variants={itemVariants} className="font-[family-name:var(--font-space)] text-[9px] text-zinc-600 uppercase tracking-widest pointer-events-auto">
                    S_FIT AI v2.4.0 / Masterpiece Engine
                </motion.div>

                 <motion.div variants={itemVariants} className="font-[family-name:var(--font-space)] text-[9px] text-zinc-600 uppercase tracking-widest pointer-events-auto">
                    Protected by Quantum Encryption
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
