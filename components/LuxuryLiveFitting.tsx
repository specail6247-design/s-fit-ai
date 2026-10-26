"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Inter } from "next/font/google";
import { LuxuryCursor } from "./luxury/LuxuryCursor";
import { LuxuryImageDistortion } from "./luxury/LuxuryImageDistortion";
import { LuxuryLoading } from "./luxury/LuxuryLoading";
import { motion, AnimatePresence } from "framer-motion";

const cinzel = Cinzel({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

// Mock Brand Data
const BRAND = {
  name: "GIVENCHY",
  description: "The essence of Parisian elegance and modern sophistication.",
  bannerImage: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=2000",
};

const GARMENTS = [
  {
    name: "Aura Silk Blazer",
    price: 2400,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
  },
  {
    name: "Midnight Silk Gown",
    price: 3100,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0"
  },
  {
    name: "Oblique Moto Jacket",
    price: 1800,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA"
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Simulate loading for the luxury experience
    const timer = setTimeout(() => setIsLoading(false), 2500);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`relative min-h-screen w-full bg-[#050505] text-[#F4E4BC] overflow-x-hidden ${inter.className}`}>
      <LuxuryCursor />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="w-1/3 max-w-sm">
                <LuxuryLoading />
                <motion.p
                  className={`mt-8 text-center text-[#d4af37] tracking-[0.3em] uppercase text-sm ${cinzel.className}`}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                    Preparing Atelier
                </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parallax Brand Banner */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${BRAND.bannerImage})`,
            y: scrollY * 0.5, // Parallax effect
            filter: "saturate(0.8) contrast(1.2) brightness(0.6)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8 text-center">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`text-6xl md:text-8xl text-[#d4af37] tracking-[0.1em] ${cinzel.className}`}
              style={{ textShadow: "0 10px 30px rgba(212, 175, 55, 0.2)" }}
            >
                {BRAND.name}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
              className="w-24 h-px bg-[#d4af37] my-6 origin-center"
            />
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="max-w-md text-sm md:text-base text-white/70 tracking-widest font-light leading-relaxed"
            >
                {BRAND.description}
            </motion.p>
        </div>
      </div>

      {/* Collection Grid */}
      <div className="max-w-7xl mx-auto px-8 py-24">
        <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-2xl text-center mb-16 tracking-[0.2em] text-[#d4af37] ${cinzel.className}`}
        >
            The Collection
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-12">
            {GARMENTS.map((garment, index) => (
                <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col group cursor-pointer"
                >
                    <div className="aspect-[3/4] mb-8 overflow-hidden">
                        <LuxuryImageDistortion
                            imageUrl={garment.img}
                            alt={garment.name}
                            className="w-full h-full object-cover filter transition-all duration-1000 saturate-[0.9] contrast-[1.1] group-hover:saturate-100"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center space-y-3">
                        <h3 className={`text-lg text-white/90 tracking-widest uppercase transition-colors duration-700 group-hover:text-[#d4af37] ${cinzel.className}`}>
                            {garment.name}
                        </h3>
                        <p className="text-sm text-white/50 tracking-wider">
                            {formatPrice(garment.price)}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>

      {/* Bottom CTA / Try On */}
      <div className="fixed bottom-0 w-full p-8 z-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none flex justify-center">
          <button className="pointer-events-auto group relative px-12 py-4 overflow-hidden border border-[#d4af37]/30 bg-[#0a0a0a]/80 backdrop-blur-md transition-all duration-1000 hover:border-[#d4af37]">
              <div className="absolute inset-0 bg-[#d4af37] translate-y-[100%] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0" />
              <span className={`relative z-10 text-xs tracking-[0.3em] uppercase transition-colors duration-700 text-[#d4af37] group-hover:text-[#050505] ${cinzel.className}`}>
                  Experience Live Fit
              </span>
          </button>
      </div>

    </div>
  );
}
