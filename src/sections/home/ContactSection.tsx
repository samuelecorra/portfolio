import type { JSX } from 'react';

import { Section } from '@/components/layout/Section';
import { SocialLinks } from '@/components/social/SocialLinks';
import { ActionLink } from '@/components/ui/ActionLink';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/data/site';

export function ContactSection(): JSX.Element {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Get in touch"
      description="Open to conversations about engineering, security and building products."
    >
      <div className="flex flex-wrap items-center gap-4">
        {/* Rendered only once a real address is confirmed in src/data/site.ts. */}
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
