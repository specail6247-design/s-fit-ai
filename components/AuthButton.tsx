'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      }
      setShowModal(false);
    } catch (error: unknown) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">VIP Member</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate font-mono">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-gray-400 hover:text-white px-4 py-2 rounded-full text-xs font-medium transition-colors border border-white/10 hover:border-white/30"
        >
          Depart
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="group flex items-center gap-2 bg-transparent hover:bg-white/5 text-white px-6 py-2 rounded-full text-xs font-bold transition-all border border-white/20 hover:border-[#C9B037]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#C9B037] group-hover:animate-pulse"></span>
        MEMBER ACCESS
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setShowModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0A0A0A] border border-[#C9B037]/30 w-full max-w-md rounded-2xl p-8 relative shadow-[0_0_50px_rgba(201,176,55,0.1)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9B037] to-transparent opacity-50"></div>

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter mb-2">
                  {isLogin ? 'VIP ACCESS' : 'APPLY FOR MEMBERSHIP'}
                </h2>
                <p className="text-xs text-[#C9B037] tracking-[0.2em] uppercase">
                  S_FIT AI Protocol
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-5 mb-8">
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#C9B037] transition-colors outline-none font-mono placeholder:text-gray-600 rounded-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="SECURITY KEY"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/50 border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#C9B037] transition-colors outline-none font-mono placeholder:text-gray-600 rounded-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-bold py-4 mt-4 hover:bg-[#C9B037] transition-all disabled:opacity-50 tracking-widest text-sm"
                >
                  {loading ? 'AUTHENTICATING...' : (isLogin ? 'ENTER' : 'SUBMIT APPLICATION')}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs text-gray-500 hover:text-[#C9B037] transition-colors tracking-widest uppercase"
                >
                  {isLogin ? 'Request Access Instead' : 'Already a Member? Enter Here'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
