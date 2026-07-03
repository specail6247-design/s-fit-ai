"use client";
import React, { useState } from 'react';
import { LuxuryImageDistortion } from './masterpiece/LuxuryImageDistortion';
import { Cinzel, Space_Grotesk } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState('GUCCI');
  const [isLoading, setIsLoading] = useState(false);

  const brandInfo = {
    GUCCI: {
      banner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000',
      description: 'Defined by an elegant interplay of heritage and contemporary design.'
    },
    PRADA: {
      banner: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=2000',
      description: 'Avant-garde style and uncompromising quality.'
    }
  };

  const handleCapture = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-white ${spaceGrotesk.className}`} style={{ cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'><circle cx=\'16\' cy=\'16\' r=\'14\' fill=\'none\' stroke=\'%23ecab13\' stroke-width=\'2\'/></svg>") 16 16, auto' }}>

      {/* Brand Parallax Banner */}
      <div
        className="absolute inset-0 z-0 opacity-40 transition-opacity duration-1000"
        style={{
          backgroundImage: `url('${brandInfo[selectedBrand as keyof typeof brandInfo].banner}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'saturate(0.9) contrast(1.1)'
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

      {/* Top Navigation Bar */}
      <div className="z-10 flex items-center justify-between p-6 pt-10">
        <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-700 hover:border-[#ecab13]/50">
          <span className="material-symbols-outlined text-white/80">close</span>
        </div>
        <div className="flex flex-col items-center">
          <h2 className={`${cinzel.className} text-2xl font-bold tracking-[0.2em] text-[#ecab13]`}>
            {selectedBrand}
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-white/50 mt-1">
            Maison Try-On
          </p>
        </div>
        <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-700 hover:border-[#ecab13]/50">
          <span className="material-symbols-outlined text-white/80">more_horiz</span>
        </div>
      </div>

      {/* Brand Description */}
      <div className="z-10 px-8 py-4 text-center">
        <p className={`${cinzel.className} text-sm italic text-white/70 max-w-md mx-auto`}>
          &quot;{brandInfo[selectedBrand as keyof typeof brandInfo].description}&quot;
        </p>
      </div>

      {/* Main View Area */}
      <div className="relative flex-1 z-10 flex items-center justify-center p-8">
        {isLoading ? (
          <div className="relative size-64 flex items-center justify-center">
             <div className="absolute inset-0 border border-white/10" />
             <div className="absolute inset-0 border border-[#ecab13]"
                  style={{
                    clipPath: 'polygon(0 0, 10% 0, 10% 100%, 0 100%)',
                    animation: 'trace 2s infinite linear'
                  }}
             />
             <style>{`
               @keyframes trace {
                 0% { clip-path: polygon(0 0, 0 0, 0 0, 0 0); }
                 25% { clip-path: polygon(0 0, 100% 0, 100% 2px, 0 2px); }
                 50% { clip-path: polygon(100% 0, 100% 100%, calc(100% - 2px) 100%, calc(100% - 2px) 0); }
                 75% { clip-path: polygon(100% 100%, 0 100%, 0 calc(100% - 2px), 100% calc(100% - 2px)); }
                 100% { clip-path: polygon(0 100%, 0 0, 2px 0, 2px 100%); }
               }
             `}</style>
             <span className={`${cinzel.className} text-[#ecab13] tracking-widest uppercase text-xs animate-pulse`}>
               Curating Fit...
             </span>
          </div>
        ) : (
          <div className="relative h-full w-full max-w-md rounded-sm overflow-hidden border border-white/10">
             <LuxuryImageDistortion
               image="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
               className="w-full h-full object-cover"
             />
          </div>
        )}
      </div>

      {/* Bottom UI Section - Masonry/Vertical Product List */}
      <div className="mt-auto z-10 bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-10 px-6">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
          {[
              { name: "Aura Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
              { name: "Velvet Moto Jacket", price: 4800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
              { name: "Cashmere Tech Coat", price: 12500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
          ].map((item, i) => (
            <div key={i} className="flex min-w-[200px] flex-col gap-4 snap-center group cursor-none transition-all duration-1000 opacity-60 hover:opacity-100">
                <div
                  className="aspect-[3/4] w-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105 filter group-hover:saturate-100 saturate-50"
                  style={{ backgroundImage: `url("${item.img}")` }}
                />
                <div className="flex flex-col gap-1 items-center text-center">
                  <p className={`${cinzel.className} text-sm tracking-wider text-white`}>{item.name}</p>
                  <p className="text-xs font-light tracking-widest text-[#ecab13]">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(item.price)}
                  </p>
                </div>
            </div>
          ))}
        </div>

        {/* Capture Control */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleCapture}
            className="group relative flex size-24 items-center justify-center rounded-full border border-[#ecab13]/30 bg-black/50 backdrop-blur-sm transition-all duration-1000 hover:border-[#ecab13]"
          >
            <div className="absolute inset-0 rounded-full border border-[#ecab13] scale-110 opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-1000" />
            <div className="size-16 rounded-full bg-[#ecab13]/10 border border-[#ecab13]/50 flex items-center justify-center transition-all duration-700 group-hover:bg-[#ecab13]/20">
              <span className="material-symbols-outlined text-3xl text-[#ecab13]">camera</span>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}
