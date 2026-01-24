import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from '../../../../components/ui/ProductCard';

describe('ProductCard', () => {
  const defaultProps = {
    name: 'Luxury Silk Dress',
    brand: 'Gucci',
    price: '$2,500',
    imageUrl: '/test-image.jpg',
    onTryOn: vi.fn(),
  };

  it('renders product details correctly', () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText('Luxury Silk Dress')).toBeInTheDocument();
    expect(screen.getByText('Gucci')).toBeInTheDocument();
    expect(screen.getByText('$2,500')).toBeInTheDocument();
  });

  it('renders "Try On" button with accessibility attributes', () => {
    render(<ProductCard {...defaultProps} />);

    // We expect the button to exist
    const button = screen.getByText('Try On');
    expect(button).toBeInTheDocument();

    // Verify aria-label (this is expected to be added)
    expect(button).toHaveAttribute('aria-label', 'Try on Luxury Silk Dress');
  });
});
