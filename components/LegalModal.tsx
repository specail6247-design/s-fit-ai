import React from 'react';
import { BottomSheet } from './ui/BottomSheet';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Privacy Policy & Terms">
      <div className="space-y-4 text-sm text-[var(--color-text-secondary)]">
        <h4 className="font-bold text-[var(--color-text-primary)]">1. Data Privacy</h4>
        <p>Your photos are processed securely for virtual try-on purposes only. We do not store or share your uploaded images with third parties without your explicit consent.</p>

        <h4 className="font-bold text-[var(--color-text-primary)]">2. Usage Terms</h4>
        <p>By using S_FIT AI, you agree to our terms of service. The service is provided &quot;as is&quot; without warranties of any kind.</p>

        <h4 className="font-bold text-[var(--color-text-primary)]">3. Data Retention</h4>
        <p>User-uploaded photos are immediately deleted from our servers after the processing is complete. Result images are available for a limited time for sharing purposes.</p>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-[var(--color-primary)] text-[var(--color-secondary)] font-bold rounded-xl"
        >
          I Understand
        </button>
      </div>
    </BottomSheet>
  );
};
