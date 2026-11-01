import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SimpleTryOn from '@/components/SimpleTryOn';

// Mock fetch
global.fetch = vi.fn();

describe('SimpleTryOn', () => {
  it('renders correctly', () => {
    render(<SimpleTryOn />);
    expect(screen.getByText('VIRTUAL TRY-ON')).toBeInTheDocument();
    expect(screen.getByText('Upload Your Photo')).toBeInTheDocument();
    expect(screen.getByText('Upload Garment')).toBeInTheDocument();
  });

  it('button is disabled initially', () => {
    render(<SimpleTryOn />);
    const button = screen.getByText('GENERATE FIT');
    expect(button).toBeDisabled();
  });
});
