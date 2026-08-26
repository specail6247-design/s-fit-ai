import React from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Privacy Policy & Terms">
      <div className="space-y-4 text-sm text-[var(--color-text-secondary)]">
        <h4 className="text-white font-bold">1. Data Processing</h4>
        <p>Your photos are processed securely and are never shared with third parties.</p>
        <h4 className="text-white font-bold">2. Usage Rights</h4>
        <p>You retain full rights to all generated images.</p>
        <div className="pt-4 flex justify-end border-t border-[var(--border-color)]">
          <button onClick={onClose} className="px-4 py-2 bg-[var(--color-primary)] text-black rounded-full font-bold">
            Acknowledge
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};
