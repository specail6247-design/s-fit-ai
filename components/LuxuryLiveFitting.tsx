/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import LuxuryCursor from "./LuxuryCursor";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return "$" + price.toLocaleString("en-US");
  };

  const brandData = {
    name: "GUCCI",
    description: "Italian luxury fashion house founded in Florence in 1921. Known for its eclectic and contemporary romanticism.",
    banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
  };

  const products = [
    { name: "Silk Evening Gown", price: 12500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
    { name: "Tailored Wool Coat", price: 8400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
    { name: "Leather Moto Jacket", price: 6200, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
    { name: "Aura Blazer", price: 4800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" }
  ];

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#0A0A0A] text-[#F4E4BC] font-sans cursor-none">
      <LuxuryCursor />

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]"
            exit={{ opacity: 0, transition: { duration: 1 } }}
            key="loader"
          >
            <div className="relative w-40 h-40">
              <motion.div
                className="absolute inset-0 border border-[#C9B037]"
                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                animate={{ clipPath: ["polygon(0 0, 0 0, 0 100%, 0 100%)", "polygon(0 0, 100% 0, 0 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 0)"] }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-[#C9B037] text-sm tracking-[0.3em] uppercase ${playfair.className}`}>S_FIT AI</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="relative flex h-screen w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            key="content"
          >
            {/* Main Viewport */}
            <div className="relative w-2/3 h-full">
              <LuxuryImageDistortion imageUrl={brandData.banner} alt="Brand Banner" />

              {/* Brand Overlay with Parallax */}
              <motion.div
                className="absolute top-1/4 left-16 max-w-md z-10 pointer-events-none"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <h1 className={`text-6xl font-light text-white mb-6 ${playfair.className}`}>{brandData.name}</h1>
                <p className="text-[#F4E4BC]/80 leading-relaxed text-sm tracking-wide">{brandData.description}</p>
              </motion.div>
            </div>

            {/* Right Sidebar - Product Masonry */}
            <div className="w-1/3 h-full bg-[#0A0A0A] border-l border-white/5 overflow-y-auto scrollbar-hide flex flex-col pt-12 px-8 z-10 relative">
              <div className="flex justify-between items-center mb-12">
                <h2 className={`text-xl text-[#C9B037] ${playfair.className}`}>Exclusive Collection</h2>
                <button className="text-white hover:text-[#C9B037] transition-colors duration-700">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>

              <div className="columns-1 gap-8 space-y-8 pb-12">
                {products.map((product, i) => (
                  <motion.div
                    key={i}
                    className="break-inside-avoid relative group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 * i }}
                  >
                    <div className="overflow-hidden rounded-sm">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="mt-4 flex flex-col gap-1">
                      <h3 className={`text-lg text-white font-light ${playfair.className}`}>{product.name}</h3>
                      <p className="text-[#C9B037] text-sm tracking-wider">{formatPrice(product.price)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
