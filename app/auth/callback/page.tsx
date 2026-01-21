'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // The supabase-js client automatically parses the URL hash/query parameters
    // when initialized in the browser. We just need to wait a moment or listen for auth state.
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // User has signed in successfully
        // Redirect to home page
        router.push('/');
      }
    });

    // Fallback redirect if something goes wrong or if session is already active
    const timeout = setTimeout(() => {
        router.push('/');
    }, 2000);

    return () => {
        subscription.unsubscribe();
        clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-void-black flex flex-col items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-lime mb-4"></div>
        <p className="text-sm text-soft-gray tracking-wider">Logging you in...</p>
    </div>
  );
}
