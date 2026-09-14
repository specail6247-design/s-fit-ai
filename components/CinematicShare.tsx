'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CinematicShare({ videoUrl }: { videoUrl: string }) {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleShare = () => {
    setIsExporting(true);
    setTimeout(() => { setIsExporting(false); setExported(true); }, 2000);
  };

  return (
    <div className="p-6 bg-[#0A0A0A] rounded-2xl border border-[#C9B037]/30">
      <h3 className="text-xl font-bold font-sans text-white mb-2">Cinematic Share</h3>
      <p className="text-xs text-[#8A8A8A] mb-6">Export 4K Hollywood-style clips.</p>
      {exported ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center p-4 bg-[#CCFF00]/10 border border-[#CCFF00]/30 rounded-xl text-[#CCFF00] font-mono text-sm"
        >
          4K Video Exported!
        </motion.div>
      ) : (
        <button
          onClick={handleShare} disabled={isExporting}
          className="w-full py-3 bg-gradient-to-r from-[#C9B037] to-[#e8d282] text-black font-bold rounded-full transition-all duration-700"
        >
          {isExporting ? 'EXPORTING 4K...' : 'EXPORT TO SOCIAL'}
        </button>
      )}
    </div>
  );
}
