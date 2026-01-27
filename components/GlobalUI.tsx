'use client';

import { useStore } from '@/store/useStore';
import { LoginModal } from '@/components/LoginModal';
import { SupportDrawer } from '@/components/SupportDrawer';
import { motion } from 'framer-motion';

export function GlobalUI() {
  const { setShowLoginModal, setShowSupportDrawer } = useStore();

  return (
    <>
      <LoginModal />
      <SupportDrawer />

      {/* Member Access Trigger - Top Right (High Z-Index to sit above other UI) */}
      <motion.button
        onClick={() => setShowLoginModal(true)}
        className="fixed top-6 right-6 z-[60] text-xs font-bold text-soft-gray hover:text-luxury-gold transition-colors tracking-widest uppercase flex items-center gap-2 group bg-void-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/5 hover:border-luxury-gold/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span className="w-2 h-2 rounded-full bg-luxury-gold opacity-50 group-hover:opacity-100 group-hover:shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-all" />
        Member Access
      </motion.button>

      {/* Support Hub Trigger - Bottom Right */}
      <motion.button
        onClick={() => setShowSupportDrawer(true)}
        className="fixed bottom-6 right-6 z-[60] w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-soft-gray hover:text-pure-white hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-lg">?</span>
      </motion.button>
    </>
  );
}
