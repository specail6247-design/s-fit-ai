import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PhotoFitting from '@/components/PhotoFitting';

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Space_Grotesk: () => ({ className: 'mock-font' }),
}));

// Mock store
const mockAddToVault = vi.fn();
const mockSetVaultOpen = vi.fn();
const mockSetAudioMuted = vi.fn();

vi.mock('@/store/useStore', () => ({
  useStore: (selector: unknown) => {
    const state = {
      addToVault: mockAddToVault,
      setVaultOpen: mockSetVaultOpen,
      isAudioMuted: true,
      setAudioMuted: mockSetAudioMuted,
      savedLooks: [],
      removeFromVault: vi.fn(),
      isVaultOpen: false,
    };
    return typeof selector === 'function' ? selector(state) : state;
  },
}));

// Mock AmbientAudio and TheVault to avoid complex rendering in unit test
vi.mock('@/components/AmbientAudio', () => ({
  default: () => <div data-testid="ambient-audio">Ambient Audio</div>,
}));

vi.mock('@/components/TheVault', () => ({
  default: () => <div data-testid="the-vault">The Vault</div>,
}));

describe('PhotoFitting', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<PhotoFitting />);
    expect(screen.getByText('Luxury Live Fitting')).toBeInTheDocument();
    expect(screen.getByTestId('ambient-audio')).toBeInTheDocument();
    expect(screen.getByTestId('the-vault')).toBeInTheDocument();
  });

  it('displays styling tip if available', () => {
    render(<PhotoFitting />);
    // We expect the first luxury item (Gucci Blazer) to have the tip we added
    expect(screen.getByText(/AI Stylist Note/i)).toBeInTheDocument();
    expect(screen.getByText(/Pair with tailored black trousers/i)).toBeInTheDocument();
  });

  it('calls addToVault when Save Look button is clicked', () => {
    render(<PhotoFitting />);
    const saveButton = screen.getByTitle('Save to Vault');
    fireEvent.click(saveButton);
    expect(mockAddToVault).toHaveBeenCalled();
  });

  it('toggles audio mute state', () => {
    render(<PhotoFitting />);
    // Initial state is muted=true, so button title is "Unmute Ambience"
    const audioButton = screen.getByTitle('Unmute Ambience');
    fireEvent.click(audioButton);
    expect(mockSetAudioMuted).toHaveBeenCalledWith(false);
  });

  it('opens the vault', () => {
    render(<PhotoFitting />);
    const vaultButton = screen.getByTitle('Open Vault');
    fireEvent.click(vaultButton);
    expect(mockSetVaultOpen).toHaveBeenCalledWith(true);
  });
});
