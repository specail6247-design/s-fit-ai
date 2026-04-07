import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberAccessProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberAccess({ isOpen, onClose }: MemberAccessProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/5 to-[#007AFF]/10 pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              aria-label="Close Member Access"
            >
              ✕
            </button>

            <div className="relative z-10">
              <h2 className="text-2xl font-black tracking-tighter italic mb-2 text-center text-white">
                VIP <span className="text-[#007AFF]">ACCESS</span>
              </h2>
              <p className="text-xs text-gray-400 tracking-[0.2em] uppercase text-center mb-8">
                Members Only Area
              </p>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Email Identity
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Passcode
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 mt-4 bg-white hover:bg-gray-200 text-black font-black rounded-xl text-sm tracking-[0.2em] uppercase transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center">
                 <a href="#" className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-wider">
                   Forgot Passcode?
                 </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
