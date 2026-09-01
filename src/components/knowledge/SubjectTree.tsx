import { ChevronRight, FileText, FileCode, FileType } from 'lucide-react';
import type { JSX } from 'react';

import type { TreeFile, TreeNode } from '@/data/subjectTree';
import { useI18n } from '@/i18n';
import { externalLinkAttrs } from '@/lib/links';

interface SubjectTreeProps {
  nodes: TreeNode[];
  files: TreeFile[];
  /** Archive viewer base, already including the subject path. */
  viewerBase: string;
  segments: string[];
  depth?: number;
}

function fileIcon(ext: string): JSX.Element {
  const className = 'h-3.5 w-3.5 shrink-0 text-ink-faint';
  if (ext === '.pdf') return <FileType className={className} aria-hidden focusable={false} />;
  if (ext === '.md') return <FileText className={className} aria-hidden focusable={false} />;
  return <FileCode className={className} aria-hidden focusable={false} />;
}

function viewerUrl(base: string, segments: string[]): string {
  const suffix = segments.map((segment) => encodeURIComponent(segment)).join('/');
  return suffix ? `${base}/${suffix}` : base;
}

function FileList({
  files,
  viewerBase,
  segments,
}: {
  files: TreeFile[];
  viewerBase: string;
  segments: string[];
}): JSX.Element | null {
  if (files.length === 0) return null;

  return (
    <ul className="mt-2 flex flex-col gap-1">
      {files.map((file) => (
        <li key={`${file.name}${file.ext}`}>
          <a
            href={viewerUrl(viewerBase, [...segments, `${file.name}${file.ext}`])}
            className="group flex items-start gap-2 rounded px-2 py-1 text-sm text-ink-muted hover:bg-surface-raised hover:text-ink"
            {...externalLinkAttrs}
          >
            {fileIcon(file.ext)}
            <span className={file.lesson ? 'text-ink-muted group-hover:text-ink' : ''}>
              {file.name}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Nested module → unit → lesson tree.
 *
 * Built on native <details>/<summary>: keyboard operable, announced correctly
 * and expandable with no JavaScript and no ARIA of our own. The first level is
 * open so the structure is visible without a click.
 */
export function SubjectTree({
  nodes,
  files,
  viewerBase,
  segments,
  depth = 0,
}: SubjectTreeProps): JSX.Element {
  const { t } = useI18n();

  return (
    <div className={depth > 0 ? 'border-l border-line pl-4' : ''}>
      <FileList files={files} viewerBase={viewerBase} segments={segments} />

      {nodes.map((node) => {
        const childSegments = [...segments, node.name];
        const total = node.counts.files;

        return (
          <details key={node.name} open={depth === 0} className="group mt-2">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded px-2 py-1.5 hover:bg-surface-raised">
              <ChevronRight
                aria-hidden
                focusable={false}
                className="h-4 w-4 shrink-0 text-ink-faint transition-transform duration-(--duration-fast) group-open:rotate-90"
              />
              <span
                className={
                  node.kind === 'module'
                    ? 'font-medium text-ink'
                    : node.kind === 'unit'
                      ? 'text-ink'
                      : 'text-ink-muted'
                }
              >
                {node.name}
              </span>
              <span className="ml-auto shrink-0 font-mono text-xs text-ink-faint">
                {node.counts.lessons > 0
                  ? `${node.counts.lessons} ${t.metrics.lessons}`
                  : `${total} ${t.metrics.files}`}
              </span>
            </summary>

            <div className="ml-2">
              <SubjectTree
                nodes={node.children}
                files={node.files}
                viewerBase={viewerBase}
                segments={childSegments}
                depth={depth + 1}
              />
            </div>
          </details>
        );
      })}
    </div>
  );
}
