import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Space_Grotesk: () => ({ style: { fontFamily: 'mocked' }, className: 'mocked', variable: '--mocked' }),
  Cinzel: () => ({ style: { fontFamily: 'mocked' }, className: 'mocked', variable: '--mocked' }),
  Geist: () => ({ style: { fontFamily: 'mocked' }, className: 'mocked', variable: '--mocked' }),
  Geist_Mono: () => ({ style: { fontFamily: 'mocked' }, className: 'mocked', variable: '--mocked' }),
}));
