
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ARLiveFitting from '@/components/ARLiveFitting';
import { getAllItems } from '@/data/mockData';

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  }
}));

// Mock getAllItems
vi.mock('@/data/mockData', () => ({
  getAllItems: vi.fn(),
  mockClothingItems: [] // Add this if needed by other imports
}));

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Space_Grotesk: () => ({ className: 'mocked-font' }),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick, layoutId }: any) => (
      <div className={className} onClick={onClick} data-layout-id={layoutId}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ARLiveFitting', () => {
  it('renders a list of items', () => {
    const mockItems = [
      { id: '1', name: 'Test Item 1', price: 100, imageUrl: '/img1.png', isLuxury: false },
      { id: '2', name: 'Test Item 2', price: 200, imageUrl: '/img2.png', isLuxury: true },
    ];
    (getAllItems as any).mockReturnValue(mockItems);

    render(<ARLiveFitting />);

    expect(screen.getByText('Test Item 1')).toBeDefined();
    // Using regex for price because of locale string
    expect(screen.getByText(/\$100/)).toBeDefined();
    expect(screen.getByText('Test Item 2')).toBeDefined();
    expect(screen.getByText(/\$200/)).toBeDefined();
  });

  it('handles image error by setting fallback', () => {
    const mockItems = [
      { id: '1', name: 'Item 1', price: 100, imageUrl: '/img1.png', isLuxury: false },
    ];
    (getAllItems as any).mockReturnValue(mockItems);

    render(<ARLiveFitting />);

    const img = screen.getByAltText('Item 1');
    fireEvent.error(img);

    // After error, src should change to placeholder
    expect(img.getAttribute('src')).toContain('placehold.co');
  });
});
