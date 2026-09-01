import type { JSX } from 'react';
import { Route, Routes } from 'react-router';

import { RootLayout } from '@/components/layout/RootLayout';
import { AboutPage } from '@/pages/AboutPage';
import { HomePage } from '@/pages/HomePage';
import { KnowledgePage } from '@/pages/KnowledgePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { SubjectPage } from '@/pages/SubjectPage';

/**
 * Route table.
 *
 * Pages are imported eagerly on purpose. The whole site is a handful of small
 * components over static data; splitting it would add request waterfalls to
 * save a trivial amount of JS. Revisit when a route gains a heavy dependency —
 * `React.lazy` can be introduced here without touching anything else.
 */
export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="knowledge" element={<KnowledgePage />} />
        <Route path="knowledge/:slug" element={<SubjectPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
