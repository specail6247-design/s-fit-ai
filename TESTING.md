# S_FIT AI - Testing Documentation

This document outlines the testing strategy, tools, and procedures for the S_FIT AI project.

## 🛠 Tools

- **Unit Testing**: [Vitest](https://vitest.dev/)
- **E2E Testing**: [Playwright](https://playwright.dev/)
- **Test Environment**: JSDOM
- **CI/CD**: GitHub Actions

## 🧪 Unit Tests

Unit tests are located in `__tests__/unit/`. They cover utility functions, hooks, and services.

### Running Unit Tests

```bash
# Run all unit tests
npm run test:unit

# Run with coverage
npm run test:coverage
```

### Coverage Requirements
- Minimum 80% coverage is targeted for utility libraries (`lib/`).

## 🎭 End-to-End (E2E) Tests

E2E tests are located in `tests/e2e/`. They verify critical user flows and UI components.

### Running E2E Tests

```bash
# Run all E2E tests (headless)
npx playwright test

# Run E2E tests with UI
npx playwright test --ui

# View latest report
npx playwright show-report
```

## 🚀 CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment.

### `.github/workflows/ci.yml`
Runs on every push and pull request to `main`.
- Lints code
- Checks types
- Runs unit tests
- Runs E2E tests
- Uploads coverage reports

### `.github/workflows/deploy.yml`
Runs on push to `main` (after merge).
- Builds the application
- (Mock) Runs Lighthouse performance checks
- (Mock) Deploys to Vercel

## 📝 Writing Tests

### Unit Tests
Use `vitest` and `@testing-library/react`.

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### E2E Tests
Use `playwright`.

```typescript
import { test, expect } from '@playwright/test';

test('basic flow', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/S_FIT/);
});
```
