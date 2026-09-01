import { Menu, X } from 'lucide-react';
import { useState, type JSX } from 'react';
import { Link, NavLink } from 'react-router';

import { Container } from '@/components/layout/Container';
import { site } from '@/data/site';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';

import { LanguageSelect } from './LanguageSelect';
import { navItems } from './navItems';

function linkClasses({ isActive }: { isActive: boolean }): string {
  return cn(
    'block rounded-md px-3 py-2 text-sm transition-colors duration-(--duration-fast)',
    isActive ? 'text-accent' : 'text-ink-muted hover:text-ink',
  );
}

export function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useI18n();

  // Closed on navigation via the link handler rather than a route-change
  // effect: the click is the actual trigger, and it avoids a cascading render.
  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <Container>
        <nav aria-label={t.nav.label} className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            className="font-mono text-sm font-semibold tracking-tight text-ink hover:text-accent"
          >
            {site.name}
          </Link>

          <div className="flex items-center gap-2">
            {/* Desktop navigation */}
            <ul className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink to={item.href} className={linkClasses}>
                    {t.nav[item.labelKey]}
                  </NavLink>
                </li>
              ))}
            </ul>

            <LanguageSelect />

            {/* Mobile toggle */}
            <button
              type="button"
              className="rounded-md p-2 text-ink-muted hover:text-ink md:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => {
                setIsMenuOpen((open) => !open);
              }}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden focusable={false} />
              ) : (
                <Menu className="h-5 w-5" aria-hidden focusable={false} />
              )}
            </button>
          </div>
        </nav>

        {/*
         * Kept in the DOM and toggled with `hidden` so the expanded/collapsed
         * state maps cleanly onto aria-expanded.
         */}
        <ul id="mobile-menu" hidden={!isMenuOpen} className="border-t border-line py-2 md:hidden">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink to={item.href} className={linkClasses} onClick={closeMenu}>
                {t.nav[item.labelKey]}
              </NavLink>
            </li>
          ))}
        </ul>
      </Container>
    </header>
  );
}
