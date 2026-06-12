"use client";

import React, { useState } from "react";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "./CustomCursor";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const playfair = Playfair_Display({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const BRANDS = [
  {
    id: "gucci",
    name: "Gucci",
    description: "Florentine luxury and eclectic modernism.",
    bannerImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop",
    products: [
      { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
      { name: "Velvet Suit", price: 4200, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" }
    ]
  },
  {
    id: "prada",
    name: "Prada",
    description: "Milanese avant-garde and intellectual design.",
    bannerImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop",
    products: [
      { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
      { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" }
    ]
  }
];

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0]);
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBrandChange = (brand: typeof BRANDS[0]) => {
    setIsLoading(true);
    setSelectedBrand(brand);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className={`relative flex min-h-screen w-full flex-col overflow-hidden bg-black text-white ${spaceGrotesk.className} cursor-none`}>
      <CustomCursor />

      {/* Brand Banner Parallax */}
      <div className="absolute inset-0 z-0 h-[40vh] w-full overflow-hidden">
        <motion.div
          key={selectedBrand.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${selectedBrand.bannerImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/80 to-black" />
      </div>

      {/* Top Navigation */}
      <div className="z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-white/50 hover:text-white transition-colors duration-700">menu</span>
          <h1 className={`${playfair.className} text-xl tracking-[0.2em] uppercase`}>Atelier</h1>
        </div>
        <div className="flex gap-4">
          {BRANDS.map(brand => (
            <button
              key={brand.id}
              onClick={() => handleBrandChange(brand)}
              className={`text-xs tracking-[0.1em] uppercase transition-all duration-700 ${selectedBrand.id === brand.id ? 'text-[#ecab13] border-b border-[#ecab13] pb-1' : 'text-white/50 hover:text-white'}`}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="z-10 flex flex-1 flex-col px-6 pt-12 pb-24">

        {/* Brand Header */}
        <motion.div
          key={`header-${selectedBrand.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className={`${playfair.className} text-5xl md:text-7xl font-light tracking-wider mb-4`}>{selectedBrand.name}</h2>
          <p className="text-white/60 text-sm tracking-wide leading-relaxed max-w-md">{selectedBrand.description}</p>
        </motion.div>

        {/* Product Gallery (Masonry/Vertical Style) */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative size-24">
                  <motion.div
                    className="absolute inset-0 border border-[#ecab13]/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-0 border-t border-l border-[#ecab13]"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`${playfair.className} text-[#ecab13] text-xs tracking-widest`}>AI</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`gallery-${selectedBrand.id}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 1, staggerChildren: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24"
              >
                {selectedBrand.products.map((product, idx) => (
                  <motion.div
                    key={idx}
                    className={`flex flex-col group ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: idx * 0.2 }}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/5 mb-6">
                      <LuxuryImageDistortion imageUrl={product.img} className="absolute inset-0 w-full h-full" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />

                      {/* Luxury interaction overlay */}
                      <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex justify-between items-end">
                         <button className="bg-black/60 backdrop-blur-md border border-white/20 text-white px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-500">
                           Virtual Try-On
                         </button>
                         <button className="size-10 rounded-full border border-white/20 flex items-center justify-center bg-black/60 backdrop-blur-md hover:border-[#ecab13] hover:text-[#ecab13] transition-colors duration-500">
                            <span className="material-symbols-outlined text-sm">bookmark</span>
                         </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-start px-2 z-10">
                      <h3 className={`${playfair.className} text-xl tracking-wide`}>{product.name}</h3>
                      <p className="text-[#ecab13] text-sm tracking-widest">{formatPrice(product.price)}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
