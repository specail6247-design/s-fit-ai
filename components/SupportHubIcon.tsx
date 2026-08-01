import React from 'react';
import { motion } from 'framer-motion';

export default function SupportHubIcon({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-[#007AFF] text-white p-3 rounded-full shadow-lg hover:bg-[#005bb5] transition-colors border border-white/20"
      aria-label="Support Hub"
    >
      <span className="text-xl">💬</span>
    </motion.button>
  );
}
