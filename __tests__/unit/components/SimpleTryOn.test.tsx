import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SFitAIProject from '@/components/SimpleTryOn';

// Mock fetch
global.fetch = vi.fn();

describe('SimpleTryOn', () => {
  it('renders correctly', () => {
    render(<SFitAIProject />);
    expect(screen.getByText('SIMPLE MODE ACTIVATED (Verified)')).toBeInTheDocument();
    expect(screen.getByText('User Photo')).toBeInTheDocument();
    expect(screen.getByText('Garment')).toBeInTheDocument();
  });

  it('shows alert if images are missing when clicking Try On', () => {
    // Polyfill alert for happy-dom
    window.alert = vi.fn();
    const alertMock = vi.spyOn(window, 'alert');
    render(<SFitAIProject />);
    
    fireEvent.click(screen.getByText('Try It On'));
    expect(alertMock).toHaveBeenCalledWith('사진과 의류를 선택해주세요.');
  });

  // Note: Testing file upload and API interaction would require more complex mocking of URL.createObjectURL and fetch bodies
  // but this basic test covers the UI presence logic.
});
