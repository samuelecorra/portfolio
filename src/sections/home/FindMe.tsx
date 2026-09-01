import type { JSX } from 'react';

import { Section } from '@/components/layout/Section';
import { SocialLinks } from '@/components/social/SocialLinks';
import { ActionLink } from '@/components/ui/ActionLink';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/data/site';
import { useI18n } from '@/i18n';

/**
 * Closing section. Replaces the earlier separate "Elsewhere" and "Contact"
 * sections, which rendered the same link list twice while no email was set.
 */
export function FindMe(): JSX.Element {
  const { t } = useI18n();

  return (
    <Section
      id="find-me"
      eyebrow={t.findMe.eyebrow}
      title={t.findMe.title}
      description={t.findMe.description}
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
