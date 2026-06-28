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
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">VIP Member</p>
          <p className="text-xs font-bold text-white tracking-widest uppercase max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#1a1a1a] hover:bg-[#2d2d2d] text-white size-10 rounded-full flex items-center justify-center transition-colors border border-[#2d2d2d]"
          aria-label="Sign Out"
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">logout</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#2d2d2d] hover:text-[#ecab13] transition-all border border-[#2d2d2d]"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#0a0a0a] border border-[#ecab13]/30 w-full max-w-sm rounded-none p-8 relative shadow-[0_0_50px_rgba(236,171,19,0.05)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-600 hover:text-white"
            >
              ✕
            </button>
            
            <h2 className="text-xl font-light text-white mb-8 text-center tracking-[0.3em] uppercase font-serif">
              {isLogin ? 'VIP CLUB' : 'REQUEST ACCESS'}
            </h2>

            <div className="w-12 h-px bg-[#ecab13]/50 mx-auto mb-8" />

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div>
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-zinc-800 px-0 py-2 text-white text-sm focus:border-[#ecab13] outline-none transition-colors rounded-none placeholder-zinc-700"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-zinc-800 px-0 py-2 text-white text-sm focus:border-[#ecab13] outline-none transition-colors rounded-none placeholder-zinc-700"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ecab13] text-[#0a0a0a] font-bold py-3 mt-4 text-xs tracking-[0.2em] uppercase hover:bg-[#c48a0a] transition-colors disabled:opacity-50 rounded-none"
              >
                {loading ? 'AUTHENTICATING...' : (isLogin ? 'ENTER' : 'SUBMIT REQUEST')}
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] text-zinc-600 hover:text-[#ecab13] uppercase tracking-widest transition-colors"
              >
                {isLogin ? 'NOT A MEMBER? APPLY HERE' : 'ALREADY A MEMBER? LOGIN'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
