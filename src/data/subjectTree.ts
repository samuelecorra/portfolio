export interface TreeFile {
  /** Filename without extension. */
  name: string;
  ext: string;
  /** True when the filename follows the archive's lesson convention. */
  lesson: boolean;
}

export interface TreeNode {
  name: string;
  kind: 'module' | 'unit' | 'section';
  counts: { files: number; notes: number; pdfs: number; code: number; lessons: number };
  files: TreeFile[];
  children: TreeNode[];
}

export interface SubjectTree {
  slug: string;
  files: TreeFile[];
  children: TreeNode[];
}

/**
 * Lazily loads one subject's tree.
 *
 * `import.meta.glob` without `eager` makes Vite emit each subject as its own
 * chunk, so opening Cryptography downloads Cryptography — not all 24 subjects.
 */
const loaders = import.meta.glob<{ default: SubjectTree }>('./generated/subjects/*.json');

export async function loadSubjectTree(slug: string): Promise<SubjectTree | null> {
  const loader = loaders[`./generated/subjects/${slug}.json`];
  if (!loader) return null;
  const module = await loader();
  return module.default;
}
