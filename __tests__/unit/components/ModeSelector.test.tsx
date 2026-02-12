import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ModeSelector } from '@/components/ModeSelector';
import { useStore } from '@/store/useStore';

// Mock the store
vi.mock('@/store/useStore', () => ({
  useStore: vi.fn(),
}));

describe('ModeSelector', () => {
  const mockSetSelectedMode = vi.fn();
  const mockResetSession = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setSelectedMode: mockSetSelectedMode,
      resetSession: mockResetSession,
    });
  });

  it('renders all mode options', () => {
    render(<ModeSelector />);

    expect(screen.getByText('VIBE CHECK')).toBeInTheDocument();
    expect(screen.getByText('DIGITAL TWIN')).toBeInTheDocument();
    expect(screen.getByText('EASY FIT')).toBeInTheDocument();
  });

  it('calls setSelectedMode and resetSession when a mode is clicked', () => {
    render(<ModeSelector />);

    const vibeCheckMode = screen.getByText('VIBE CHECK');
    fireEvent.click(vibeCheckMode);

    expect(mockResetSession).toHaveBeenCalled();
    expect(mockSetSelectedMode).toHaveBeenCalledWith('vibe-check');
  });

  it('has accessible buttons for each mode', () => {
    render(<ModeSelector />);

    // Check that we have buttons with the correct accessible names
    const vibeCheckButton = screen.getByRole('button', { name: /Select VIBE CHECK mode/i });
    const digitalTwinButton = screen.getByRole('button', { name: /Select DIGITAL TWIN mode/i });
    const easyFitButton = screen.getByRole('button', { name: /Select EASY FIT mode/i });

    expect(vibeCheckButton).toBeInTheDocument();
    expect(digitalTwinButton).toBeInTheDocument();
    expect(easyFitButton).toBeInTheDocument();
  });
});
