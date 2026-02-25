'use client';

import { useStore } from '@/store/useStore';
import { LoginModal } from '@/components/LoginModal';
import { SupportHub } from '@/components/SupportHub';
import { PrivacyModal } from '@/components/PrivacyModal';
import { PremiumModal } from '@/components/PremiumModal';

export function GlobalOverlays() {
  const setSupportOpen = useStore((state) => state.setSupportOpen);

  return (
    <>
      <LoginModal />
      <SupportHub />
      <PrivacyModal />
      <PremiumModal />

      {/* Support Trigger Button */}
      <button
        onClick={() => setSupportOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-full backdrop-blur-md border border-white/10 transition-all hover:scale-110 hover:border-cyber-lime/50 group"
        aria-label="Help & Support"
      >
        <span className="text-xl group-hover:rotate-12 transition-transform">?</span>
      </button>
    </>
  );
}
