import { render, screen, act } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from 'vitest';
import LuxuryLiveFitting from '@/components/LuxuryLiveFitting';
import { mockClothingItems } from '@/data/mockData';

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Cinzel: () => ({ className: 'cinzel-font' }),
  Space_Grotesk: () => ({ className: 'space-grotesk-font' }),
}));

// Mock child components to isolate the test
vi.mock('@/components/masterpiece/LuxuryImageDistortion', () => ({
  default: ({ image }: { image: string }) => <div data-testid="luxury-distortion">{image}</div>
}));

vi.mock('@/components/ui/GoldRingCursor', () => ({
  default: () => <div data-testid="gold-cursor" />
}));

// Mock framer-motion
// eslint-disable-next-line react/display-name
vi.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => {
        // Remove layoutId to prevent React warning during test
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { layoutId, ...rest } = props;
        return <div {...rest}>{children}</div>;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    img: ({ ...props }: any) => {
      // eslint-disable-next-line @next/next/no-img-element
      return <img {...props} alt={props.alt || "mocked-img"} />;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rect: ({ children, ...props }: any) => <rect {...props}>{children}</rect>,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('LuxuryLiveFitting', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the luxury fitting interface with initial brand (Gucci)', async () => {
    vi.useFakeTimers();
    render(<LuxuryLiveFitting />);

    // Check for loading state first
    expect(screen.getByText(/LOADING/i)).toBeInTheDocument();

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(2100);
    });

    // Loading should be gone
    expect(screen.queryByText(/LOADING/i)).not.toBeInTheDocument();

    // Check for Brand Name (Gucci is default in mock)
    expect(screen.getByText('GUCCI')).toBeInTheDocument();

    // Check for "LUXE FIT" header
    expect(screen.getByText('LUXE FIT')).toBeInTheDocument();
  });

  it('renders a list of products for the selected brand', async () => {
     vi.useFakeTimers();
     render(<LuxuryLiveFitting />);

     act(() => {
         vi.advanceTimersByTime(2100);
     });

     const brandItems = mockClothingItems.filter(i => i.brand === 'Gucci');
     if (brandItems.length > 0) {
        // Check for the first item name
        expect(screen.getByText(brandItems[0].name)).toBeInTheDocument();
     }
  });
});
