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
          <p className="text-[10px] text-gray-500 tracking-widest uppercase">Member</p>
          <p className="text-sm font-medium text-white max-w-[120px] truncate font-serif">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-gray-300 hover:text-white px-5 py-2 rounded-full text-xs font-light tracking-[0.2em] uppercase transition-all border border-white/10 hover:border-white/30"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="group flex items-center gap-2 bg-transparent hover:bg-white/5 px-6 py-2 rounded-full text-xs font-light tracking-[0.2em] uppercase text-gray-300 hover:text-white border border-white/10 hover:border-white/30 transition-all"
      >
        <span>Member Access</span>
        <span className="w-1.5 h-1.5 bg-[#007AFF] rounded-full group-hover:shadow-[0_0_8px_#007AFF] transition-shadow" />
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
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-md rounded-2xl p-10 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#007AFF]/10 blur-[100px] rounded-full pointer-events-none" />

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>

              <div className="mb-10 text-center">
                <h2 className="text-3xl font-serif text-white tracking-wide mb-2">
                  {isLogin ? 'VIP Access' : 'Join the Club'}
                </h2>
                <p className="text-xs text-gray-500 tracking-[0.2em] uppercase">
                  S_FIT NEO Exclusive
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6 mb-10">
                <div className="space-y-1 relative">
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors placeholder:text-gray-700 tracking-wider font-light"
                    required
                  />
                </div>
                <div className="space-y-1 relative">
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors placeholder:text-gray-700 tracking-wider font-light"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-medium py-4 rounded-full hover:bg-gray-200 transition-all disabled:opacity-50 tracking-[0.2em] uppercase text-xs mt-4 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Request Access')}
                </button>
              </form>

              <div className="text-center text-xs text-gray-500 tracking-wider font-light">
                {isLogin ? "NOT A MEMBER YET?" : "ALREADY HAVE ACCESS?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white hover:text-[#007AFF] transition-colors ml-2 underline underline-offset-4"
                >
                  {isLogin ? 'APPLY NOW' : 'SIGN IN'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
