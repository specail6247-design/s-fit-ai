import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Space_Grotesk: () => ({
    style: { fontFamily: 'Space Grotesk' },
    className: 'mock-space-grotesk',
    variable: '--font-space-grotesk',
  }),
  Cinzel: () => ({
    style: { fontFamily: 'Cinzel' },
    className: 'mock-cinzel',
    variable: '--font-cinzel',
  }),
  Playfair_Display: () => ({
    style: { fontFamily: 'Playfair Display' },
    className: 'mock-playfair',
    variable: '--font-playfair',
  }),
}));
