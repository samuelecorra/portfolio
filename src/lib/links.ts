/**
 * Link classification.
 *
 * Convention used throughout the data layer: an href beginning with '/' is an
 * internal route handled by the router; everything else leaves the site.
 */
export function isInternalHref(href: string): boolean {
  return href.startsWith('/');
}

export function isExternalHref(href: string): boolean {
  return !isInternalHref(href);
}

/** Attributes every outbound link should carry. */
export const externalLinkAttrs = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
