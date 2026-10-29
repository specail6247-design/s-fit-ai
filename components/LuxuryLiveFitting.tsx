"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const cinzel = Cinzel({ subsets: ["latin"], display: 'optional' });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: 'optional' });

const BRANDS = [
  {
    id: "gucci",
    name: "GUCCI",
    description: "Florence, 1921. Eclectic, contemporary, romantic.",
    bannerImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: "prada",
    name: "PRADA",
    description: "Milan, 1913. Intellectual, uncompromising, conceptual.",
    bannerImage: "https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&q=80&w=2000",
  }
];

const PRODUCTS = [
  { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
  { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
  { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
];

export const LuxuryCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('.cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-[#d4af37] mix-blend-difference hidden md:block"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 16),
        y: mousePosition.y - (isHovering ? 24 : 16),
        width: isHovering ? 48 : 32,
        height: isHovering ? 48 : 32,
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    />
  );
};

export const LuxuryImageDistortion = ({ src, alt, className = '' }: { src: string; alt: string; className?: string }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-1000 ease-out cursor-pointer"
        whileHover={{ scale: 1.05, filter: 'saturate(1.1) contrast(1.1)' }}
        initial={{ filter: 'saturate(0.9) contrast(1.1)' }}
      />
    </div>
  );
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
};

const LuxuryLoading = () => (
  <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505]">
    <div className="relative w-32 h-40">
      <motion.div
        className="absolute top-0 left-0 h-[1px] bg-[#d4af37]"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-0 right-0 w-[1px] bg-[#d4af37]"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[1px] bg-[#d4af37]"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[1px] bg-[#d4af37]"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1.5 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {}
        <span className={`text-[#d4af37] tracking-[0.2em] text-xs uppercase ${cinzel.className}`}>Loading</span>
      </div>
    </div>
  </div>
);

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (

    <div className={`relative flex min-h-screen w-full flex-col overflow-hidden bg-[#050505] text-[#f5f5f5] ${spaceGrotesk.className}`}>
      <LuxuryCursor />

      <AnimatePresence>
        {isLoading && <LuxuryLoading />}
      </AnimatePresence>

      <div className="relative flex flex-col min-h-screen w-full">
        <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${selectedBrand.bannerImage})` }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center mt-12">
            {}
            <motion.h1
              key={selectedBrand.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`text-4xl md:text-6xl font-light tracking-[0.15em] text-[#d4af37] ${cinzel.className}`}
            >
              {selectedBrand.name}
            </motion.h1>
            <motion.p
              key={selectedBrand.description}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-4 text-sm md:text-base tracking-widest text-[#f5f5f5]/80 max-w-lg font-light"
            >
              {selectedBrand.description}
            </motion.p>
          </div>
        </div>

        <div className="flex justify-center gap-8 py-8 z-10">
          {BRANDS.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setSelectedBrand(brand)}
              className={`text-xs tracking-[0.2em] uppercase transition-all duration-700 cursor-pointer ${
                selectedBrand.id === brand.id
                  ? "text-[#d4af37] border-b border-[#d4af37] pb-1"
                  : "text-[#f5f5f5]/50 hover:text-[#f5f5f5]"
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>

        <div className="flex-1 px-4 md:px-12 py-8 max-w-7xl mx-auto w-full z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {PRODUCTS.map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col gap-6 group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 * i, ease: "easeOut" }}
              >
                <div className="w-full aspect-[3/4] p-[1px] bg-gradient-to-b from-[#d4af37]/30 to-transparent">
                  <div className="w-full h-full bg-[#0a0a0a] p-2">
                    <LuxuryImageDistortion src={item.img} alt={item.name} />
                  </div>
                </div>

                <div className="flex flex-col items-center text-center gap-2">
                  {}
                  <h3 className={`text-lg tracking-widest text-[#f5f5f5] ${cinzel.className}`}>
                    {item.name}
                  </h3>
                  <p className="text-sm font-light tracking-wider text-[#d4af37]">
                    {formatPrice(item.price)}
                  </p>

                  <button className="mt-4 px-8 py-3 text-xs tracking-[0.2em] uppercase border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#050505] transition-colors duration-700 cursor-pointer">
                    Try On
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
