'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

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
      <div className="flex items-center gap-3">
        <div className="text-right hidden md:block">
          <p className="text-xs text-soft-gray">Welcome,</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors border border-white/10"
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
        className="text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors uppercase font-mono"
      >
        MEMBER
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="bg-transparent w-full max-w-sm p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-xl text-white mb-8 text-center font-serif tracking-[0.3em] uppercase">
              MEMBER ACCESS
            </h2>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white text-sm focus:border-white outline-none focus:ring-0 placeholder-white/30"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white text-sm focus:border-white outline-none focus:ring-0 placeholder-white/30"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-3 rounded-none hover:bg-gray-200 transition-colors disabled:opacity-50 tracking-widest text-xs uppercase mt-4"
              >
                {loading ? 'PROCESSING...' : 'ENTER'}
              </button>
            </form>

            <p className="text-center text-xs text-white/40 font-mono tracking-widest">
              {isLogin ? "NEW CLIENT?" : "EXISTING MEMBER?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-white/70 transition-colors ml-2"
              >
                {isLogin ? 'APPLY' : 'SIGN IN'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
