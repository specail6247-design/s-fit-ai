import { render, screen, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import LuxuryLiveFitting from '@/components/LuxuryLiveFitting';

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Playfair_Display: () => ({ variable: 'font-playfair', className: 'font-playfair' }),
  Cinzel: () => ({ variable: 'font-cinzel', className: 'font-cinzel' }),
}));

// Mock framer-motion components
vi.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @next/next/no-img-element, jsx-a11y/alt-text
    img: ({ children: _children, ...props }: any) => <img {...props} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    path: (props: any) => <path {...props} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock child components
vi.mock('@/components/ui/LuxuryImageDistortion', () => ({
  default: () => <div data-testid="luxury-distortion">Distortion Effect</div>
}));

vi.mock('@/components/ui/GoldRingCursor', () => ({
  default: () => <div data-testid="gold-cursor">Cursor</div>
}));

// Mock data
vi.mock('@/data/mockData', () => ({
  brands: [
    { id: '1', name: 'TestBrand', description: 'Test Description', bannerImage: 'test-banner.jpg' },
    { id: '2', name: 'AnotherBrand', description: 'Another Description', bannerImage: 'another-banner.jpg' }
  ],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItemsByBrand: (_brandName: string) => [
    { id: 'item1', name: 'Test Item', price: 1234.56, imageUrl: 'item1.jpg', category: 'tops' }
  ],
}));

describe('LuxuryLiveFitting Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initially renders in loading state', () => {
    render(<LuxuryLiveFitting />);
    expect(screen.getByText('LOADING')).toBeInTheDocument();
  });

  it('renders brand content after loading', async () => {
    render(<LuxuryLiveFitting />);

    // Fast-forward time to skip loading delay (1500ms)
    act(() => {
      vi.advanceTimersByTime(1600);
    });

    // Check for brand name (mocked as TestBrand because component selects by name 'Gucci' or falls back to brands[0])
    // Our mock brands doesn't have Gucci, so it should fallback to TestBrand (index 0)
    // It appears multiple times (Header, Footer), so we check that at least one exists
    expect(screen.getAllByText('TestBrand').length).toBeGreaterThan(0);

    // Check for description
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    // Check for price formatting
    // 1234.56 -> $1,234.56
    expect(screen.getByText('$1,234.56')).toBeInTheDocument();

    // Check for item name
    expect(screen.getAllByText('Test Item').length).toBeGreaterThan(0);

    // Check if distortion component is rendered
    expect(screen.getByTestId('luxury-distortion')).toBeInTheDocument();
  });
});
