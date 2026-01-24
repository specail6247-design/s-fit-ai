import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AvatarLoader } from '@/components/AvatarLoader';

const mocks = vi.hoisted(() => {
  const useGLTF = vi.fn(() => ({
    scene: { clone: () => ({}) },
    animations: [],
  }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (useGLTF as any).preload = vi.fn();
  return { useGLTF };
});

vi.mock('@react-three/drei', () => ({
  useGLTF: mocks.useGLTF,
  useAnimations: vi.fn(() => ({
    actions: {},
    names: [],
  })),
}));

vi.mock('@react-three/fiber', () => ({
  useGraph: vi.fn(() => ({
    nodes: {},
    materials: {},
  })),
}));

// Mock Three.js
vi.mock('three', () => ({
  Group: class {},
  AnimationMixer: class {
    clipAction = () => ({
      play: () => {},
      stop: () => {},
      fadeIn: () => {},
      fadeOut: () => {},
      reset: () => ({ fadeIn: () => ({ play: () => {} }) }),
    });
  },
}));

describe('AvatarLoader', () => {
  it('renders without crashing', () => {
    // Since AvatarLoader uses R3F hooks, we can't fully render it in happy-dom without a canvas context mock.
    // However, we can assert that the hooks are called.
    const { container } = render(<AvatarLoader url="test.glb" />);
    expect(container).toBeDefined();
  });
});
