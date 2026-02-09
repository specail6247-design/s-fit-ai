import { render, screen, fireEvent } from '@testing-library/react';
import HyperZoom from '@/components/ui/HyperZoom';
import { describe, it, expect } from 'vitest';
import React from 'react';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    div: ({ children, className, style, onHoverStart, onHoverEnd, animate, initial, exit, transition, ...props }: React.PropsWithChildren<{
      className?: string;
      style?: React.CSSProperties;
      onHoverStart?: unknown;
      onHoverEnd?: unknown;
      animate?: unknown;
      initial?: unknown;
      exit?: unknown;
      transition?: unknown;
      [key: string]: unknown;
    }>) => (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    ),
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('HyperZoom', () => {
  it('renders the image correctly', () => {
    render(<HyperZoom imageUrl="test.jpg" altText="Test Image" />);
    const img = screen.getByAltText('Test Image');
    expect(img).toBeDefined();
    expect(img.getAttribute('src')).toBe('test.jpg');
  });

  it('shows zoom indicator on hover', async () => {
    render(<HyperZoom imageUrl="test.jpg" />);

    // Find the container (it has the mouse event handlers)
    // The image is inside motion.div, which is inside the container
    const img = screen.getByAltText('Product Image');
    const motionDiv = img.parentElement;
    const container = motionDiv?.parentElement;

    if (!container) throw new Error('Container not found');

    // Initially zoom indicator should be hidden
    const indicator = screen.getByText(/HYPER-ZOOM ACTIVE/i);
    expect(indicator.className).toContain('opacity-0');

    // Hover
    fireEvent.mouseEnter(container);

    // Indicator should be visible
    expect(indicator.className).toContain('opacity-100');

    // Leave
    fireEvent.mouseLeave(container);
    expect(indicator.className).toContain('opacity-0');
  });
});
