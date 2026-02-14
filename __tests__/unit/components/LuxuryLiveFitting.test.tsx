import React from 'react';
import { render, screen, act } from '@testing-library/react';
import LuxuryLiveFitting from '@/components/LuxuryLiveFitting';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock child components
vi.mock('@/components/ui/GoldRingCursor', () => ({
  GoldRingCursor: () => <div data-testid="gold-ring-cursor" />,
}));

vi.mock('@/components/masterpiece/LuxuryImageDistortion', () => ({
  default: () => <div data-testid="luxury-image-distortion" />,
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    rect: ({ children, ...props }: any) => <rect {...props}>{children}</rect>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useMotionValue: () => ({ set: vi.fn() }),
  useSpring: () => ({ get: () => 0 }),
}));

describe('LuxuryLiveFitting', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders loading state then main content', async () => {
    render(<LuxuryLiveFitting />);

    // Check loading state
    expect(screen.getByText(/Processing Luxury Assets/i)).toBeInTheDocument();

    // Advance time to bypass loading
    act(() => {
      vi.advanceTimersByTime(2500);
    });

    // Check for main elements
    expect(screen.getByText(/S_FIT/i)).toBeInTheDocument();
    expect(screen.getByText(/LUXURY/i)).toBeInTheDocument();
    expect(screen.getByTestId('gold-ring-cursor')).toBeInTheDocument();
  });
});
