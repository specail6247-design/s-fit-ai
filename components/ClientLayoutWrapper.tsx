'use client';

import React, { useState } from 'react';
import { SupportHub } from './ui/SupportHub';
import { PrivacyTermsModal } from './ui/PrivacyTermsModal';

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'terms'>('privacy');

  const openModal = (type: 'privacy' | 'terms') => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <>
      {children}
      <SupportHub />
      <PrivacyTermsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />

      {/* Global Footer for Legal Links */}
      <div className="fixed bottom-2 left-2 z-40 flex gap-4 text-[10px] text-gray-500 font-mono bg-black/50 p-2 rounded-lg backdrop-blur-sm border border-white/10">
        <button onClick={() => openModal('privacy')} className="hover:text-white transition-colors">
          Privacy Policy
        </button>
        <span>|</span>
        <button onClick={() => openModal('terms')} className="hover:text-white transition-colors">
          Terms of Service
        </button>
      </div>
    </>
  );
}
