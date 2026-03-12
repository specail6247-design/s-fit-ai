'use client';

import React from 'react';
import LoginModal from './LoginModal';
import SupportHub from './SupportHub';
import { PremiumModal } from '../PremiumModal';

export default function ModalProvider() {
  return (
    <>
      <LoginModal />
      <SupportHub />
      <PremiumModal />
    </>
  );
}
