#!/usr/bin/env node
/**
 * Build-time sync of the Cybersecurity Knowledge Archive.
 *
 * Reads the archive's own generated manifest and derives a structural index of
 * the curriculum: years, subjects, and the real directory tree beneath each.
 *
 * Why a script and not hand-written data: the archive has 6000+ files across
 * three years. Counts typed by hand rot on the first commit to the archive, and
 * a portfolio whose headline claim is "evidence over assertions" cannot ship
 * numbers nobody can reproduce. Run `npm run sync:archive` to refresh.
 *
 * No dependencies — Node's built-in fetch and fs only.
 *
 * Output is committed to the repository so builds stay offline, reproducible
 * and independent of GitHub availability.
 */
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = 'samuelecorra/cybersec_unimi_ssri2.0';
const BRANCH = 'main';
const MANIFEST_URL = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/manifest.json`;
const GITHUB_URL = `https://github.com/${REPO}`;
const VIEWER_URL = 'https://samuelecorra.github.io/cybersec_unimi_ssri2.0/';

const here = dirname(fileURLToPath(import.meta.url));
const OUT_SUMMARY = resolve(here, '../src/data/generated/archive.json');
const OUT_SUBJECTS = resolve(here, '../src/data/generated/subjects');

const CODE_EXT = new Set([
  '.java',
  '.c',
  '.h',
  '.cpp',
  '.js',
  '.jsx',
  '.ts',
  '.py',
  '.sh',
  '.sql',
  '.html',
  '.css',
  '.asm',
  '.php',
  '.rb',
  '.go',
]);
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']);

/** Lesson-style filenames: "L1 - ...", "Lezione 3 ...", "LEZIONE 0 - ...". */
const LESSON_RE = /^(l\d+\s*[-–.]|lezione\s*\d+)/i;
/** Module-style directories: "M01_...", "M1_...". */
const MODULE_RE = /^m\d+[_\s-]/i;
/** Didactic-unit directories: "UD1", "UD 2 - ...", "UD0 - ...". */
const UNIT_RE = /^ud\s*\d+/i;

const YEAR_LABELS = {
  anno1: { order: 1, kind: 'year', label: 'Year 1' },
  anno2: { order: 2, kind: 'year', label: 'Year 2' },
  anno3: { order: 3, kind: 'year', label: 'Year 3' },
  extra: { order: 4, kind: 'extra', label: 'Extra' },
};

