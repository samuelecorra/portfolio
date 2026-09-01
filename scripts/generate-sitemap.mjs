#!/usr/bin/env node
/**
 * Post-build: writes dist/sitemap.xml and dist/robots.txt.
 *
 * Runs after `vite build` because it emits into dist/. The origin comes from
 * site.config.json, the same file that feeds index.html and src/data/site.ts,
 * so a domain change is a one-line edit.
 *
 * Route discovery, in order of reliability:
 *   - static routes: the router's top level, listed here
 *   - subjects: read from the generated archive index (real JSON)
 *   - projects: extracted from src/data/projects.ts
 *
 * Reading slugs out of a TypeScript file with a regex is the weak link, so the
 * script FAILS THE BUILD if the counts look wrong rather than silently shipping
 * a sitemap that is missing pages.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const { url: ORIGIN } = JSON.parse(readFileSync(resolve(root, 'site.config.json'), 'utf8'));
if (!ORIGIN || !ORIGIN.startsWith('https://')) {
  throw new Error(`site.config.json: expected an https origin, got ${String(ORIGIN)}`);
}

const STATIC_ROUTES = ['/', '/projects', '/knowledge', '/about'];

const MIN_PROJECTS = 4;
const MIN_SUBJECTS = 20;

function projectSlugs() {
  const source = readFileSync(resolve(root, 'src/data/projects.ts'), 'utf8');
  return [...source.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map((match) => match[1]);
}

function subjectSlugs() {
  const archive = JSON.parse(
    readFileSync(resolve(root, 'src/data/generated/archive.json'), 'utf8'),
  );
  return archive.years.flatMap((year) => year.subjects.map((subject) => subject.slug));
}

const projects = projectSlugs();
const subjects = subjectSlugs();

if (projects.length < MIN_PROJECTS) {
  throw new Error(
    `Found only ${projects.length} project slugs (expected >= ${MIN_PROJECTS}). ` +
      'The extraction in projectSlugs() has probably drifted from src/data/projects.ts — ' +
      'fix it rather than shipping an incomplete sitemap.',
  );
}
if (subjects.length < MIN_SUBJECTS) {
  throw new Error(
    `Found only ${subjects.length} subject slugs (expected >= ${MIN_SUBJECTS}). ` +
      'Run `npm run sync:archive` first.',
  );
}

const routes = [
  ...STATIC_ROUTES,
  ...projects.map((slug) => `/projects/${slug}`),
  ...subjects.map((slug) => `/knowledge/${slug}`),
];

const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) =>
      `  <url>\n    <loc>${ORIGIN}${route}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(root, 'dist/sitemap.xml'), sitemap);

const robots = `${readFileSync(resolve(root, 'public/robots.txt'), 'utf8').trimEnd()}\n`
  .replace(/# TODO\(domain\)[^\n]*\n/, '')
  .replace(/# Sitemap:[^\n]*\n?/, '')
  .trimEnd();

writeFileSync(resolve(root, 'dist/robots.txt'), `${robots}\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

process.stdout.write(
  `sitemap: ${routes.length} URLs (${STATIC_ROUTES.length} static, ${projects.length} projects, ${subjects.length} subjects) -> dist/sitemap.xml\n`,
);
