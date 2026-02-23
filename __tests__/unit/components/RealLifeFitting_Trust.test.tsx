import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RealLifeFitting from '@/components/RealLifeFitting';

// Mock store
const mockSetShowPrivacyModal = vi.fn();
const mockSetShowSupportHub = vi.fn();

vi.mock('@/store/useStore', () => ({
  useStore: () => ({
    setShowPrivacyModal: mockSetShowPrivacyModal,
    setShowSupportHub: mockSetShowSupportHub,
  }),
}));

// Mock Three.js (same as existing test)
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

vi.mock('three', () => ({
  Group: class {},
  Vector3: class {},
}));

// Mock dynamic import
vi.mock('next/dynamic', () => ({
  default: () => () => <div>AvatarCanvas Mock</div>,
}));

describe('RealLifeFitting Trust & Support', () => {
  it('renders trust and support elements', () => {
    render(<RealLifeFitting />);

    // Support Trigger (Header)
    expect(screen.getByTitle('Support Hub')).toBeInTheDocument();

    // Data Safety Badge
    expect(screen.getByText('Privacy Protected')).toBeInTheDocument();

    // Privacy Trigger
    expect(screen.getByText('Privacy Policy & Terms')).toBeInTheDocument();
  });

  it('opens Support Hub when clicked', () => {
    render(<RealLifeFitting />);
    const supportBtn = screen.getByTitle('Support Hub');
    fireEvent.click(supportBtn);
    expect(mockSetShowSupportHub).toHaveBeenCalledWith(true);
  });

  it('opens Privacy Modal when clicked', () => {
    render(<RealLifeFitting />);
    const privacyBtn = screen.getByText('Privacy Policy & Terms');
    fireEvent.click(privacyBtn);
    expect(mockSetShowPrivacyModal).toHaveBeenCalledWith(true);
  });
});
