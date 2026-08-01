import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberAccessModal({ isOpen, onClose }: MemberAccessModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          <div className="fixed inset-0 pointer-events-none z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 rounded-none relative pointer-events-auto"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-black tracking-tighter italic mb-2 font-serif text-white uppercase">
                  Member <span className="text-[#ecab13]">Access</span>
                </h2>
                <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">
                  Welcome back to the club
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      required
                      className="w-full bg-black/50 border-b border-white/20 px-0 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#ecab13] transition-colors"
                    />
                  </div>

                  <div className="relative group">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                      className="w-full bg-black/50 border-b border-white/20 px-0 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#ecab13] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black font-bold py-4 hover:bg-[#ecab13] transition-colors uppercase tracking-widest text-xs"
                >
                  Sign In
                </button>

                <div className="text-center mt-6">
                  <a href="#" className="text-[10px] text-white/40 hover:text-white transition-colors underline-offset-4 hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}