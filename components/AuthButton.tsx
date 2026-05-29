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
      <div className="fixed top-6 right-6 z-40 flex items-center gap-3">
        <div className="text-right hidden md:block">
          <p className="text-xs text-soft-gray uppercase tracking-widest font-mono">Member</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-void-black/80 backdrop-blur-md hover:bg-white/10 text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all border border-white/10 hover:border-white/30"
          aria-label="Sign Out"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Floating Action Button - Minimalist trigger */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed top-6 right-6 z-40 bg-void-black/80 backdrop-blur-md hover:bg-white/10 text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all border border-white/10 hover:border-white/30 shadow-lg"
        aria-label="Member Access"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* VIP Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setShowModal(false)}
          />

          {/* High-Fidelity Modal */}
          <div className="bg-void-black border border-white/10 w-full max-w-md rounded-3xl p-8 relative shadow-2xl animate-fade-in-up overflow-hidden">
            {/* Ambient luxury glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-luxury-gold/20 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="mb-8 text-center relative z-10">
              <h2 className="text-2xl font-bold text-white font-display uppercase tracking-widest mb-2">
                {isLogin ? 'Member Access' : 'Join the Club'}
              </h2>
              <p className="text-sm text-soft-gray">
                {isLogin ? 'Enter your credentials to continue.' : 'Create an account to unlock your digital wardrobe.'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-5 mb-8 relative z-10">
              <div className="space-y-1">
                <label className="text-xs text-soft-gray uppercase tracking-widest font-mono ml-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-luxury-gold outline-none transition-colors"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-soft-gray uppercase tracking-widest font-mono ml-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-luxury-gold outline-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pure-white text-void-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 mt-2 uppercase tracking-widest text-sm"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="flex items-center gap-2 mb-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs text-soft-gray uppercase tracking-widest font-mono">OR</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-10 mb-8">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🇬</span> <span className="text-xs font-bold text-white uppercase tracking-widest">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100]/20 hover:bg-[#FAE100]/30 border border-[#FAE100]/20 text-[#FAE100] py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">💬</span> <span className="text-xs font-bold uppercase tracking-widest">Kakao</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🍎</span> <span className="text-xs font-bold uppercase tracking-widest">Apple</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2]/20 hover:bg-[#5865F2]/30 border border-[#5865F2]/20 text-[#5865F2] py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🎮</span> <span className="text-xs font-bold uppercase tracking-widest">Discord</span>
              </button>
            </div>


            <div className="relative z-10">
              <p className="text-center text-xs text-soft-gray">
                {isLogin ? "Don't have an account?" : "Already a member?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white hover:text-luxury-gold transition-colors font-medium ml-1 underline decoration-white/30 underline-offset-4"
                >
                  {isLogin ? 'Apply now' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
