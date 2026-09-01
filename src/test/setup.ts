import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

/**
 * jsdom does not implement matchMedia, which `usePrefersReducedMotion` needs.
 * Default to "no preference" so components render their normal branch; tests
 * that care about reduced motion override this explicitly.
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }),
});

/** jsdom's scrollTo is a stub that warns; silence it for route-change tests. */
window.scrollTo = vi.fn();
