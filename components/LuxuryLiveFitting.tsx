"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import LuxuryImageDistortion from "@/components/masterpiece/LuxuryImageDistortion";

// Mock Data for Luxury Item
const LUXURY_ITEM = {
  name: "Celestial Silk Gown",
  brand: "Versace",
  price: "$3,450",
  image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2883&auto=format&fit=crop", // High-res fashion image
  description: "A masterpiece of fluid drapery and ethereal movement.",
};

export default function LuxuryLiveFitting() {
  const { isAnalyzing, isFitting, setIsAnalyzing, setIsFitting } = useStore();

  // Simulate analysis sequence on mount or interaction
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsFitting(true);
      setTimeout(() => setIsFitting(false), 5000); // Reset after 5s for demo
    }, 3000);
  };

  // UI Fade Animation Variants
  const uiVariants = {
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    hidden: { opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } },
  };

  // Staggered Reveal Variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-[#f5f5f5]">
      {/* Background / Camera Feed Simulation */}
      <div className="absolute inset-0 z-0">
         {/* In a real app, this would be the webcam feed. For "Masterpiece", we use a high-end image or distortion. */}
         <LuxuryImageDistortion imageUrl={LUXURY_ITEM.image} className="h-full w-full object-cover" />

         {/* Vignette & Grain */}
         <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_120%)] opacity-60" />
         <div className="grain-overlay" />
      </div>

      {/* Main UI Container */}
      <AnimatePresence>
        {!(isAnalyzing || isFitting) && (
          <motion.div
            className="relative z-10 flex h-full flex-col justify-between p-8 md:p-16"
            variants={uiVariants}
            initial="visible"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <motion.header
              className="flex items-center justify-between"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInUp} className="flex flex-col">
                <h1 className="font-cinzel text-3xl font-bold tracking-widest text-[var(--luxury-gold)]">
                  S_FIT <span className="font-light text-white">MASTERPIECE</span>
                </h1>
                <span className="font-space-grotesk text-xs tracking-[0.3em] text-white/60">
                  IMMERSIVE FITTING SUITE
                </span>
              </motion.div>

              <motion.button
                variants={fadeInUp}
                className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-md transition-all hover:bg-white/10"
              >
                <span className="font-space-grotesk text-sm tracking-wider">EXIT SUITE</span>
                <span className="material-symbols-outlined text-[var(--luxury-gold)] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </motion.button>
            </motion.header>

            {/* Product Details (Bottom Left) */}
            <motion.div
              className="max-w-md space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInUp} className="space-y-2">
                <h2 className="font-cinzel text-5xl text-white">{LUXURY_ITEM.brand}</h2>
                <h3 className="font-space-grotesk text-xl font-light tracking-wide text-white/80">
                  {LUXURY_ITEM.name}
                </h3>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="font-space-grotesk text-sm leading-relaxed text-white/60"
              >
                {LUXURY_ITEM.description}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex items-center gap-8 pt-4">
                <span className="font-cinzel text-2xl text-[var(--luxury-gold)]">
                  {LUXURY_ITEM.price}
                </span>
                <button
                  onClick={handleAnalyze}
                  className="group relative overflow-hidden rounded-none border border-[var(--luxury-gold)] bg-transparent px-8 py-3 font-space-grotesk text-sm tracking-widest text-[var(--luxury-gold)] transition-all hover:bg-[var(--luxury-gold)] hover:text-black"
                >
                  <span className="relative z-10">INITIATE FITTING</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Controls (Bottom Right) */}
            <motion.div
              className="absolute bottom-16 right-16 flex flex-col gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
               {/* Just placeholders for controls */}
               {['texture', 'lighting', 'motion'].map((control) => (
                 <motion.button
                   key={control}
                   variants={fadeInUp}
                   className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-sm transition-all hover:scale-110 hover:border-[var(--luxury-gold)]"
                   aria-label={control}
                 >
                   <span className="material-symbols-outlined text-white/60">
                     {control === 'texture' ? 'grain' : control === 'lighting' ? 'light_mode' : 'slow_motion_video'}
                   </span>
                 </motion.button>
               ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis / Digital Mirror State Overlay */}
      <AnimatePresence>
        {(isAnalyzing || isFitting) && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
             {isAnalyzing && (
               <div className="flex flex-col items-center gap-4">
                  <div className="size-16 rounded-full border-t-2 border-[var(--luxury-gold)] animate-spin" />
                  <span className="font-space-grotesk text-sm tracking-[0.3em] text-[var(--luxury-gold)] animate-pulse">
                    ANALYZING PHYSIQUE
                  </span>
               </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
