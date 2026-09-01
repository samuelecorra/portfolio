import type { JSX } from 'react';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ContactSection } from '@/sections/home/ContactSection';
import { Hero } from '@/sections/home/Hero';
import { KnowledgePreview } from '@/sections/home/KnowledgePreview';
import { NowSection } from '@/sections/home/NowSection';
import { ProofOfWork } from '@/sections/home/ProofOfWork';
import { SocialSection } from '@/sections/home/SocialSection';

export function HomePage(): JSX.Element {
  useDocumentTitle();

  return (
    <>
      <Hero />
      <SocialSection />
      <ProofOfWork />
      <KnowledgePreview />
      <NowSection />
      <ContactSection />
    </>
  );
}
