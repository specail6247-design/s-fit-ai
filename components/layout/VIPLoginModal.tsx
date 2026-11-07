'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface VIPLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VIPLoginModal({ isOpen, onClose }: VIPLoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      }
      onClose();
    } catch (error: unknown) {
      setErrorMsg((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Ambient luxury glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9b037]/10 to-transparent pointer-events-none" />

            <div className="p-8 relative z-10">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif text-[#c9b037] mb-2 tracking-wide">MEMBER ACCESS</h2>
                <p className="text-xs font-mono text-soft-gray tracking-widest uppercase">Elevate Your Experience</p>
              </div>

              {errorMsg && (
                 <div className="mb-4 text-red-500 text-xs text-center font-mono uppercase">{errorMsg}</div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm font-mono text-white focus:border-[#c9b037] focus:outline-none transition-colors placeholder:text-white/20"
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="ENTER YOUR PASSWORD"
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm font-mono text-white focus:border-[#c9b037] focus:outline-none transition-colors placeholder:text-white/20"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black font-bold py-4 text-sm tracking-widest uppercase hover:bg-[#c9b037] hover:text-white transition-all duration-300 disabled:opacity-50 mt-4"
                >
                  {isLoading ? 'AUTHENTICATING...' : (isLogin ? 'SIGN IN' : 'SIGN UP')}
                </button>
              </form>

              <div className="mt-6 text-center">
                 <button
                   onClick={() => setIsLogin(!isLogin)}
                   className="text-[10px] font-mono text-soft-gray hover:text-[#c9b037] transition-colors uppercase tracking-widest"
                 >
                   {isLogin ? 'Create an Account' : 'Already a Member?'}
                 </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-[10px] font-mono text-soft-gray tracking-widest leading-relaxed uppercase">
                  By entering, you agree to our Terms of Service<br/>
                  and Privacy Policy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
