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
          <p className="text-[10px] text-soft-gray tracking-widest uppercase">Member</p>
          <p className="text-sm font-serif italic text-luxury-gold max-w-[120px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="border border-white/20 hover:bg-white/10 text-white px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors"
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
        className="bg-transparent border border-luxury-gold/50 text-luxury-gold hover:bg-luxury-gold hover:text-black px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(201,176,55,0.2)] hover:shadow-[0_0_25px_rgba(201,176,55,0.4)]"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#050505] border border-luxury-gold/30 w-full max-w-md rounded-none p-8 relative shadow-[0_0_40px_rgba(201,176,55,0.15)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-soft-gray hover:text-luxury-gold transition-colors text-sm font-mono"
            >
              [X]
            </button>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif italic text-luxury-gold mb-2">
                {isLogin ? 'Sign In' : 'Join VIP'}
              </h2>
              <p className="text-xs text-soft-gray tracking-[0.2em] uppercase">
                Exclusive Virtual Experience
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-luxury-gold outline-none transition-colors placeholder:text-white/30"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-luxury-gold outline-none transition-colors placeholder:text-white/30"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-luxury-gold text-black font-bold py-4 mt-4 tracking-[0.2em] uppercase hover:bg-yellow-500 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Apply')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-soft-gray tracking-widest uppercase">Or Continue With</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent border border-white/20 hover:border-luxury-gold py-3 flex items-center justify-center gap-2 transition-colors group">
                <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">🇬</span> <span className="text-xs text-soft-gray group-hover:text-luxury-gold transition-colors tracking-wider">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent border border-white/20 hover:border-luxury-gold py-3 flex items-center justify-center gap-2 transition-colors group">
                <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">🍎</span> <span className="text-xs text-soft-gray group-hover:text-luxury-gold transition-colors tracking-wider">Apple</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[10px] text-soft-gray tracking-wider">
                {isLogin ? "Not a member yet?" : "Already a member?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-luxury-gold hover:text-white transition-colors uppercase ml-2 border-b border-luxury-gold/30 hover:border-white pb-0.5"
                >
                  {isLogin ? 'Request Access' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
