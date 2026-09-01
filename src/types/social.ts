import type { IconName, Unconfirmed } from './common';

export type SocialPlatform = 'github' | 'linkedin' | 'youtube' | 'x' | 'instagram' | 'email';

export interface SocialLink {
  id: SocialPlatform;
  label: string;
  /** Display handle, e.g. '@samuelecorra'. */
  handle: Unconfirmed<string>;
  /**
   * `null` means the owner has not supplied this URL yet. Such entries are
   * filtered out of the UI rather than rendered as dead or invented links.
   */
  url: Unconfirmed<string>;
  icon: IconName;
  order: number;
}

/**
 * A social link that is known to have a destination.
 *
 * Produced by `getAvailableSocials()`. Carrying the narrowing in the type is
 * what lets the UI use `url` directly without a non-null assertion.
 */
export type AvailableSocialLink = SocialLink & { url: string };
