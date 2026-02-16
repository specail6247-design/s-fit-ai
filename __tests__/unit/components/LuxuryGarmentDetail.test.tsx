import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LuxuryGarmentDetail from '@/components/LuxuryGarmentDetail';

// Mock LuxuryImageDistortion because it uses WebGL/Canvas
vi.mock('@/components/masterpiece/LuxuryImageDistortion', () => ({
  default: () => <div data-testid="luxury-image-distortion" />,
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('LuxuryGarmentDetail', () => {
  it('renders the main product title with the correct font class', () => {
    render(<LuxuryGarmentDetail />);

    // Find the H1 element
    const title = screen.getByRole('heading', { level: 1 });

    // Check if it has the text content
    expect(title).toHaveTextContent(/Metallic Silk/i);
    expect(title).toHaveTextContent(/Evening Blazer/i);

    // Check if it has the font-display class
    expect(title).toHaveClass('font-display');
  });

  it('renders the immersive visual component', () => {
    render(<LuxuryGarmentDetail />);
    expect(screen.getByTestId('luxury-image-distortion')).toBeInTheDocument();
  });
});
