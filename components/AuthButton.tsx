'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { MemberAccessModal } from './ui/MemberAccessModal';

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-soft-gray uppercase tracking-widest">S_FIT MEMBER</p>
          <p className="text-xs font-bold text-white max-w-[100px] truncate uppercase tracking-widest">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-soft-gray hover:text-white px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-colors border border-white/10"
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
        className="bg-transparent hover:bg-white/5 text-white px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all border border-white/20 relative overflow-hidden group"
      >
        <span className="relative z-10 group-hover:text-luxury-gold transition-colors duration-300">MEMBER ACCESS</span>
        <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </button>

      <MemberAccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