/** "5.1_PSS_corso_aggiornato" -> "PSS corso aggiornato". */
function humanizeSubject(dirName) {
  let s = dirName.replace(/^[\d.]+\s*[_-]\s*/, '').replace(/^[\d.]+/, '');
  s = s.replace(/[_]+/g, ' ').trim();
  // Split runs of CamelCase that came from underscore-free directory names.
  if (!s.includes(' ') && /[a-z][A-Z]/.test(s)) s = s.replace(/([a-z])([A-Z])/g, '$1 $2');
  return s.replace(/\s+/g, ' ').trim();
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Hash-route URL into the archive's deployed viewer. */
function viewerLink(segments) {
  return `${VIEWER_URL}#/${segments.map((s) => encodeURIComponent(s)).join('/')}`;
}

function githubLink(segments) {
  const path = ['lessons', 'cybersecurity', ...segments]
    .map((s) => encodeURIComponent(s))
    .join('/');
  return `${GITHUB_URL}/tree/${BRANCH}/${path}`;
}

function emptyCounts() {
  return { files: 0, notes: 0, pdfs: 0, code: 0, images: 0, other: 0, lessons: 0 };
}

function addFile(counts, ext, basename) {
  counts.files += 1;
  if (ext === '.md') counts.notes += 1;
  else if (ext === '.pdf') counts.pdfs += 1;
  else if (CODE_EXT.has(ext)) counts.code += 1;
  else if (IMAGE_EXT.has(ext)) counts.images += 1;
  else counts.other += 1;
  if (ext === '.md' && LESSON_RE.test(basename)) counts.lessons += 1;
}

async function main() {
  process.stdout.write(`Fetching ${MANIFEST_URL}\n`);
  const res = await fetch(MANIFEST_URL);
  if (!res.ok) throw new Error(`Manifest fetch failed: ${res.status} ${res.statusText}`);
  const manifest = await res.json();

  if (!Array.isArray(manifest.files)) throw new Error('Unexpected manifest shape: files[] missing');

  // --- Build a nested directory tree from the flat file list -----------------
  const root = { name: '', dirs: new Map(), files: [], counts: emptyCounts() };

  for (const file of manifest.files) {
    const segments = String(file.path).split('/');
    const basename = segments[segments.length - 1];
    const ext = String(file.ext ?? '').toLowerCase();

    let node = root;
    addFile(node.counts, ext, basename);
    for (const segment of segments.slice(0, -1)) {
      if (!node.dirs.has(segment)) {
        node.dirs.set(segment, {
          name: segment,
          dirs: new Map(),
          files: [],
          counts: emptyCounts(),
        });
      }
      node = node.dirs.get(segment);
      addFile(node.counts, ext, basename);
    }
    // `node` is now the directory that directly contains this file.
    node.files.push({ name: basename, ext });
  }

  // --- Shape it into years -> subjects ---------------------------------------
  const years = [];
  const totals = { ...emptyCounts(), directories: 0, subjects: 0, modules: 0, units: 0 };
  const trees = {};

  function countDirs(node) {
    let n = node.dirs.size;
    for (const child of node.dirs.values()) n += countDirs(child);
    return n;
  }

  /**
   * Serialises the drill-down tree: directories AND the individual lessons
   * inside them, because "1474 lessons" only means something if you can see
   * them listed.
   *
   * Images are omitted — 2725 screenshots and diagrams are supporting assets,
   * not material a reader browses by name, and including them would triple the
   * payload of the lazy-loaded chunk for no informational gain.
   */
  function serializeFiles(files) {
    return files
      .filter((file) => !IMAGE_EXT.has(file.ext))
      .sort((a, b) => a.name.localeCompare(b.name, 'it', { numeric: true }))
      .map((file) => ({
        name: file.name.replace(/\.[^.]+$/, ''),
        ext: file.ext,
        lesson: file.ext === '.md' && LESSON_RE.test(file.name),
      }));
  }

  function serializeTree(node, depth = 0) {
    return [...node.dirs.values()]
      .sort((a, b) => a.name.localeCompare(b.name, 'it', { numeric: true }))
      .map((child) => ({
        name: child.name,
        kind: MODULE_RE.test(child.name) ? 'module' : UNIT_RE.test(child.name) ? 'unit' : 'section',
        counts: child.counts,
        files: serializeFiles(child.files),
        children: depth < 5 ? serializeTree(child, depth + 1) : [],
      }));
  }

  for (const [yearDir, meta] of Object.entries(YEAR_LABELS)) {
    const yearNode = root.dirs.get(yearDir);
    if (!yearNode) continue;

    const subjects = [];
    for (const subjectNode of [...yearNode.dirs.values()].sort((a, b) =>
      a.name.localeCompare(b.name, 'it'),
    )) {
      // Count modules/units anywhere beneath the subject, since depth varies.
      let modules = 0;
      let units = 0;
      const walk = (node) => {
        for (const child of node.dirs.values()) {
          if (MODULE_RE.test(child.name)) modules += 1;
          if (UNIT_RE.test(child.name)) units += 1;
          walk(child);
        }
      };
      walk(subjectNode);

      const title = humanizeSubject(subjectNode.name);
      const slug = slugify(`${yearDir}-${title}`);
      const segments = [yearDir, subjectNode.name];

      subjects.push({
        id: slug,
        slug,
        dirName: subjectNode.name,
        title,
        year: yearDir,
        path: `lessons/cybersecurity/${segments.join('/')}`,
        viewerUrl: viewerLink(segments),
        githubUrl: githubLink(segments),
        counts: { ...subjectNode.counts, directories: countDirs(subjectNode), modules, units },
      });

      trees[slug] = {
        files: serializeFiles(subjectNode.files),
        children: serializeTree(subjectNode),
      };

      totals.subjects += 1;
      totals.modules += modules;
      totals.units += units;
      for (const key of Object.keys(emptyCounts())) totals[key] += subjectNode.counts[key];
    }

    years.push({ id: yearDir, label: meta.label, kind: meta.kind, order: meta.order, subjects });
  }

  totals.directories = countDirs(root);

  const summary = {
    $comment:
      'GENERATED by scripts/sync-archive.mjs — do not edit by hand. Run: npm run sync:archive',
    generatedAt: new Date().toISOString(),
    source: {
      repo: REPO,
      branch: BRANCH,
      githubUrl: GITHUB_URL,
      viewerUrl: VIEWER_URL,
      manifestGeneratedAt: manifest.generatedAt ?? null,
      manifestRoot: manifest.root ?? null,
    },
    totals,
    years: years.sort((a, b) => a.order - b.order),
  };

  mkdirSync(dirname(OUT_SUMMARY), { recursive: true });
  writeFileSync(OUT_SUMMARY, `${JSON.stringify(summary, null, 2)}\n`);

  /*
   * One file per subject rather than one big tree: the detail route needs
   * exactly one subject, and a single 1 MB bundle would make every visitor
   * download all 24 to read one. Vite code-splits these via import.meta.glob.
   */
  rmSync(OUT_SUBJECTS, { recursive: true, force: true });
  mkdirSync(OUT_SUBJECTS, { recursive: true });
  let largest = 0;
  for (const [slug, tree] of Object.entries(trees)) {
    const json = `${JSON.stringify({ slug, ...tree })}\n`;
    largest = Math.max(largest, json.length);
    writeFileSync(resolve(OUT_SUBJECTS, `${slug}.json`), json);
  }

  process.stdout.write(
    `\nWrote ${OUT_SUMMARY}\n      ${OUT_SUBJECTS}/*.json (${Object.keys(trees).length} files, largest ${Math.round(largest / 1024)} KB)\n\n` +
      `  years      ${years.length}\n` +
      `  subjects   ${totals.subjects}\n` +
      `  modules    ${totals.modules}\n` +
      `  units      ${totals.units}\n` +
      `  lessons    ${totals.lessons}\n` +
      `  notes      ${totals.notes}\n` +
      `  pdfs       ${totals.pdfs}\n` +
      `  code       ${totals.code}\n` +
      `  files      ${totals.files}\n` +
      `  dirs       ${totals.directories}\n`,
  );
}

main().catch((error) => {
  process.stderr.write(`sync-archive failed: ${error.message}\n`);
  process.exitCode = 1;
});
