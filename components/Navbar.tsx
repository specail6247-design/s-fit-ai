import React, { useState } from 'react';
import { MemberAccessModal } from './MemberAccessModal';

export function Navbar() {
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-40 pointer-events-none">
        <div className="text-xl font-black italic tracking-tighter pointer-events-auto">
          S_FIT<span className="text-[#007AFF]">_</span>
        </div>
        <button
          onClick={() => setIsMemberModalOpen(true)}
          className="pointer-events-auto px-4 py-2 border border-white/20 hover:bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase transition-colors bg-black/50 backdrop-blur-md"
        >
          Member Access
        </button>
      </nav>
      <MemberAccessModal isOpen={isMemberModalOpen} onClose={() => setIsMemberModalOpen(false)} />
    </>
  );
}
