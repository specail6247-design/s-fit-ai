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

  const handleSocialLogin = async (provider: 'google' | 'kakao' | 'apple' | 'discord') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      alert(`${provider} Login Error: ` + (error as Error).message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-luxury-gold uppercase tracking-[0.2em] font-medium">VIP Member</p>
          <p className="text-sm font-light text-white/90 max-w-[120px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-soft-gray hover:text-white px-5 py-2 rounded-full text-xs font-medium transition-all border border-white/10 uppercase tracking-widest"
        >
          Exit
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-transparent text-luxury-gold px-6 py-2.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-luxury-gold hover:text-void-black transition-all border border-luxury-gold/50 shadow-[0_0_15px_rgba(236,171,19,0.15)]"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="bg-void-black border border-luxury-gold/20 w-full max-w-sm p-8 relative overflow-hidden group shadow-[0_0_50px_rgba(236,171,19,0.05)]">
            {/* Minimal Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-luxury-gold/30 pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-luxury-gold/30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-luxury-gold/30 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-luxury-gold/30 pointer-events-none" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-soft-gray/50 hover:text-white transition-colors text-lg font-light"
            >
              ✕
            </button>
            
            <div className="text-center mb-10 mt-2">
              <h2 className="text-2xl font-light text-white tracking-widest uppercase mb-2 font-display">
                {isLogin ? 'VIP Club' : 'Request Access'}
              </h2>
              <div className="h-px w-12 bg-luxury-gold/50 mx-auto" />
            </div>

            <form onSubmit={handleAuth} className="space-y-5 mb-8">
              <div className="relative">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 pb-3 pt-2 text-white text-xs tracking-widest focus:border-luxury-gold outline-none transition-colors placeholder:text-soft-gray/30"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 pb-3 pt-2 text-white text-xs tracking-widest focus:border-luxury-gold outline-none transition-colors placeholder:text-soft-gray/30"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-luxury-gold text-void-black font-medium text-xs tracking-[0.2em] uppercase py-4 mt-4 hover:brightness-110 transition-all disabled:opacity-50"
              >
                {loading ? 'AUTHENTICATING...' : (isLogin ? 'ENTER' : 'APPLY')}
              </button>
            </form>

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] text-soft-gray/50 hover:text-luxury-gold uppercase tracking-widest transition-colors"
              >
                {isLogin ? 'Not a member? Apply here' : 'Already a member? Enter here'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
