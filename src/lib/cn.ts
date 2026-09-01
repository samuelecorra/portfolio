export type ClassValue = string | false | null | undefined;

/**
 * Joins conditional class names.
 *
 * Deliberately ~5 lines instead of `clsx` + `tailwind-merge`. We do not build
 * class strings by merging conflicting utilities, so the conflict-resolution
 * half of that pair would be dead weight. Revisit only if a real conflict case
 * appears. See docs/ARCHITECTURE.md § Dependencies.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
