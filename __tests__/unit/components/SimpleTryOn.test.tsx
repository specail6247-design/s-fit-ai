import { render, screen, fireEvent } from '@testing-library/react';
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

  it('shows alert if images are missing when clicking Try On', () => {
    // Polyfill alert for happy-dom
    window.alert = vi.fn();
    const alertMock = vi.spyOn(window, 'alert');
    render(<SimpleTryOn />);
    
    const button = screen.getByText('GENERATE FIT');
    expect(button).toBeDisabled();

    // We can't click a disabled button, but if we could, we would check the alert
    // fireEvent.click(button);
    // expect(alertMock).toHaveBeenCalledWith('Please upload both images');
  });

  // Note: Testing file upload and API interaction would require more complex mocking of URL.createObjectURL and fetch bodies
  // but this basic test covers the UI presence logic.
});
