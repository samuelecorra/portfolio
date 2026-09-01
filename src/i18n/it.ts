import type { Dictionary } from './en';

export const it: Dictionary = {
  nav: {
    label: 'Principale',
    projects: 'Progetti',
    knowledge: 'Conoscenze',
    about: 'Chi sono',
    openMenu: 'Apri il menu',
    closeMenu: 'Chiudi il menu',
    language: 'Lingua',
    skipToContent: 'Vai al contenuto',
  },
  hero: {
    intro:
      'Un hub tecnico, non un CV: quello che costruisco, quello che studio e il materiale dietro a entrambi. Ogni affermazione qui rimanda a qualcosa che puoi leggere.',
    ctaWork: 'Esplora il mio lavoro',
    ctaGithub: 'GitHub',
  },
  work: {
    eyebrow: 'Prove concrete',
    title: 'Lavori selezionati',
    description:
      'Cose che costruisco o mantengo. Ognuna rimanda al lavoro stesso, non a una sua descrizione.',
    all: 'Tutti i progetti',
    indexTitle: 'Progetti',
    indexDescription: 'Tutto ciò che è pubblicato al momento, in ordine di rilevanza.',
    featured: 'In evidenza',
    technologies: 'Tecnologie',
    subjects: 'Materie trattate',
    back: 'Tutti i progetti',
    noCaseStudy: 'Non è ancora stato scritto un case study dettagliato per questo progetto.',
    status: 'Stato',
    period: 'Periodo',
    source: 'Sorgente',
    notSpecified: 'Non specificato',
  },
  status: {
    active: 'Attivo',
    'in-progress': 'In corso',
    maintained: 'Mantenuto',
    archived: 'Archiviato',
  },
  repository: {
    public: 'Repository pubblica',
    private: 'Repository privata',
    unpublished: 'Non ancora pubblicata',
  },
  knowledge: {
    eyebrow: 'Conoscenze',
    title: 'Quello che so davvero',
    description:
      'Competenze come argomenti concreti, non percentuali. Ogni affermazione rimanda a una prova.',
    all: 'Indice completo delle conoscenze',
    indexEyebrow: 'Indice delle conoscenze',
    indexTitle: 'Tre anni, per intero',
    indexDescription:
      'Il curriculum completo della mia laurea in cybersecurity, generato direttamente dall’archivio pubblico. Ogni materia rimanda al materiale stesso.',
    curriculumNote:
      'I conteggi sono generati dall’archivio in fase di build, mai scritti a mano — esegui npm run sync:archive per aggiornarli.',
    exploreArchive: 'Esplora l’archivio',
    viewInArchive: 'Apri nell’archivio',
    viewOnGithub: 'Vedi su GitHub',
    backToIndex: 'Tutte le materie',
    sourceLanguage: 'Il materiale del corso è in italiano.',
    contents: 'Contenuti',
    noStructure: 'Questa materia conserva il materiale come file, senza una struttura a moduli.',
  },
  metrics: {
    subjects: 'materie',
    modules: 'moduli',
    units: 'unità didattiche',
    lessons: 'lezioni',
    notes: 'appunti',
    pdfs: 'PDF',
    code: 'file di codice',
    files: 'file',
    directories: 'cartelle',
    years: 'anni',
  },
  now: {
    eyebrow: 'Ora',
    title: 'A cosa sto lavorando',
    description: 'Il focus attuale, volutamente breve e datato.',
    building: 'Sto costruendo',
    studying: 'Sto studiando',
    exploring: 'Sto esplorando',
    details: 'Dettagli',
    lastUpdated: 'Ultimo aggiornamento',
    moreAbout: 'Maggiori informazioni su',
  },
  findMe: {
    eyebrow: 'Dove trovarmi',
    title: 'Altrove',
    description: 'La storia professionale sta su LinkedIn. La parte tecnica sta qui e su GitHub.',
  },
  about: {
    title: 'Chi sono',
    principles: 'Principi',
    elsewhere: 'Altrove',
    elsewhereDescription: 'La storia professionale sta su LinkedIn. Samuele Corrà altrove:',
  },
  footer: {
    sourceOnGithub: 'Codice sorgente su GitHub',
    builtInPublic: 'Sviluppato in pubblico — repository in arrivo.',
  },
  notFound: {
    title: 'Pagina non trovata',
    description:
      'Questa rotta non esiste. Potrebbe essere stata rinominata o non essere mai stata pubblicata.',
    cta: 'Torna alla home',
  },
};
