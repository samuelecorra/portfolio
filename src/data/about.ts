/**
 * About-page content.
 *
 * Kept in data rather than JSX so the owner can rewrite the copy without
 * touching components. The intro is placeholder-grade editorial copy built only
 * from confirmed facts — TODO(owner): replace with your own words.
 */
export const aboutIntro: string[] = [
  'I work across security and software engineering: studying how systems break, and building things that hold up.',
  'This site is a hub rather than a CV. Traditional professional history lives on LinkedIn; what you find here is the technical side — what I build, what I study, and the material that backs it up.',
];

export interface Principle {
  title: string;
  detail: string;
}

/** How the work gets done. These also govern this repository. */
export const principles: Principle[] = [
  {
    title: 'Evidence before claims',
    detail: 'Anything asserted here links to work you can inspect.',
  },
  {
    title: 'Simple before clever',
    detail: 'The obvious solution wins until it demonstrably cannot.',
  },
  {
    title: 'Data-driven before hardcoded',
    detail: 'Content lives in data; components only render it.',
  },
  {
    title: 'Accessibility before gimmicks',
    detail: 'Keyboard, contrast and reduced motion are requirements, not polish.',
  },
  {
    title: 'Performance before decoration',
    detail: 'Animation earns its bytes or it does not ship.',
  },
  {
    title: 'Built in public',
    detail: 'The source of this site is part of the portfolio it presents.',
  },
];
