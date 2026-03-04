import re

with open('components/LuxuryGarmentDetail.tsx', 'r') as f:
    content = f.read()

# Import dependencies
import_patch = """import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getItemById } from '@/data/mockData';"""

content = content.replace("import React from 'react';\nimport Link from 'next/link';\nimport { motion } from 'framer-motion';", import_patch)

# Add component logic
logic_patch = """export default function LuxuryGarmentDetail() {
  const { saveLook, setVaultOpen, savedLooks } = useStore();

  // Hardcode getting the first item to show the new features,
  // or default to Gucci if it exists
  const item = getItemById('gucci-001') || {
    id: 'placeholder',
    name: 'Evening Blazer',
    brand: 'Gucci',
    price: 2850,
    currency: 'USD',
    imageUrl: '',
    stylingTip: "Pair this statement blazer with structured denim for a balanced, modern silhouette.",
    isLocked: true,
  };

  const isSaved = savedLooks.some((look) => look.id === item.id);

  const handleSaveLook = () => {
    saveLook(item as any);
    setVaultOpen(true);
  };

  const [timeLeft, setTimeLeft] = useState('02:00:00');

  useEffect(() => {
    if (!item.isLocked) return;

    // Simple countdown simulation
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const [hours, minutes, seconds] = prev.split(':').map(Number);
        if (hours === 0 && minutes === 0 && seconds === 0) return prev;

        let newSec = seconds - 1;
        let newMin = minutes;
        let newHr = hours;

        if (newSec < 0) {
          newSec = 59;
          newMin -= 1;
        }
        if (newMin < 0) {
          newMin = 59;
          newHr -= 1;
        }

        return `${String(newHr).padStart(2, '0')}:${String(newMin).padStart(2, '0')}:${String(newSec).padStart(2, '0')}`;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [item.isLocked]);
"""

content = content.replace("export default function LuxuryGarmentDetail() {", logic_patch)

# Add Stylist Note and Drop styling
styling_note_patch = """        {/* Stylist Note */}
        {item.stylingTip && (
          <div className="mt-8 px-4">
            <div className="bg-[#1a1a1a] border border-[#ecab13]/30 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#ecab13]"></div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#ecab13]">auto_awesome</span>
                <div>
                  <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-1">AI Stylist Note</h3>
                  <p className="text-zinc-400 text-sm italic">{item.stylingTip}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Material Stats */}"""

content = content.replace("        {/* Material Stats */}", styling_note_patch)

# Update Bottom Bar
bottom_bar_patch = """      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 w-full p-4 pb-8 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-[#2d2d2d] flex gap-4 items-center z-50">
        <button
          onClick={handleSaveLook}
          className={`flex size-14 shrink-0 items-center justify-center rounded-xl border transition-colors ${isSaved ? 'bg-white text-black border-white' : 'border-[#2d2d2d] bg-[#1a1a1a] text-white hover:border-white/50'}`}
          aria-label="Save Look"
        >
          <span className="material-symbols-outlined">{isSaved ? 'bookmark_added' : 'bookmark_add'}</span>
        </button>

        <div className="flex flex-col flex-1 pl-2">
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Starting at</span>
          <p className="text-white text-xl font-bold">${item.price.toLocaleString()}</p>
        </div>

        {item.isLocked ? (
          <button disabled className="flex-[2] bg-zinc-800 text-zinc-500 h-14 rounded-xl flex flex-col items-center justify-center cursor-not-allowed border border-[#2d2d2d]">
            <span className="font-bold text-xs tracking-widest uppercase mb-0.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock</span> Locked
            </span>
            <span className="text-[10px] tracking-widest text-[#ecab13]">Available in {timeLeft}</span>
          </button>
        ) : (
          <Link href="/luxury/fitting" className="flex-[2] bg-gradient-to-br from-[#ecab13] to-[#c48a0a] text-[#0a0a0a] h-14 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(236,171,19,0.3)] hover:scale-[1.02] transition-transform">
            <span className="material-symbols-outlined font-bold">person_add_alt</span>
            <span className="font-bold text-sm tracking-widest uppercase">Try on Mannequin</span>
          </Link>
        )}
      </div>"""

content = re.sub(r'      \{\/\* Bottom Action Bar \*\/\}[\s\S]*?      <style jsx global>\{\`', bottom_bar_patch + '\n\n      <style jsx global>{`', content)

with open('components/LuxuryGarmentDetail.tsx', 'w') as f:
    f.write(content)
