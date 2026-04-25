'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { X, Lock, Key, Mail, ChevronRight } from 'lucide-react';

interface MemberAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MemberAccessModal({ isOpen, onClose }: MemberAccessModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
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
        alert('Check your email for confirmation.');
      }
      onClose();
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-full max-w-md bg-[#050505] border border-[#C9B037]/30 rounded-none shadow-[0_0_40px_rgba(201,176,55,0.15)] relative overflow-hidden"
          >
            {/* Top decorative bar */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C9B037] to-transparent opacity-50" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-[#C9B037] transition-colors z-10"
              aria-label="Close"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="p-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#111] border border-[#C9B037]/20 flex items-center justify-center mb-6 shadow-inner">
                <Lock className="text-[#C9B037]" size={20} strokeWidth={1.5} />
              </div>

              <h2 className="text-2xl text-white tracking-[0.2em] font-serif uppercase mb-2 text-center">
                Member Access
              </h2>
              <p className="text-[#8A8A8A] text-xs tracking-widest uppercase mb-8 text-center">
                Exclusive Virtual Fitting Room
              </p>

              <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL ADDRESS"
                    required
                    className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-sm text-white placeholder-white/30 focus:border-[#C9B037] focus:outline-none transition-colors tracking-wider"
                  />
                </div>

                <div className="relative">
                  <Key className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PASSWORD"
                    required
                    className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-sm text-white placeholder-white/30 focus:border-[#C9B037] focus:outline-none transition-colors tracking-wider"
                  />
                </div>

                {errorMsg && (
                  <p className="text-red-400 text-xs tracking-wide text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#C9B037] text-black py-4 mt-8 font-serif uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {isLoading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Request Access')}
                  {!isLoading && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>

              <div className="mt-8 flex flex-col items-center gap-4 w-full">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs text-[#8A8A8A] hover:text-white transition-colors tracking-widest uppercase"
                >
                  {isLogin ? 'Apply for Membership' : 'Existing Member Login'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
