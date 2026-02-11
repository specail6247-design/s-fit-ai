"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { brands, getItemsByBrand } from "@/data/mockData";
import LuxuryImageDistortion from "@/components/masterpiece/LuxuryImageDistortion";

export default function LuxuryLiveFitting() {
  const [selectedBrandId, setSelectedBrandId] = useState("gucci");
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const selectedBrand = brands.find((b) => b.id === selectedBrandId) || brands[0];
  const products = getItemsByBrand(selectedBrandId);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#050505]">
        <div className="relative size-32">
          {/* Gold Line Tracing Box Animation */}
          <motion.svg
            viewBox="0 0 100 100"
            className="absolute inset-0 size-full"
          >
            <motion.rect
              x="2"
              y="2"
              width="96"
              height="96"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </motion.svg>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-xs tracking-[0.3em] text-[#D4AF37] font-[family-name:var(--font-cinzel)]">LOADING</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-[#D4AF37] font-[family-name:var(--font-cinzel)]">
      {/* Background with Distortion */}
      <div className="absolute inset-0 z-0">
         <LuxuryImageDistortion imageUrl={selectedBrand.bannerImage || selectedBrand.logo} />
         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent/20 opacity-95" />
      </div>

      {/* Top Navigation Bar */}
      <div className="relative z-20 flex items-center justify-between p-8">
        <div className="flex size-12 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/40 backdrop-blur-md transition-colors duration-700 hover:border-[#D4AF37]">
          <span className="material-symbols-outlined text-[#D4AF37]">close</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-12 bg-[#D4AF37]/50"></div>
          <h2 className="text-xl tracking-[0.3em] uppercase text-[#D4AF37]">Maison S_FIT</h2>
          <div className="h-[1px] w-12 bg-[#D4AF37]/50"></div>
        </div>
        <div className="flex size-12 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/40 backdrop-blur-md transition-colors duration-700 hover:border-[#D4AF37]">
          <span className="material-symbols-outlined text-[#D4AF37]">shopping_bag</span>
        </div>
      </div>

      <div className="relative z-10 flex h-full w-full">
        {/* Left Side: Brand & Status */}
        <div className="flex w-1/2 flex-col justify-center px-12 pb-24 pl-24">
            <motion.div
                key={selectedBrand.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <h1 className="text-7xl font-normal leading-tight tracking-wider text-white drop-shadow-2xl">
                    <span className="block text-2xl text-[#D4AF37] mb-6 tracking-[0.4em] font-[family-name:var(--font-space-grotesk)] uppercase">
                        {selectedBrand.name} Collection
                    </span>
                    {selectedBrand.description ? (
                         <span className="text-xl font-[family-name:var(--font-cinzel)] italic text-white/80 max-w-lg block leading-relaxed">
                            &quot;{selectedBrand.description}&quot;
                         </span>
                    ) : (
                        <span>AUTUMN<br/>WINTER</span>
                    )}
                </h1>
            </motion.div>

            <div className="mt-16 flex gap-12">
                 <div className="flex flex-col gap-2">
                    <p className="text-xs tracking-[0.3em] text-[#D4AF37]/70 font-[family-name:var(--font-space-grotesk)]">STABILITY</p>
                    <div className="h-[2px] w-32 bg-[#D4AF37]/30">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "95%" }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
                            className="h-full bg-[#D4AF37]"
                        />
                    </div>
                    <p className="text-lg text-[#D4AF37] mt-1">95%</p>
                 </div>

                 {/* Brand Selector (Quick Switch) */}
                 <div className="flex gap-4 items-end pb-2">
                    {brands.filter(b => b.isLuxury).map(b => (
                        <button
                            key={b.id}
                            onClick={() => setSelectedBrandId(b.id)}
                            className={`size-2 rounded-full transition-all duration-500 ${selectedBrandId === b.id ? 'bg-[#D4AF37] scale-150' : 'bg-[#D4AF37]/30 hover:bg-[#D4AF37]/70'}`}
                            aria-label={`Select ${b.name}`}
                        />
                    ))}
                 </div>
            </div>
        </div>

        {/* Right Side: Product Gallery (Masonry/Vertical) */}
        <div className="flex w-1/2 items-start justify-end px-12 pb-24 overflow-hidden h-full pt-24">
            <div className="flex h-full w-full max-w-md flex-col gap-8 overflow-y-auto pr-4 scrollbar-hide pb-32">
                {products.length > 0 ? products.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: i * 0.2 + 0.5 }}
                        className="group relative flex w-full cursor-pointer flex-col gap-4 bg-black/60 p-6 backdrop-blur-md border border-[#D4AF37]/10 transition-all duration-700 hover:border-[#D4AF37]/60 hover:bg-black/80"
                    >
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#101922]">
                             <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                style={{ backgroundImage: `url("${item.imageUrl}")` }}
                             />
                             <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10" />

                             {/* Hover Overlay */}
                             <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                <button className="rounded-none border border-[#D4AF37] bg-black/50 px-6 py-3 text-sm tracking-[0.2em] text-[#D4AF37] backdrop-blur-md transition-colors hover:bg-[#D4AF37] hover:text-black uppercase">
                                    Try On
                                </button>
                             </div>
                        </div>
                        <div className="flex justify-between items-end border-t border-[#D4AF37]/20 pt-4">
                            <div>
                                <h3 className="text-xl tracking-widest text-white font-[family-name:var(--font-cinzel)]">{item.name}</h3>
                                <p className="text-xs tracking-[0.2em] text-[#D4AF37]/70 mt-2 font-[family-name:var(--font-space-grotesk)] uppercase">{item.category}</p>
                            </div>
                            <p className="text-2xl text-[#D4AF37] font-[family-name:var(--font-cinzel)]">{formatPrice(item.price)}</p>
                        </div>
                    </motion.div>
                )) : (
                    <div className="text-center text-[#D4AF37]/50 mt-20">
                        No items found for this collection.
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center">
         <div className="flex items-center gap-16 rounded-full border border-[#D4AF37]/30 bg-black/80 px-10 py-5 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
             <button className="text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors duration-500 flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-3xl">undo</span>
             </button>
             <button className="relative flex size-20 items-center justify-center rounded-full border border-[#D4AF37] bg-transparent text-[#D4AF37] transition-all duration-700 hover:bg-[#D4AF37] hover:text-black hover:scale-105 hover:shadow-[0_0_20px_#D4AF37]">
                 <span className="material-symbols-outlined text-4xl">camera_alt</span>
             </button>
             <button className="text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors duration-500 flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-3xl">ios_share</span>
             </button>
         </div>
      </div>

    </div>
  );
}
