import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { socials } from '@/data/socials';

import { SocialLinks } from './SocialLinks';

describe('SocialLinks', () => {
  it('renders exactly the socials that have a confirmed URL', () => {
    render(<SocialLinks />);

    const expected = socials.filter((social) => social.url !== null);
    expect(screen.getAllByRole('link')).toHaveLength(expected.length);
  });

  it('omits platforms whose URL is still unknown', () => {
    render(<SocialLinks />);

    for (const social of socials.filter((s) => s.url === null)) {
      expect(screen.queryByRole('link', { name: new RegExp(social.label, 'i') })).toBeNull();
    }
  });

  it('gives every rendered link an accessible name and safe rel', () => {
    render(<SocialLinks />);

    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAccessibleName();
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});
