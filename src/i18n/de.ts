import type { Dictionary } from './en';

export const de: Dictionary = {
  nav: {
    label: 'Hauptnavigation',
    projects: 'Projekte',
    knowledge: 'Wissen',
    about: 'Über mich',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    language: 'Sprache',
    skipToContent: 'Zum Inhalt springen',
  },
  hero: {
    intro:
      'Ein technischer Hub statt eines Lebenslaufs: was ich baue, was ich lerne und das Material hinter beidem. Jede Aussage hier verweist auf etwas, das man nachlesen kann.',
    ctaWork: 'Meine Arbeit ansehen',
    ctaGithub: 'GitHub',
  },
  work: {
    eyebrow: 'Belegte Arbeit',
    title: 'Ausgewählte Arbeiten',
    description:
      'Dinge, die ich baue oder pflege. Jede verweist auf die Arbeit selbst, nicht auf eine Beschreibung davon.',
    all: 'Alle Projekte',
    indexTitle: 'Projekte',
    indexDescription: 'Alles, was derzeit veröffentlicht ist, nach Relevanz geordnet.',
    featured: 'Hervorgehoben',
    technologies: 'Technologien',
    subjects: 'Behandelte Fächer',
    back: 'Alle Projekte',
    noCaseStudy: 'Für dieses Projekt wurde noch keine ausführliche Fallstudie geschrieben.',
    status: 'Status',
    period: 'Zeitraum',
    source: 'Quelle',
    notSpecified: 'Nicht angegeben',
  },
  status: {
    active: 'Aktiv',
    'in-progress': 'In Arbeit',
    maintained: 'Gepflegt',
    archived: 'Archiviert',
  },
  repository: {
    public: 'Öffentliches Repository',
    private: 'Privates Repository',
    unpublished: 'Noch nicht veröffentlicht',
  },
  knowledge: {
    eyebrow: 'Wissen',
    title: 'Was ich wirklich kann',
    description:
      'Kompetenz als konkrete Themen statt Prozentzahlen. Jede Aussage verweist auf einen Beleg.',
    all: 'Vollständiger Wissensindex',
    indexEyebrow: 'Wissensindex',
    indexTitle: 'Drei Jahre, vollständig',
    indexDescription:
      'Das vollständige Curriculum meines Cybersecurity-Studiums, direkt aus dem öffentlichen Archiv generiert. Jedes Fach verweist auf das Material selbst.',
    curriculumNote:
      'Die Zahlen werden beim Build aus dem Archiv generiert und nie von Hand eingetragen — npm run sync:archive aktualisiert sie.',
    exploreArchive: 'Archiv erkunden',
    viewInArchive: 'Im Archiv öffnen',
    viewOnGithub: 'Auf GitHub ansehen',
    backToIndex: 'Alle Fächer',
    sourceLanguage: 'Das Kursmaterial ist auf Italienisch.',
    contents: 'Inhalt',
    noStructure: 'Dieses Fach speichert sein Material als Dateien ohne Modulstruktur.',
  },
  metrics: {
    subjects: 'Fächer',
    modules: 'Module',
    units: 'Lehreinheiten',
    lessons: 'Lektionen',
    notes: 'Notizen',
    pdfs: 'PDFs',
    code: 'Codedateien',
    files: 'Dateien',
    directories: 'Ordner',
    years: 'Jahre',
  },
  now: {
    eyebrow: 'Jetzt',
    title: 'Woran ich gerade arbeite',
    description: 'Aktueller Fokus, bewusst kurz und datiert.',
    building: 'Ich baue',
    studying: 'Ich lerne',
    exploring: 'Ich erkunde',
    details: 'Details',
    lastUpdated: 'Zuletzt aktualisiert',
    moreAbout: 'Mehr über',
  },
  findMe: {
    eyebrow: 'Kontakt',
    title: 'Anderswo',
    description:
      'Der berufliche Werdegang steht auf LinkedIn. Die technische Seite steht hier und auf GitHub.',
  },
  about: {
    title: 'Über mich',
    principles: 'Prinzipien',
    elsewhere: 'Anderswo',
    elsewhereDescription: 'Der berufliche Werdegang steht auf LinkedIn. Samuele Corrà anderswo:',
  },
  footer: {
    sourceOnGithub: 'Quellcode auf GitHub',
    builtInPublic: 'Öffentlich entwickelt — Repository folgt in Kürze.',
  },
  notFound: {
    title: 'Seite nicht gefunden',
    description:
      'Diese Route existiert nicht. Möglicherweise wurde sie umbenannt oder nie veröffentlicht.',
    cta: 'Zurück zur Startseite',
  },
};
