import type { LocalizedText } from '@/i18n';

/**
 * Descrizioni sintetiche delle materie, usate sulle card di /knowledge.
 *
 * Scritte a partire dalla struttura reale dell'archivio — moduli, unità
 * didattiche e titoli delle singole lezioni — non da conoscenza generica sulla
 * materia. Se un argomento è nominato qui, esiste una lezione che lo tratta.
 *
 * L'italiano è la lingua sorgente: il materiale è in italiano e questi testi
 * nascono da lì. Inglese e tedesco sono traduzioni.
 *
 * Il testo lungo per la pagina di dettaglio sta in `subjectEssays.ts`, caricato
 * in lazy perché serve solo su /knowledge/:slug.
 */
export const subjectSummaries: Record<string, LocalizedText> = {
  // ─────────────────────────── PRIMO ANNO ───────────────────────────
  'anno1-analisi-1': {
    it: 'Dal ripasso della matematica liceale fino agli integrali impropri: successioni e serie, limiti e continuità, calcolo differenziale e integrale. Include cardinalità degli infiniti, numeri complessi e studio di funzione completo.',
    en: 'From secondary-school revision through to improper integrals: sequences and series, limits and continuity, differential and integral calculus. Includes cardinality of infinities, complex numbers and full curve sketching.',
    de: 'Von der Wiederholung der Schulmathematik bis zu uneigentlichen Integralen: Folgen und Reihen, Grenzwerte und Stetigkeit, Differential- und Integralrechnung. Dazu Mächtigkeit des Unendlichen, komplexe Zahlen und vollständige Kurvendiskussion.',
  },
  'anno1-architettura-elaboratori': {
    it: 'Come una macchina esegue davvero il codice: rappresentazione dell’informazione, algebra booleana e porte logiche, linguaggio macchina e assembly LC-2, gestione di I/O e interrupt, struttura della CPU, memoria cache e pipeline.',
    en: 'How a machine actually executes code: information representation, Boolean algebra and logic gates, LC-2 machine language and assembly, I/O and interrupt handling, CPU structure, cache memory and pipelining.',
    de: 'Wie eine Maschine Code tatsächlich ausführt: Informationsdarstellung, boolesche Algebra und Logikgatter, LC-2-Maschinensprache und Assembler, I/O- und Interrupt-Behandlung, CPU-Aufbau, Cache-Speicher und Pipelining.',
  },
  'anno1-matematica-discreta': {
    it: 'Le fondamenta algebriche su cui poggia la crittografia: aritmetica modulare, congruenze e teorema cinese del resto, gruppi, anelli e campi, poi algebra lineare completa fino ad autovalori e diagonalizzazione.',
    en: 'The algebraic groundwork cryptography rests on: modular arithmetic, congruences and the Chinese remainder theorem, groups, rings and fields, then linear algebra through to eigenvalues and diagonalisation.',
    de: 'Die algebraischen Grundlagen der Kryptographie: modulare Arithmetik, Kongruenzen und chinesischer Restsatz, Gruppen, Ringe und Körper, danach lineare Algebra bis zu Eigenwerten und Diagonalisierung.',
  },
  'anno1-programmazione': {
    it: 'Due linguaggi imparati scrivendo codice, non leggendone: C dai fondamenti a puntatori, allocazione dinamica e file, e Java fino alla programmazione a oggetti completa. Oltre 300 file di codice fra teoria ed esercizi svolti.',
    en: 'Two languages learned by writing code rather than reading about it: C from fundamentals through pointers, dynamic allocation and files, and Java through to full object-oriented programming. Over 300 source files across theory and solved exercises.',
    de: 'Zwei Sprachen, erlernt durch Schreiben von Code statt Lesen darüber: C von den Grundlagen über Zeiger, dynamische Speicherverwaltung und Dateien, sowie Java bis zur vollständigen objektorientierten Programmierung. Über 300 Quelldateien aus Theorie und gelösten Übungen.',
  },
  'anno1-diritto-penale-informatico': {
    it: 'Il quadro penalistico dei reati informatici: funzioni e limiti del diritto penale, struttura del reato e della sanzione, poi le fattispecie specifiche — frodi informatiche, accesso abusivo a sistema informatico, danneggiamento.',
    en: 'The criminal-law framework around computer crime: the functions and limits of criminal law, the structure of an offence and its sanction, then the specific offences — computer fraud, unauthorised system access, and damage to systems.',
    de: 'Der strafrechtliche Rahmen der Computerkriminalität: Funktionen und Grenzen des Strafrechts, Aufbau von Straftat und Sanktion, danach die einzelnen Tatbestände — Computerbetrug, unbefugter Systemzugriff und Datenbeschädigung.',
  },
  'anno1-programmazione-web-mobile': {
    it: 'Quattro corsi completi sullo sviluppo front-end: HTML5 semantico e accessibile, CSS3 dai selettori ai layout Grid e Flexbox, JavaScript dal DOM all’asincrono e all’ecosistema moderno, più Bootstrap. Con accessibilità, performance e SEO trattate come argomenti a sé.',
    en: 'Four complete front-end courses: semantic and accessible HTML5, CSS3 from selectors through Grid and Flexbox layouts, JavaScript from the DOM to async and the modern ecosystem, plus Bootstrap. Accessibility, performance and SEO are treated as subjects in their own right.',
    de: 'Vier vollständige Frontend-Kurse: semantisches und barrierefreies HTML5, CSS3 von Selektoren bis zu Grid- und Flexbox-Layouts, JavaScript vom DOM über Asynchronität bis zum modernen Ökosystem, dazu Bootstrap. Barrierefreiheit, Performance und SEO als eigenständige Themen.',
  },
  'anno1-aspetti-organizzativi-gestionali-cybersec': {
    it: 'La sicurezza vista dal lato dell’organizzazione: storia delle reti e origine della minaccia, valore degli asset aziendali, standard ISO/IEC 27000 e NIST CSF, quadro normativo europeo (GDPR, NIS 2, Cybersecurity Act) e ruoli di CIO e CISO.',
    en: 'Security seen from the organisation’s side: the history of networks and the origin of the threat, the value of corporate assets, ISO/IEC 27000 and NIST CSF standards, the European regulatory frame (GDPR, NIS 2, Cybersecurity Act) and the CIO and CISO roles.',
    de: 'Sicherheit aus Sicht der Organisation: Geschichte der Netze und Ursprung der Bedrohung, Wert von Unternehmenswerten, Standards ISO/IEC 27000 und NIST CSF, europäischer Rechtsrahmen (DSGVO, NIS 2, Cybersecurity Act) sowie die Rollen von CIO und CISO.',
  },

  // ─────────────────────────── SECONDO ANNO ───────────────────────────
  'anno2-algoritmi-e-strutture-dati': {
    it: 'Strutture dati e tecniche algoritmiche: liste, pile, code, alberi, heap, grafi, tabelle hash e alberi bilanciati, poi divide et impera, greedy, backtracking e programmazione dinamica, fino alle classi P e NP.',
    en: 'Data structures and algorithmic techniques: lists, stacks, queues, trees, heaps, graphs, hash tables and balanced trees, then divide and conquer, greedy, backtracking and dynamic programming, through to the classes P and NP.',
    de: 'Datenstrukturen und algorithmische Techniken: Listen, Stapel, Warteschlangen, Bäume, Heaps, Graphen, Hashtabellen und balancierte Bäume, danach Teile und herrsche, Greedy, Backtracking und dynamische Programmierung bis zu den Klassen P und NP.',
  },
  'anno2-sistemi-operativi-1': {
    it: 'Processi e concorrenza: architettura del calcolatore e dei sistemi operativi, ciclo di vita dei processi e dei thread, politiche di schedulazione, comunicazione fra processi, semafori e monitor, fino alla trattazione completa del deadlock.',
    en: 'Processes and concurrency: computer and operating-system architecture, the life cycle of processes and threads, scheduling policies, inter-process communication, semaphores and monitors, through to a full treatment of deadlock.',
    de: 'Prozesse und Nebenläufigkeit: Rechner- und Betriebssystemarchitektur, Lebenszyklus von Prozessen und Threads, Scheduling-Strategien, Interprozesskommunikation, Semaphore und Monitore bis zur vollständigen Behandlung von Deadlocks.',
  },
  'anno2-sistemi-operativi-2': {
    it: 'Memoria, I/O e sistemi distribuiti: paginazione e segmentazione, memoria virtuale e thrashing, schedulazione del disco e RAID, realizzazione del file system e protezione, poi RPC, coordinamento distribuito e file system distribuiti.',
    en: 'Memory, I/O and distributed systems: paging and segmentation, virtual memory and thrashing, disk scheduling and RAID, file-system implementation and protection, then RPC, distributed coordination and distributed file systems.',
    de: 'Speicher, I/O und verteilte Systeme: Paging und Segmentierung, virtueller Speicher und Thrashing, Festplatten-Scheduling und RAID, Dateisystem-Implementierung und Schutz, danach RPC, verteilte Koordination und verteilte Dateisysteme.',
  },
  'anno2-basi-di-dati': {
    it: 'Il percorso completo di un sistema informativo: modello e algebra relazionale, SQL, progettazione concettuale E-R e traduzione logica, organizzazione fisica con B-tree, transazioni, serializzabilità e recovery, basi di dati distribuite, XML, trigger e data warehouse.',
    en: 'The full arc of an information system: the relational model and algebra, SQL, conceptual E-R design and logical translation, physical organisation with B-trees, transactions, serialisability and recovery, distributed databases, XML, triggers and data warehousing.',
    de: 'Der gesamte Weg eines Informationssystems: relationales Modell und Algebra, SQL, konzeptioneller E-R-Entwurf und logische Übersetzung, physische Organisation mit B-Bäumen, Transaktionen, Serialisierbarkeit und Recovery, verteilte Datenbanken, XML, Trigger und Data Warehouse.',
  },
  'anno2-reti-di-calcolatori': {
    it: 'Dallo strato fisico alle applicazioni: segnali e multiplexing, Ethernet, VLAN e spanning tree, IP e subnetting, ARP, DHCP e NAT, controllo di flusso e congestione TCP, routing OSPF e BGP, IPv6 e IPsec, DNS, HTTP e SMTP, con programmazione socket e un router IPv4 scritto in C.',
    en: 'From the physical layer to applications: signals and multiplexing, Ethernet, VLANs and spanning tree, IP and subnetting, ARP, DHCP and NAT, TCP flow and congestion control, OSPF and BGP routing, IPv6 and IPsec, DNS, HTTP and SMTP — with socket programming and an IPv4 router written in C.',
    de: 'Von der Bitübertragungsschicht bis zu den Anwendungen: Signale und Multiplexing, Ethernet, VLANs und Spanning Tree, IP und Subnetting, ARP, DHCP und NAT, TCP-Fluss- und Überlastkontrolle, OSPF- und BGP-Routing, IPv6 und IPsec, DNS, HTTP und SMTP — mit Socket-Programmierung und einem in C geschriebenen IPv4-Router.',
  },
  'anno2-crittografia': {
    it: 'Dai cifrari classici alla crittografia moderna: sostituzione e Vigenère con relativa crittoanalisi, DES e AES, RSA, El-Gamal e curve ellittiche, funzioni hash, MAC e HMAC, firme digitali DSS, Diffie-Hellman, PKI e X.509, secret sharing di Shamir.',
    en: 'From classical ciphers to modern cryptography: substitution and Vigenère with their cryptanalysis, DES and AES, RSA, El-Gamal and elliptic curves, hash functions, MAC and HMAC, DSS digital signatures, Diffie-Hellman, PKI and X.509, Shamir secret sharing.',
    de: 'Von klassischen Chiffren zur modernen Kryptographie: Substitution und Vigenère samt Kryptoanalyse, DES und AES, RSA, El-Gamal und elliptische Kurven, Hashfunktionen, MAC und HMAC, digitale DSS-Signaturen, Diffie-Hellman, PKI und X.509, Shamirs Secret Sharing.',
  },
  'anno2-statistica-e-analisi-dei-dati': {
    it: 'Probabilità e inferenza con taglio applicativo: assiomi e probabilità condizionata, teorema di Bayes e aggiornamento iterativo, variabili aleatorie e distribuzioni notevoli, teorema del limite centrale, statistica descrittiva e stima, con applicazioni ricorrenti all’affidabilità dei sistemi.',
    en: 'Probability and inference with an applied slant: axioms and conditional probability, Bayes’ theorem and iterative updating, random variables and the standard distributions, the central limit theorem, descriptive statistics and estimation — with recurring applications to system reliability.',
    de: 'Wahrscheinlichkeit und Inferenz mit Anwendungsbezug: Axiome und bedingte Wahrscheinlichkeit, Satz von Bayes und iterative Aktualisierung, Zufallsvariablen und wichtige Verteilungen, zentraler Grenzwertsatz, deskriptive Statistik und Schätzung — mit wiederkehrenden Anwendungen auf Systemzuverlässigkeit.',
  },

  // ─────────────────────────── TERZO ANNO ───────────────────────────
  'anno3-computer-forensics': {
    it: 'Il reperto informatico come prova: attendibilità del dato, metodologia forense, catena di custodia dalla raccolta alla presentazione in dibattimento, file system, shell scripting Linux e strumenti di disk forensics, con casi giudiziari reali.',
    en: 'Digital evidence as legal proof: data reliability, forensic methodology, chain of custody from seizure to courtroom presentation, file systems, Linux shell scripting and disk-forensics tooling, worked through real court cases.',
    de: 'Digitale Spuren als Beweismittel: Verlässlichkeit der Daten, forensische Methodik, Beweiskette von der Sicherstellung bis zur Präsentation vor Gericht, Dateisysteme, Linux-Shell-Scripting und Disk-Forensik-Werkzeuge, anhand realer Gerichtsfälle.',
  },
  'anno3-sicurezza-sistemi-e-reti': {
    it: 'Attacco e difesa in pratica: malware e contromisure, autenticazione e controllo degli accessi MAC/DAC su Windows e Linux, vulnerabilità di TCP/IP con ARP e IP spoofing, SYN flooding e session hijacking, TLS e i suoi attacchi, firewall, iptables e IDS — con laboratori SEED, Wireshark e programmi Set-UID.',
    en: 'Attack and defence in practice: malware and countermeasures, authentication and MAC/DAC access control on Windows and Linux, TCP/IP vulnerabilities including ARP and IP spoofing, SYN flooding and session hijacking, TLS and its attacks, firewalls, iptables and IDS — with SEED labs, Wireshark and Set-UID programs.',
    de: 'Angriff und Verteidigung in der Praxis: Malware und Gegenmaßnahmen, Authentifizierung und MAC/DAC-Zugriffskontrolle unter Windows und Linux, TCP/IP-Schwachstellen mit ARP- und IP-Spoofing, SYN-Flooding und Session Hijacking, TLS und seine Angriffe, Firewalls, iptables und IDS — mit SEED-Laboren, Wireshark und Set-UID-Programmen.',
  },
  'anno3-aspetti-etici-legali-sociali-ed-economici-dell-informatica': {
    it: 'Il contesto non tecnico del software: struttura dei mercati e delle imprese, analisi dei costi e valutazione degli investimenti, project management, etica informatica e metodo per affrontare i dilemmi, proprietà intellettuale e privacy, diritti di cittadinanza digitale e software libero.',
    en: 'The non-technical context around software: market and firm structure, cost analysis and investment appraisal, project management, computing ethics and a method for working through dilemmas, intellectual property and privacy, digital citizenship rights and free software.',
    de: 'Der nichttechnische Kontext von Software: Markt- und Unternehmensstrukturen, Kostenanalyse und Investitionsbewertung, Projektmanagement, Informatikethik und eine Methode für ethische Dilemmata, geistiges Eigentum und Privatsphäre, digitale Bürgerrechte und freie Software.',
  },
  'anno3-gestione-della-sicurezza-nei-sistemi-informativi': {
    it: 'Dove sicurezza e diritto si incontrano: processo penale e civile e mezzi di prova, valore probatorio del documento informatico e firme elettroniche, D.Lgs. 231/2001 e controllo dei lavoratori, standard ISO/IEC 27037, 27035 e 27043, risk assessment, incident response e forensic readiness.',
    en: 'Where security meets law: criminal and civil procedure and means of proof, the evidential value of electronic documents and signatures, Italian Legislative Decree 231/2001 and worker monitoring, ISO/IEC 27037, 27035 and 27043, risk assessment, incident response and forensic readiness.',
    de: 'Wo Sicherheit auf Recht trifft: Straf- und Zivilverfahren und Beweismittel, Beweiswert elektronischer Dokumente und Signaturen, italienisches Gesetzesdekret 231/2001 und Arbeitnehmerüberwachung, ISO/IEC 27037, 27035 und 27043, Risikobewertung, Incident Response und Forensic Readiness.',
  },
  'anno3-progettazione-di-software-sicuro': {
    it: 'Costruire software che regge: proprietà del software sicuro e ciclo di vulnerabilità, principi di architettura sicura e Java Sandbox, specifica con macchine a stati finiti e UML, Design by Contract con JML, sicurezza dei tipi e violazioni in C, testing e criteri di copertura fino a MC/DC con JUnit.',
    en: 'Building software that holds: properties of secure software and the vulnerability cycle, secure architecture principles and the Java Sandbox, specification with finite state machines and UML, Design by Contract with JML, type safety and C violations, testing and coverage criteria through to MC/DC with JUnit.',
    de: 'Software bauen, die hält: Eigenschaften sicherer Software und Schwachstellenzyklus, Prinzipien sicherer Architektur und die Java-Sandbox, Spezifikation mit endlichen Automaten und UML, Design by Contract mit JML, Typsicherheit und Verstöße in C, Testen und Überdeckungskriterien bis MC/DC mit JUnit.',
  },
  'anno3-pss-corso-aggiornato': {
    it: 'La versione aggiornata del corso di software sicuro: prodotto e processo, ingegneria dei requisiti, modelli di sistema, JML e Design by Contract, macchine a stati in Java, testing e criteri di copertura, analisi statica e DevOps, con un laboratorio di esercizi svolti.',
    en: 'The updated edition of the secure-software course: product and process, requirements engineering, system models, JML and Design by Contract, state machines in Java, testing and coverage criteria, static analysis and DevOps, with a lab of worked exercises.',
    de: 'Die aktualisierte Fassung des Kurses zu sicherer Software: Produkt und Prozess, Requirements Engineering, Systemmodelle, JML und Design by Contract, Zustandsautomaten in Java, Testen und Überdeckungskriterien, statische Analyse und DevOps, mit einem Übungslabor.',
  },
  'anno3-sistemi-biometrici': {
    it: 'Riconoscimento biometrico dall’acquisizione all’attacco: struttura di un sistema biometrico e misura delle prestazioni, impronte digitali con prefiltraggio, enhancement e matching, iride e IrisCode di Daugman, riconoscimento del volto, e in parallelo spoofing dei sensori, antispoofing e implicazioni GDPR e AI Act.',
    en: 'Biometric recognition from capture to attack: the structure of a biometric system and how its performance is measured, fingerprints with pre-filtering, enhancement and matching, the iris and Daugman’s IrisCode, face recognition — and alongside them sensor spoofing, anti-spoofing and GDPR and AI Act implications.',
    de: 'Biometrische Erkennung von der Erfassung bis zum Angriff: Aufbau eines biometrischen Systems und Messung seiner Leistung, Fingerabdrücke mit Vorfilterung, Enhancement und Matching, Iris und Daugmans IrisCode, Gesichtserkennung — und daneben Sensor-Spoofing, Anti-Spoofing sowie Implikationen von DSGVO und AI Act.',
  },
  'anno3-sicurezza-web-mobile': {
    it: 'Sicurezza delle applicazioni web: politiche di sicurezza e controllo degli accessi DAC/MAC/RBAC, autenticazione per password, possesso e biometria, protocolli crittografici con Needham-Schroeder e principi di buona progettazione, poi HTTP e cookie, SQL injection, Same Origin Policy, XSS e phishing.',
    en: 'Web application security: security policies and DAC/MAC/RBAC access control, authentication by password, possession and biometrics, cryptographic protocols with Needham-Schroeder and sound design principles, then HTTP and cookies, SQL injection, the Same Origin Policy, XSS and phishing.',
    de: 'Sicherheit von Webanwendungen: Sicherheitsrichtlinien und DAC/MAC/RBAC-Zugriffskontrolle, Authentifizierung per Passwort, Besitz und Biometrie, kryptographische Protokolle mit Needham-Schroeder und Prinzipien guten Entwurfs, danach HTTP und Cookies, SQL-Injection, Same-Origin-Policy, XSS und Phishing.',
  },

  // ─────────────────────────── EXTRA ───────────────────────────
  'extra-python-corso-completo': {
    it: 'Materiale introduttivo su Python, raccolto fuori dal percorso curricolare. Sezione ancora agli inizi.',
    en: 'Introductory Python material, collected outside the degree curriculum. Still an early-stage section.',
    de: 'Einführendes Python-Material, außerhalb des Studienplans gesammelt. Noch ein Abschnitt in den Anfängen.',
  },
  'extra-scripting': {
    it: 'Appunti di scripting fuori percorso curricolare, al momento sui fondamenti di PowerShell. Sezione ancora agli inizi.',
    en: 'Scripting notes outside the curriculum, currently on PowerShell fundamentals. Still an early-stage section.',
    de: 'Scripting-Notizen außerhalb des Studienplans, derzeit zu PowerShell-Grundlagen. Noch ein Abschnitt in den Anfängen.',
  },
};
