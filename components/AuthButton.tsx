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
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-[#ecab13] uppercase tracking-widest">VIP Member</p>
          <p className="text-sm font-light text-white max-w-[120px] truncate font-serif">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="border border-[#ecab13]/30 hover:border-[#ecab13] text-[#ecab13] px-5 py-2 rounded-none text-xs tracking-widest uppercase transition-all duration-500 hover:bg-[#ecab13]/10"
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
        className="text-[#ecab13] px-6 py-2.5 border border-[#ecab13] text-xs font-medium tracking-[0.2em] uppercase hover:bg-[#ecab13] hover:text-black transition-all duration-700"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="bg-[#0a0a0a] border border-[#ecab13]/20 w-full max-w-md p-10 relative shadow-[0_0_50px_rgba(236,171,19,0.05)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-zinc-600 hover:text-[#ecab13] transition-colors"
            >
              <span className="material-symbols-outlined font-light">close</span>
            </button>
            
            <div className="text-center mb-10">
              <h2 className="text-2xl text-white font-serif tracking-wide mb-2">
                {isLogin ? 'Enter the Vault' : 'Request Access'}
              </h2>
              <div className="w-12 h-[1px] bg-[#ecab13] mx-auto opacity-50"></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-800 px-0 py-3 text-white text-sm focus:border-[#ecab13] outline-none transition-colors tracking-widest placeholder:text-zinc-700 font-light"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="PASSPHRASE"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-800 px-0 py-3 text-white text-sm focus:border-[#ecab13] outline-none transition-colors tracking-widest placeholder:text-zinc-700 font-light"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ecab13] text-black font-medium tracking-[0.2em] py-4 uppercase text-xs hover:bg-white transition-colors duration-500 disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Submit Request')}
              </button>
            </form>

            <div className="mt-10 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-zinc-500 hover:text-[#ecab13] tracking-widest uppercase transition-colors"
              >
                {isLogin ? 'Request Membership' : 'Return to Sign In'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
