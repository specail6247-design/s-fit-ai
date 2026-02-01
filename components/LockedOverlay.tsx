'use client';

import React, { useEffect, useState } from 'react';

export function LockedOverlay({ lockedUntil }: { lockedUntil: string }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(lockedUntil) - +new Date();
      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
      return 'UNLOCKED';
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [lockedUntil]);

  if (timeLeft === 'UNLOCKED') return null;

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center text-center p-1 rounded-lg cursor-not-allowed">
      <span className="material-symbols-outlined text-[#ecab13] text-lg mb-1">lock</span>
      <span className="text-[8px] uppercase tracking-widest text-gray-400">Dropping In</span>
      <span className="text-xs font-bold font-mono text-white mt-0.5">{timeLeft}</span>
    </div>
  );
}
