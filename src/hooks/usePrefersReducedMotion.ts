import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener('change', onStoreChange);
  return () => {
    mediaQuery.removeEventListener('change', onStoreChange);
  };
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/** No window (SSR / pre-render): assume reduced motion — the calm default. */
function getServerSnapshot(): boolean {
  return true;
}

/**
 * Tracks the user's reduced-motion preference.
 *
 * Implemented with useSyncExternalStore rather than useState + useEffect:
 * matchMedia is an external store, so this reads correctly on first render
 * instead of flashing the animated branch for one frame.
 *
 * Components must gate JS-driven animation (Motion) on this — the CSS override
 * in `styles/index.css` cannot reach animation driven from JavaScript.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
