import React from 'react';
import { SupportForm } from '@/components/SupportForm';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black tracking-tighter italic mb-2">
            S_FIT <span className="text-[#007AFF]">SUPPORT</span>
        </h1>
        <p className="text-gray-400 mb-8">We're here to help. Report issues to improve the experience.</p>
        <SupportForm />
      </div>
    </div>
  );
}
