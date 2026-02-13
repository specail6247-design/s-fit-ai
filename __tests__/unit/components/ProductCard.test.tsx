import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductCard } from '@/components/ui/ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    name: 'Luxury Silk Shirt',
    brand: 'Gucci',
    price: '$1200',
    imageUrl: '/test-image.jpg',
  };

  it('renders product information correctly', () => {
    render(<ProductCard {...mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.price)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', mockProduct.name);
  });

  it('has an accessible "Try On" button with descriptive label', () => {
    render(<ProductCard {...mockProduct} />);

    // We want the button to have a specific accessible name that includes the product name
    // This helps screen reader users know *which* product they are trying on.
    const button = screen.getByRole('button');

    // This is expected to fail initially as the current button only has text "Try On"
    expect(button).toHaveAccessibleName(`Try on ${mockProduct.name}`);
  });
});
