import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from '@/components/ui/ProductCard';

describe('ProductCard', () => {
  const mockProps = {
    name: 'Test Product',
    brand: 'Test Brand',
    price: '$100',
    imageUrl: 'https://example.com/image.jpg',
    onTryOn: vi.fn(),
  };

  it('renders product details correctly', () => {
    render(<ProductCard {...mockProps} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('has accessible try on button', () => {
    render(<ProductCard {...mockProps} />);
    // The accessible name should now include the product name for better context
    const button = screen.getByRole('button', { name: /try on test product/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onTryOn when clicked', () => {
    render(<ProductCard {...mockProps} />);
    const button = screen.getByRole('button', { name: /try on test product/i });
    fireEvent.click(button);
    expect(mockProps.onTryOn).toHaveBeenCalledTimes(1);
  });
});
