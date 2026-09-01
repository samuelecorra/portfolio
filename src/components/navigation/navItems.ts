export interface NavItem {
  label: string;
  href: string;
}

/** Primary navigation. Adding a top-level route means adding one entry here. */
export const navItems: NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Knowledge', href: '/knowledge' },
  { label: 'About', href: '/about' },
];
