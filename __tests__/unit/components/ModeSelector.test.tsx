import { render, screen, fireEvent } from '@testing-library/react';
import { ModeSelector } from '@/components/ModeSelector';
import { useStore } from '@/store/useStore';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the store
vi.mock('@/store/useStore', () => ({
  useStore: vi.fn(),
}));

describe('ModeSelector', () => {
  const mockSetSelectedMode = vi.fn();
  const mockResetSession = vi.fn();

  beforeEach(() => {
    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setSelectedMode: mockSetSelectedMode,
      resetSession: mockResetSession,
    });
    vi.clearAllMocks();
  });

  it('renders all modes', () => {
    render(<ModeSelector />);
    expect(screen.getByText('VIBE CHECK')).toBeInTheDocument();
    expect(screen.getByText('DIGITAL TWIN')).toBeInTheDocument();
    expect(screen.getByText('EASY FIT')).toBeInTheDocument();
  });

  it('allows selection via click', () => {
    render(<ModeSelector />);
    fireEvent.click(screen.getByText('VIBE CHECK'));
    expect(mockSetSelectedMode).toHaveBeenCalledWith('vibe-check');
  });

  it('has accessible buttons for modes', () => {
    render(<ModeSelector />);

    // Check if the Vibe Check card is accessible as a button
    const vibeCheckButton = screen.getByRole('button', { name: /Select VIBE CHECK mode/i });
    expect(vibeCheckButton).toBeInTheDocument();

    // Verify clicking the accessible button triggers the action
    // Note: Since it is a proper <button>, browsers handle Enter/Space to trigger click automatically.
    // We trust the browser/React to handle the keyboard -> click mapping for <button>.
    fireEvent.click(vibeCheckButton);
    expect(mockSetSelectedMode).toHaveBeenCalledWith('vibe-check');
  });
});
