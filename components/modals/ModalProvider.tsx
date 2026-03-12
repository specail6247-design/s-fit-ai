'use client';

import { LoginModal } from './LoginModal';
import { SupportHub } from './SupportHub';
import { PremiumModal } from '../PremiumModal'; // Existing modal

export function ModalProvider() {
  return (
    <>
      <PremiumModal />
      <LoginModal />
      <SupportHub />
    </>
  );
}
