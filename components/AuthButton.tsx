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
        className="bg-cyber-lime text-void-black px-5 py-2 rounded-full text-xs font-bold hover:brightness-110 transition-all uppercase tracking-widest"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#050505] border border-white/20 w-full max-w-md rounded-none p-8 relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-soft-gray hover:text-white text-xl"
            >
              ✕
            </button>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-white tracking-widest uppercase italic">
                {isLogin ? 'Member Access' : 'VIP Registration'}
              </h2>
              <p className="text-xs text-soft-gray mt-2 tracking-widest uppercase">
                {isLogin ? 'Enter the Vault' : 'Join the Elite'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border-b border-white/20 px-4 py-4 text-white text-sm focus:border-cyber-lime outline-none placeholder:text-soft-gray placeholder:tracking-widest transition-colors rounded-none"
                  required
                />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border-b border-white/20 px-4 py-4 text-white text-sm focus:border-cyber-lime outline-none placeholder:text-soft-gray placeholder:tracking-widest transition-colors rounded-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyber-lime text-black font-black tracking-widest uppercase py-4 mt-6 hover:bg-white transition-all disabled:opacity-50 rounded-none"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Access Granted' : 'Initialize')}
              </button>
            </form>

            <div className="flex items-center gap-2 mb-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-soft-gray tracking-widest uppercase">Or</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-3">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors" title="Google">
                <span className="text-lg">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100]/10 hover:bg-[#FAE100]/20 border border-[#FAE100]/30 py-3 flex items-center justify-center transition-colors" title="Kakao">
                <span className="text-lg">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors" title="Apple">
                <span className="text-lg">🍎</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/30 py-3 flex items-center justify-center transition-colors" title="Discord">
                <span className="text-lg">🎮</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-soft-gray tracking-widest uppercase">
              {isLogin ? "No Access Credentials?" : "Already Registered?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cyber-lime hover:text-white ml-2 border-b border-cyber-lime/30 pb-0.5 transition-colors"
              >
                {isLogin ? 'Request Access' : 'Authenticate'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
