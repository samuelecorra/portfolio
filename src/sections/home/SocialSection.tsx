import type { JSX } from 'react';

import { Section } from '@/components/layout/Section';
import { SocialLinks } from '@/components/social/SocialLinks';

export function SocialSection(): JSX.Element {
  return (
    <Section id="elsewhere" eyebrow="Elsewhere" title="Find me online">
      <SocialLinks />
    </Section>
  );
}
