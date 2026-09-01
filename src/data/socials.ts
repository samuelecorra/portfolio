import type { AvailableSocialLink, SocialLink } from '@/types';

/**
 * Profile links.
 *
 * Entries with `url: null` are NOT rendered — see `getAvailableSocials`.
 * URLs are never guessed; the owner fills them in here and the UI follows.
 */
export const socials: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@samuelecorra',
    url: 'https://github.com/samuelecorra',
    icon: 'github',
    order: 1,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: null,
    // TODO(owner): add LinkedIn profile URL.
    url: null,
    icon: 'linkedin',
    order: 2,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    handle: null,
    // TODO(owner): add YouTube channel URL.
    url: null,
    icon: 'youtube',
    order: 3,
  },
  {
    id: 'x',
    label: 'X',
    handle: null,
    // TODO(owner): add X / Twitter profile URL.
    url: null,
    icon: 'x',
    order: 4,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: null,
    // TODO(owner): add Instagram profile URL.
    url: null,
    icon: 'instagram',
    order: 5,
  },
];

/** Socials that actually have a destination, in display order. */
export function getAvailableSocials(): AvailableSocialLink[] {
  return socials
    .filter((social): social is AvailableSocialLink => social.url !== null)
    .sort((a, b) => a.order - b.order);
}
