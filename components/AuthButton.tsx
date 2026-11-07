'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { VIPLoginModal } from './layout/VIPLoginModal';

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
          <p className="text-[10px] text-[#c9b037] font-mono tracking-widest uppercase">Member</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-white px-4 py-2 text-[10px] font-mono tracking-widest transition-colors border border-white/20"
        >
          SIGN OUT
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-transparent text-white border border-white/20 px-6 py-2 text-xs font-mono tracking-widest hover:bg-white hover:text-black transition-all duration-300 uppercase"
      >
        Member Access
      </button>

      <VIPLoginModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
