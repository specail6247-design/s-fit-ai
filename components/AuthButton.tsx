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
      <div className="fixed top-6 right-6 z-40 flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
        <div className="text-right hidden md:block">
          <p className="text-[10px] uppercase tracking-widest text-luxury-gold">Member</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white/5 hover:bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border border-white/10"
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
        className="fixed top-6 right-6 z-40 bg-black/40 backdrop-blur-md text-white border border-white/10 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
      >
        Member Access
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
              className="bg-[#050505] border border-white/10 w-full max-w-md rounded-2xl p-10 relative z-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-50" />

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-black italic tracking-tighter text-white mb-2 font-display">
                  {isLogin ? 'SIGN IN' : 'JOIN THE CLUB'}
                </h2>
                <p className="text-xs text-luxury-gold uppercase tracking-[0.2em]">
                  {isLogin ? 'Exclusive Access' : 'Become a Member'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-5 relative z-10">
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-luxury-gold outline-none transition-colors placeholder:text-gray-600 uppercase tracking-wider"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-luxury-gold outline-none transition-colors placeholder:text-gray-600 uppercase tracking-wider"
                    required
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black font-bold py-4 rounded-none hover:bg-gray-200 transition-colors disabled:opacity-50 uppercase tracking-widest text-sm"
                  >
                    {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Apply')}
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center relative z-10">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs text-gray-500 hover:text-luxury-gold uppercase tracking-widest transition-colors"
                >
                  {isLogin ? 'Request Membership' : 'Existing Member? Sign In'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}