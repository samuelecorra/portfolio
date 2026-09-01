import type { JSX } from 'react';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { FindMe } from '@/sections/home/FindMe';
import { Hero } from '@/sections/home/Hero';
import { KnowledgePreview } from '@/sections/home/KnowledgePreview';
import { NowSection } from '@/sections/home/NowSection';
import { ProofOfWork } from '@/sections/home/ProofOfWork';

/**
 * Homepage order: identity → proof → knowledge → current focus → contact.
 * Evidence comes before biography, which is the point of the site.
 */
export function HomePage(): JSX.Element {
  useDocumentTitle();

  return (
    <>
      <Hero />
      <ProofOfWork />
      <KnowledgePreview />
      <NowSection />
      <FindMe />
    </>
  );
}
