import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RealLifeFitting from '@/components/RealLifeFitting';
import * as useStoreModule from '@/store/useStore';

// Mock Three.js canvas components to avoid WebGL errors in happy-dom
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useFrame: vi.fn(),
  useLoader: vi.fn(),
}));

vi.mock('@react-three/drei', () => ({
  Environment: () => null,
  OrbitControls: () => null,
  useGLTF: vi.fn(() => ({
    scene: { clone: () => ({}) },
    animations: [],
  })),
  useAnimations: vi.fn(() => ({
    actions: {},
  })),
  ContactShadows: () => null,
}));

// Mock Three.js
vi.mock('three', () => ({
  Group: class {},
  Vector3: class {},
}));

describe('RealLifeFitting', () => {
  const setSupportHubOpen = vi.fn();
  const setLegalModalOpen = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock useStore hook
    vi.spyOn(useStoreModule, 'useStore').mockReturnValue({
      setSupportHubOpen,
      setLegalModalOpen,
    } as unknown as ReturnType<typeof useStoreModule.useStore>);
  });

  it('renders the Night City UI structure', () => {
    render(<RealLifeFitting />);
    
    // Check for Main Header
    expect(screen.getByText(/S_FIT/i)).toBeInTheDocument();
    expect(screen.getByText(/NEO/i)).toBeInTheDocument();
    
    // Check for Sections
    expect(screen.getByText(/01. Identification/i)).toBeInTheDocument();
    expect(screen.getByText(/02. Target Garment/i)).toBeInTheDocument();
    
    // Check for CTA
    expect(screen.getByText(/TRY IT ON/i)).toBeInTheDocument();
  });

  it('renders Trust & Growth elements (Phase 6)', () => {
    render(<RealLifeFitting />);

    // Data Safety Badge
    const badge = screen.getByText(/Securely Processed/i);
    expect(badge).toBeInTheDocument();
    // Check if the parent (the badge container) has the title
    // The closest div with the title attribute
    const badgeContainer = badge.closest('div[title]');
    expect(badgeContainer).toHaveAttribute('title', 'Photos are processed securely and not shared.');

    // Help Button
    const helpBtn = screen.getByText(/HELP/i);
    expect(helpBtn).toBeInTheDocument();
    fireEvent.click(helpBtn);
    expect(setSupportHubOpen).toHaveBeenCalledWith(true);

    // Privacy & Terms Button
    const privacyBtn = screen.getByText(/Privacy & Terms/i);
    expect(privacyBtn).toBeInTheDocument();
    fireEvent.click(privacyBtn);
    expect(setLegalModalOpen).toHaveBeenCalledWith(true);
  });
});
