'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { LoginModal } from './LoginModal';

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
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-white/50 uppercase tracking-widest">Member</p>
          <p className="text-sm font-['Geist'] text-[#F4E4BC] max-w-[120px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
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
        className="text-[10px] uppercase tracking-[0.2em] text-white hover:text-[#C9B037] transition-colors border border-white/20 px-6 py-2 hover:border-[#C9B037]"
      >
        Member Access
      </button>

      <LoginModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
