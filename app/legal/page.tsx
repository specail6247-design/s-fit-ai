'use client';

import React, { useState } from 'react';
import { LegalModal } from '@/components/ui/LegalModal';

export default function LegalPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Legal Documents</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-[#007AFF] text-white rounded-lg font-medium"
        >
          View Privacy & Terms
        </button>
      </div>
      <LegalModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
