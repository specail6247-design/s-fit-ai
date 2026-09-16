import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Geist: () => ({ style: { fontFamily: 'mocked' }, className: 'mocked', variable: '--font-geist-sans' }),
  Geist_Mono: () => ({ style: { fontFamily: 'mocked' }, className: 'mocked', variable: '--font-geist-mono' }),
  Cinzel: () => ({ style: { fontFamily: 'mocked' }, className: 'mocked', variable: '--font-cinzel' }),
  Space_Grotesk: () => ({ style: { fontFamily: 'mocked' }, className: 'mocked', variable: '--font-space-grotesk' })
}));
