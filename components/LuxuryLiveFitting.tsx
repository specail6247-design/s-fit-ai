"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Lato } from "next/font/google"; // Using Cinzel as requested, Lato for body text
import { motion, AnimatePresence } from "framer-motion";
import LuxuryCursor from "@/components/ui/LuxuryCursor";
import LuxuryImageDistortion from "@/components/masterpiece/LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

const ITEMS = [
  { id: 1, name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0", description: "Timeless elegance tailored for the modern muse." },
  { id: 2, name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0", description: "Flowing silk that drapes like liquid gold." },
  { id: 3, name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA", description: "Rebellious spirit meets artisanal craftsmanship." },
  { id: 4, name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk", description: "Future-forward design with heritage quality." },
];

export default function LuxuryLiveFitting() {
  const [selectedItem, setSelectedItem] = useState(ITEMS[0]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full overflow-hidden bg-[#050505] text-[#D4AF37] ${lato.className}`}>
      <LuxuryCursor />

      {/* Brand Banner Parallax (Simplified for now) */}
      <div className="absolute top-0 left-0 w-full h-[30vh] opacity-20 pointer-events-none z-0">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <AnimatePresence>
        {isLoading ? (
           <motion.div
             className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
             exit={{ opacity: 0, transition: { duration: 1 } }}
           >
             <div className="relative w-32 h-32">
               <svg className="w-full h-full" viewBox="0 0 100 100">
                 <motion.path
                   d="M10,10 L90,10 L90,90 L10,90 Z"
                   fill="none"
                   stroke="#D4AF37"
                   strokeWidth="1"
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                 />
               </svg>
               <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className={`absolute inset-0 flex items-center justify-center ${cinzel.className} text-2xl tracking-[0.2em]`}
               >
                 L
               </motion.div>
             </div>
             <motion.p
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1 }}
               className={`mt-4 text-xs tracking-[0.4em] uppercase text-[#D4AF37]/60 ${cinzel.className}`}
             >
               Loading Atelier
             </motion.p>
           </motion.div>
        ) : (
          <motion.div
            className="flex w-full h-full z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* Left Panel: Product Details & Visual */}
            <div className="w-2/3 h-full relative p-12 flex flex-col justify-center">
               <div className="absolute inset-0 z-0 opacity-80">
                  <LuxuryImageDistortion imageUrl={selectedItem.img} />
               </div>

               <div className="relative z-10 pointer-events-none mt-auto mb-12 max-w-xl">
                 <motion.h1
                    key={selectedItem.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`${cinzel.className} text-7xl mb-4 text-[#D4AF37] mix-blend-exclusion`}
                 >
                   {selectedItem.name}
                 </motion.h1>
                 <motion.p
                    key={selectedItem.description}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="text-lg text-white/80 italic mb-6 tracking-wide"
                 >
                    {selectedItem.description}
                 </motion.p>
                 <motion.div
                    key={selectedItem.price}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={`${cinzel.className} text-4xl text-[#D4AF37]`}
                 >
                    {formatPrice(selectedItem.price)}
                 </motion.div>
               </div>
            </div>

            {/* Right Panel: Selection (Masonry Style) */}
            <div className="w-1/3 h-full border-l border-[#D4AF37]/20 bg-[#0a0a0a]/90 backdrop-blur-xl p-8 overflow-y-auto custom-scrollbar">
               <div className="flex items-center justify-between mb-12">
                  <h2 className={`${cinzel.className} text-2xl tracking-[0.2em] text-white`}>COLLECTION</h2>
                  <div className="w-12 h-[1px] bg-[#D4AF37]" />
               </div>

               <div className="grid grid-cols-1 gap-12">
                  {ITEMS.map((item, index) => (
                    <motion.div
                       key={item.id}
                       initial={{ opacity: 0, y: 50 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8, delay: index * 0.1 }}
                       className="group cursor-pointer"
                       onClick={() => setSelectedItem(item)}
                    >
                       <div className={`relative overflow-hidden aspect-[3/4] mb-4 border transition-all duration-700 ${selectedItem.id === item.id ? 'border-[#D4AF37] opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                          {selectedItem.id === item.id && (
                             <div className="absolute inset-0 bg-[#D4AF37]/10" />
                          )}
                       </div>
                       <div className="text-center">
                          <h3 className={`${cinzel.className} text-xl mb-1 group-hover:text-[#D4AF37] transition-colors duration-500`}>{item.name}</h3>
                          <p className="text-xs tracking-widest text-gray-500">{formatPrice(item.price)}</p>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Border */}
      <div className="fixed inset-4 border border-[#D4AF37]/10 pointer-events-none z-50" />
      <div className="fixed top-8 left-8 z-50 pointer-events-none">
         <span className={`${cinzel.className} text-xs tracking-[0.3em] text-[#D4AF37]`}>MAISON DE LUXE</span>
      </div>
    </div>
  );
}
