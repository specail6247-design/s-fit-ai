import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/ui/ProductCard';
import { describe, it, expect, vi } from 'vitest';

describe('ProductCard', () => {
  const mockProps = {
    name: 'Test Product',
    brand: 'Test Brand',
    price: '$100',
    imageUrl: '/test-image.jpg',
    onTryOn: vi.fn(),
  };

  it('renders product details correctly', () => {
    render(<ProductCard {...mockProps} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('renders Try On button with accessible label', () => {
    render(<ProductCard {...mockProps} />);
    const button = screen.getByRole('button', { name: /try on/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Try on Test Product');
  });

  it('calls onTryOn when clicked', () => {
    render(<ProductCard {...mockProps} />);
    const button = screen.getByRole('button', { name: /try on/i });
    fireEvent.click(button);
    expect(mockProps.onTryOn).toHaveBeenCalled();
  });
});
