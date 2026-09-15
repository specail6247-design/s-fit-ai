import '@testing-library/jest-dom';

import { vi } from 'vitest';
vi.mock('next/font/google', () => ({
  Cinzel: () => ({
    style: { fontFamily: 'mocked' },
    className: 'mocked-cinzel',
  }),
}));
