'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { MemberAccessModal } from './MemberAccessModal';

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
          <p className="text-xs text-soft-gray font-mono uppercase tracking-widest">Member</p>
          <p className="text-sm font-bold text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold transition-colors border border-white/10 tracking-widest uppercase"
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
        className="bg-white text-void-black px-6 py-2.5 rounded-full text-xs font-black hover:bg-gray-200 transition-all tracking-widest uppercase"
      >
        Sign In
      </button>

      <MemberAccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
