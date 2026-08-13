'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

export default function MemberAccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring' as const, damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0A0A0A] border border-[#C9B037]/30 p-10 shadow-2xl overflow-hidden"
          >
             {/* Luxury accent line */}
             <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9B037] to-transparent opacity-50" />

             <button
               onClick={onClose}
               className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
             >
               <X size={20} />
             </button>

             <div className="text-center mb-10">
               <h2 className="text-2xl font-serif text-[#C9B037] mb-2 tracking-widest uppercase">Member Access</h2>
               <p className="text-xs text-gray-400 tracking-widest font-mono uppercase">VIP Client Portal</p>
             </div>

             <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div>
                 <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Email Address"
                   className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9B037] transition-colors font-mono text-sm"
                 />
               </div>
               <div>
                 <input
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Password"
                   className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9B037] transition-colors font-mono text-sm"
                 />
               </div>

               <button className="w-full mt-8 py-4 bg-[#C9B037] text-black font-serif font-bold tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 group">
                 Sign In
                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </button>
             </form>

             <div className="mt-8 text-center space-y-4">
               <button className="text-xs text-gray-500 hover:text-[#C9B037] transition-colors font-mono uppercase tracking-widest">
                 Forgot Password?
               </button>
               <div className="w-full h-px bg-white/10" />
               <button className="text-xs text-white hover:text-[#C9B037] transition-colors font-mono uppercase tracking-widest">
                 Apply for Membership
               </button>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
