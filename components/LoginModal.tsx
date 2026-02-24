'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useEffect, useState } from 'react';

export default function LoginModal() {
  const setLoginOpen = useStore((state) => state.setLoginOpen);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLoginOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setLoginOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    setTimeout(() => {
      setLoginOpen(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={() => setLoginOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm bg-[#050505] border border-white/10 p-10 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
         {/* Gold Accent Line */}
         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-[1px] bg-[#D4AF37]" />

         <div className="text-center mb-12 mt-4">
           <h2 className="text-3xl font-serif text-white mb-3">MEMBER ACCESS</h2>
           <p className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]/80">Private Sanctuary</p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-8">
           <div className="group">
             <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-[#D4AF37] outline-none transition-all font-mono text-sm placeholder:text-gray-700 text-center"
               placeholder="EMAIL ADDRESS"
               required
             />
           </div>
           <div className="group">
             <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-[#D4AF37] outline-none transition-all font-mono text-sm placeholder:text-gray-700 text-center"
               placeholder="PASSPHRASE"
               required
             />
           </div>

           <button
             type="submit"
             className="w-full mt-10 bg-white text-black hover:bg-[#D4AF37] py-4 text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300"
           >
             Sign In
           </button>
         </form>

         <button
           onClick={() => setLoginOpen(false)}
           className="absolute top-6 right-6 text-gray-700 hover:text-white transition-colors text-xl font-light"
           aria-label="Close"
         >
           ×
         </button>
      </motion.div>
    </motion.div>
  );
}
