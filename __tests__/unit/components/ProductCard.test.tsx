import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from '@/components/ui/ProductCard';

describe('ProductCard', () => {
  const mockProps = {
    name: 'Test Jacket',
    brand: 'Test Brand',
    price: '$100',
    imageUrl: '/test-image.jpg',
    onTryOn: vi.fn(),
  };

  it('renders correctly', () => {
    render(<ProductCard {...mockProps} />);
    expect(screen.getByText('Test Jacket')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Jacket');
  });

  it('has accessible Try On button', () => {
    render(<ProductCard {...mockProps} />);

    // This verifies the aria-label matches "Try on {name}"
    const button = screen.getByRole('button', { name: /try on test jacket/i });
    expect(button).toBeInTheDocument();

    // Verify focus classes are present
    expect(button).toHaveClass('focus:opacity-100');
    expect(button).toHaveClass('focus:ring-[var(--color-primary)]');
  });
});
