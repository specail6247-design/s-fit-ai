import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components/ui/ProductCard';
import { describe, it, expect, vi } from 'vitest';

// Mock framer-motion to avoid animation issues in tests and simplify DOM structure
vi.mock('framer-motion', () => ({
  motion: {
    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
    div: ({ children, className, onClick, whileHover, whileTap, transition, ...props }: any) => (
      <div className={className} onClick={onClick} {...props}>{children}</div>
    ),
    img: ({ src, alt, className, whileHover, transition, ...props }: any) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={className} {...props} />
    ),
    button: ({ children, onClick, className, whileHover, whileTap, ...props }: any) => (
      <button onClick={onClick} className={className} {...props}>{children}</button>
    ),
    /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
  },
}));

describe('ProductCard', () => {
  const mockProps = {
    name: 'Luxury Jacket',
    brand: 'Gucci',
    price: '$2,500',
    imageUrl: '/test-image.jpg',
    onTryOn: vi.fn(),
  };

  it('renders product details correctly', () => {
    render(<ProductCard {...mockProps} />);
    expect(screen.getByText('Luxury Jacket')).toBeDefined();
    expect(screen.getByText('Gucci')).toBeDefined();
    expect(screen.getByText('$2,500')).toBeDefined();
  });

  it('has accessible "Try On" button', () => {
    render(<ProductCard {...mockProps} />);
    const button = screen.getByText('Try On');

    // Check for aria-label
    expect(button.getAttribute('aria-label')).toBe('Try on Luxury Jacket');

    // Check for focus visibility classes
    expect(button.className).toContain('focus-visible:ring-2');
  });

  it('overlay becomes visible on focus within', () => {
     const { container } = render(<ProductCard {...mockProps} />);
     // The overlay container is the one with group-hover:opacity-100
     // We want to ensure it also has group-focus-within:opacity-100
     const overlay = container.querySelector('.group-hover\\:opacity-100');
     expect(overlay).toBeDefined();
     expect(overlay?.className).toContain('group-focus-within:opacity-100');
  });
});
