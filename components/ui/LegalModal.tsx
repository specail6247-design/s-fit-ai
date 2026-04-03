import React from 'react';
import { BottomSheet } from './BottomSheet';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | null;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4 text-sm text-[var(--color-text-secondary)] leading-relaxed pb-8">
        {type === 'privacy' ? (
          <>
            <p><strong>Last Updated: October 24, 2026</strong></p>
            <p>Your privacy is important to us. It is S_FIT AI&apos;s policy to respect your privacy regarding any information we may collect from you across our website.</p>
            <h4 className="text-white font-bold mt-4">1. Information We Collect</h4>
            <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
            <h4 className="text-white font-bold mt-4">2. Use of Photos</h4>
            <p><strong>Photos uploaded for virtual fitting are processed securely and are NOT shared with third parties.</strong> They are temporarily stored during the session and are deleted immediately after processing is complete.</p>
            <h4 className="text-white font-bold mt-4">3. Contact Us</h4>
            <p>If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
          </>
        ) : (
          <>
            <p><strong>Last Updated: October 24, 2026</strong></p>
            <p>By accessing the website at S_FIT AI, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
            <h4 className="text-white font-bold mt-4">1. Use License</h4>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on S_FIT AI&apos;s website for personal, non-commercial transitory viewing only.</p>
            <h4 className="text-white font-bold mt-4">2. Disclaimer</h4>
            <p>The materials on S_FIT AI&apos;s website are provided on an &apos;as is&apos; basis. S_FIT AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            <h4 className="text-white font-bold mt-4">3. Limitations</h4>
            <p>In no event shall S_FIT AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on S_FIT AI&apos;s website.</p>
          </>
        )}
      </div>
    </BottomSheet>
  );
};
