/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import LuxuryLiveFitting from '@/components/LuxuryLiveFitting';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock dependencies
vi.mock('next/font/google', () => ({
  Playfair_Display: () => ({ className: 'playfair' }),
  Cinzel: () => ({ className: 'cinzel' }),
}));

vi.mock('@/components/masterpiece/LuxuryCursor', () => ({
  default: () => <div data-testid="luxury-cursor">Cursor</div>,
}));

vi.mock('@/components/masterpiece/LuxuryImageDistortion', () => ({
  default: () => <div data-testid="luxury-image-distortion">Distortion</div>,
}));

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      rect: ({ children, ...props }: any) => <rect {...props}>{children}</rect>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('LuxuryLiveFitting', () => {
  it('renders correctly', () => {
    render(<LuxuryLiveFitting />);
    expect(screen.getByText('S_FIT')).toBeInTheDocument();
    expect(screen.getByText('LUXURY COLLECTION')).toBeInTheDocument();
  });
});
