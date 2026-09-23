import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Geist: () => ({
    style: { fontFamily: 'mocked' },
    className: 'mocked-geist-sans',
    variable: '--font-geist-sans',
  }),
  Geist_Mono: () => ({
    style: { fontFamily: 'mocked' },
    className: 'mocked-geist-mono',
    variable: '--font-geist-mono',
  }),
  Cinzel: () => ({
    style: { fontFamily: 'mocked' },
    className: 'mocked-cinzel',
    variable: '--font-cinzel',
  }),
}));
