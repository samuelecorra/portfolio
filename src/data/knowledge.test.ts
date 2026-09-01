import { describe, expect, it } from 'vitest';

import { getKnowledgeAreas, knowledgeAreas } from './knowledge';
import { projects } from './projects';

describe('knowledge data invariants', () => {
  it('backs every area with at least one topic and one evidence link', () => {
    for (const area of knowledgeAreas) {
      expect(area.topics.length, `${area.id} has no topics`).toBeGreaterThan(0);
      expect(area.evidence.length, `${area.id} has no evidence`).toBeGreaterThan(0);
    }
  });

  it('only references projects that exist', () => {
    const knownIds = new Set(projects.map((project) => project.id));
    const dangling = knowledgeAreas.flatMap((area) =>
      area.relatedProjectIds.filter((id) => !knownIds.has(id)),
    );

    expect(dangling).toEqual([]);
  });

  it('has unique ids and a deterministic order', () => {
    expect(new Set(knowledgeAreas.map((a) => a.id)).size).toBe(knowledgeAreas.length);
    const orders = getKnowledgeAreas().map((a) => a.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });
});
