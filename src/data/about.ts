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

/** How the work gets done. Owner's own words. These also govern this repository. */
export const principles: Principle[] = [
  {
    title: 'Build before claiming.',
    detail: 'Competence shows up as work that exists, not as adjectives.',
  },
  {
    title: 'Understand systems below the abstraction.',
    detail: 'Frameworks change; what the machine and the network are doing does not.',
  },
  {
    title: 'Document what I learn.',
    detail: 'Notes written for a future reader are how knowledge survives the exam.',
  },
  {
    title: 'Keep public work inspectable.',
    detail: 'If it is published, it should be readable — source, reasoning and all.',
  },
  {
    title: 'Prefer simple architectures until complexity earns its place.',
    detail: 'The obvious solution wins until it demonstrably cannot.',
  },
];
