'use client';

import React from 'react';
import { PrivacyModal } from './modals/PrivacyModal';
import { SupportHub } from './modals/SupportHub';

export const GlobalOverlays: React.FC = () => {
  return (
    <>
      <SupportHub />
      <PrivacyModal />
    </>
  );
};
