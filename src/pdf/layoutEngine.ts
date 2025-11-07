/**
 * Layout Engine - maps declared block layouts directly to computed boxes.
 * Each block carries absolute coordinates provided by the author.
 */

import type { Block } from '../blocks/models/Block';
import { normalizeBlockLayout } from '../blocks/models/Block';
import type { ComputedBox } from './types';

/**
 * Computes layout for a list of blocks using their declared layout boxes.
 * The containerWidth argument is kept for backwards compatibility but no longer used.
 */
export function computeLayout(blocks: Block[], _containerWidth: number): ComputedBox[] {
  return blocks.map(block => {
    const layout = normalizeBlockLayout(block.layout);

    return {
      x: layout.x,
      y: layout.y,
      width: layout.width,
      height: layout.height,
      block,
    };
  });
}
