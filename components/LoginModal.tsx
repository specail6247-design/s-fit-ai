'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function LoginModal() {
  const { isLoginOpen, setIsLoginOpen, setPremium } = useStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login success - upgrade to premium for demo
    setPremium(true);
    setIsLoginOpen(false);
  };

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLoginOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1000]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 m-auto w-full max-w-md h-fit p-1 z-[1001]"
          >
            {/* Golden Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] via-transparent to-[#D4AF37] opacity-50 rounded-2xl" />

            <div className="relative bg-[#0a0a0a] rounded-xl p-8 overflow-hidden shadow-2xl border border-white/10">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl" />

              <div className="relative z-10 text-center space-y-8">
                {/* Header */}
                <div className="space-y-2">
                  <h2 className="text-3xl font-black tracking-tighter text-white font-serif italic">
                    MEMBER <span className="text-[#D4AF37]">ACCESS</span>
                  </h2>
                  <p className="text-xs text-gray-500 uppercase tracking-[0.3em]">
                    Enter the Inner Circle
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6 text-left">
                  <div className="space-y-4">
                    <div className="group">
                      <label className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold mb-1 block">
                        Identity
                      </label>
                      <input
                        type="email"
                        placeholder="vip@s-fit.ai"
                        className="w-full bg-white/5 border-b border-white/20 px-0 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors font-mono text-sm"
                        required
                      />
                    </div>

                    <div className="group">
                      <label className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold mb-1 block">
                        Passcode
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white/5 border-b border-white/20 px-0 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors font-mono text-sm"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all duration-300 rounded-sm mt-4 text-xs"
                  >
                    Authenticate
                  </button>
                </form>

                {/* Footer */}
                <div className="text-[10px] text-gray-600 font-mono pt-4 border-t border-white/5">
                  SECURE CONNECTION ESTABLISHED
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
