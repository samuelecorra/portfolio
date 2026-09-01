import type { JSX } from 'react';

import { Section } from '@/components/layout/Section';
import { SocialLinks } from '@/components/social/SocialLinks';
import { ActionLink } from '@/components/ui/ActionLink';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/data/site';

/**
 * Closing section. Replaces the earlier separate "Elsewhere" and "Contact"
 * sections, which rendered the same link list twice while no email was set.
 */
export function FindMe(): JSX.Element {
  return (
    <Section
      id="find-me"
      eyebrow="Find me"
      title="Elsewhere"
      description="Professional history lives on LinkedIn. The technical side lives here and on GitHub."
    >
      <div className="flex flex-wrap items-center gap-4">
        {site.email ? (
          <ActionLink href={`mailto:${site.email}`} emphasis="primary">
            <Icon name="mail" className="h-4 w-4" />
            {site.email}
          </ActionLink>
        ) : null}
        <SocialLinks />
      </div>
    </Section>
  );
}
