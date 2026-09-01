import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vitest/config';

import siteConfig from './site.config.json';

/**
 * Replaces %SITE_URL% in index.html with the deployed origin.
 *
 * Crawlers do not execute JavaScript, so canonical and OpenGraph URLs have to
 * be absolute in the static HTML. This keeps the origin defined once in
 * site.config.json instead of duplicated into markup.
 */
function siteUrlPlugin(): Plugin {
  return {
    name: 'inject-site-url',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', siteConfig.url);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    /*
     * Baseline is ~300 kB raw / ~95 kB gzip: React, Router, three i18n
     * dictionaries and the archive summary. Per-subject curriculum trees are
     * separate lazy chunks and do not count against this.
     * The limit sits just above the baseline so the warning means "you
     * regressed", not "this is a normal build" — one that always fires is
     * ignored.
     */
    chunkSizeWarningLimit: 330,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.{test,spec}.{ts,tsx}', 'src/test/**', 'src/main.tsx'],
    },
  },
});
