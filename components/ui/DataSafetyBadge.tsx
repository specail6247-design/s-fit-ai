import React from 'react';
import { motion } from 'framer-motion';

export function DataSafetyBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 bg-black/40 border border-green-500/30 px-3 py-1.5 rounded-full text-[10px] text-green-400 font-medium w-max mx-auto my-4 shadow-[0_0_10px_rgba(34,197,94,0.1)]"
    >
      <span className="text-green-500">🔒</span>
      Photos are processed securely and not shared.
    </motion.div>
  );
}
