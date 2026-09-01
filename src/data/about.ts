import type { LocalizedList, LocalizedText } from '@/i18n';

/**
 * About-page content.
 *
 * Kept in data rather than JSX so the copy can be rewritten without touching
 * components. TODO(owner): replace the intro with your own words.
 */
export const aboutIntro: LocalizedList = {
  en: [
    'I work across security and software engineering: studying how systems break, and building things that hold up.',
    'This site is a hub rather than a CV. Traditional professional history lives on LinkedIn; what you find here is the technical side — what I build, what I study, and the material that backs it up.',
  ],
  it: [
    'Lavoro tra sicurezza e ingegneria del software: studio come i sistemi si rompono e costruisco cose che reggono.',
    'Questo sito è un hub, non un CV. La storia professionale tradizionale sta su LinkedIn; qui trovi la parte tecnica — quello che costruisco, quello che studio e il materiale che lo dimostra.',
  ],
  de: [
    'Ich arbeite zwischen Sicherheit und Software Engineering: Ich untersuche, wie Systeme brechen, und baue Dinge, die halten.',
    'Diese Seite ist ein Hub, kein Lebenslauf. Der klassische berufliche Werdegang steht auf LinkedIn; hier findest du die technische Seite — was ich baue, was ich lerne und das Material, das es belegt.',
  ],
};

export interface Principle {
  title: LocalizedText;
  detail: LocalizedText;
}

/** How the work gets done. Owner's own words. These also govern this repository. */
export const principles: Principle[] = [
  {
    title: {
      en: 'Build before claiming.',
      it: 'Costruisci prima di affermare.',
      de: 'Bauen, bevor man behauptet.',
    },
    detail: {
      en: 'Competence shows up as work that exists, not as adjectives.',
      it: 'La competenza si vede in lavoro che esiste, non in aggettivi.',
      de: 'Kompetenz zeigt sich in vorhandener Arbeit, nicht in Adjektiven.',
    },
  },
  {
    title: {
      en: 'Understand systems below the abstraction.',
      it: 'Capisci i sistemi sotto l’astrazione.',
      de: 'Systeme unterhalb der Abstraktion verstehen.',
    },
    detail: {
      en: 'Frameworks change; what the machine and the network are doing does not.',
      it: 'I framework cambiano; quello che fanno la macchina e la rete no.',
      de: 'Frameworks ändern sich; was Maschine und Netzwerk tun, nicht.',
    },
  },
  {
    title: {
      en: 'Document what I learn.',
      it: 'Documenta quello che impari.',
      de: 'Dokumentieren, was ich lerne.',
    },
    detail: {
      en: 'Notes written for a future reader are how knowledge survives the exam.',
      it: 'Gli appunti scritti per un lettore futuro sono ciò che fa sopravvivere la conoscenza all’esame.',
      de: 'Notizen für künftige Leser sind der Grund, warum Wissen die Prüfung überlebt.',
    },
  },
  {
    title: {
      en: 'Keep public work inspectable.',
      it: 'Tieni il lavoro pubblico ispezionabile.',
      de: 'Öffentliche Arbeit einsehbar halten.',
    },
    detail: {
      en: 'If it is published, it should be readable — source, reasoning and all.',
      it: 'Se è pubblicato, deve essere leggibile — sorgente, ragionamento e tutto il resto.',
      de: 'Was veröffentlicht ist, sollte lesbar sein — Quellcode, Begründung und alles.',
    },
  },
  {
    title: {
      en: 'Prefer simple architectures until complexity earns its place.',
      it: 'Preferisci architetture semplici finché la complessità non si guadagna il posto.',
      de: 'Einfache Architekturen bevorzugen, bis Komplexität sich ihren Platz verdient.',
    },
    detail: {
      en: 'The obvious solution wins until it demonstrably cannot.',
      it: 'La soluzione ovvia vince finché non si dimostra insufficiente.',
      de: 'Die offensichtliche Lösung gewinnt, bis sie nachweislich nicht mehr reicht.',
    },
  },
];
