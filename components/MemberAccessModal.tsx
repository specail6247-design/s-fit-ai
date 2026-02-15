'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function MemberAccessModal() {
  const { isLoginModalOpen, setLoginModalOpen } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual authentication logic
    console.log('Login attempt:', email);
    setLoginModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLoginModalOpen(false)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#050505] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              {/* Decorative Elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#007AFF]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setLoginModalOpen(false)}
                className="absolute right-6 top-6 text-white/30 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>

              {/* Header */}
              <div className="mb-10 text-center">
                <h2 className="text-2xl font-light tracking-widest text-white uppercase mb-2">
                  Member Access
                </h2>
                <div className="h-px w-10 bg-[#007AFF] mx-auto" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase ml-1">
                    Identity
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white placeholder-white/20 focus:border-[#007AFF] focus:bg-white/10 transition-all outline-none rounded-t-lg"
                    placeholder="name@example.com"
                    autoFocus
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase ml-1">
                    Passkey
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white placeholder-white/20 focus:border-[#007AFF] focus:bg-white/10 transition-all outline-none rounded-t-lg"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-8 bg-white text-black font-bold py-4 rounded-xl hover:bg-[#007AFF] hover:text-white transition-all transform hover:scale-[1.02] tracking-widest uppercase text-xs"
                >
                  Enter Lounge
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center space-y-4">
                <p className="text-[10px] text-gray-500 tracking-widest uppercase">
                  Or connect with
                </p>
                <div className="flex justify-center gap-4">
                  {['google', 'apple', 'discord'].map((provider) => (
                    <button
                      key={provider}
                      className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
                    >
                      <span className="text-xs capitalize">{provider[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
