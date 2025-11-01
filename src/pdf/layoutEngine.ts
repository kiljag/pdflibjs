/**
 * Layout Engine - Simple custom layout without external dependencies
 * Calculates positions for elements based on their properties
 */

import type { Block } from '../blocks/models/Block';
import type { TextBlock } from '../blocks/models/TextBlock';
import type { ComputedBox, ComputedStyle } from './types';
import { resolveStyles } from './styleResolver';

/**
 * Measures text width (simplified approximation)
 */
function measureText(text: string, fontSize: number = 12): { width: number; height: number } {
  const avgCharWidth = fontSize * 0.5;
  const width = text.length * avgCharWidth;
  const height = fontSize * 1.2;
  return { width, height };
}

/**
 * Estimate element dimensions, falling back to sensible defaults.
 */
function calculateDimensions(block: Block, style: ComputedStyle, availableWidth: number): { width: number; height: number } {
  
  let width = style.width >= 0 ? style.width : availableWidth;
  let height = style.height >= 0 ? style.height : 0;

  if (height <= 0) {
    switch (block.type) {
      case 'text': {
        const textBlock = block as TextBlock;
        const fontSize = textBlock.style?.fontSize || 12;
        const measured = measureText(textBlock.text || '', fontSize);
        height = measured.height + style.paddingTop + style.paddingBottom;
        break;
      }
      default:
        height = 48;
    }
  }

  if (height <= 0) {
    height = 48;
  }

  return { width, height };
}

/**
 * Layout a single element
 */
function layoutElement(block: Block, style: ComputedStyle, x: number, y: number, availableWidth: number): ComputedBox {
  const flowWidth = availableWidth - style.marginLeft - style.marginRight;
  const dims = calculateDimensions(block, style, flowWidth);

  const actualX = style.positionX !== undefined ? style.positionX : x + style.marginLeft;
  const actualY = style.positionY !== undefined ? style.positionY : y + style.marginTop;

  return {
    x: actualX,
    y: actualY,
    width: dims.width,
    height: dims.height + style.marginBottom,
    block,
  };
}

/**
 * Computes layout for a list of blocks (simple vertical flow)
 */
export function computeLayout(blocks: Block[], containerWidth: number): ComputedBox[] {
  const boxes: ComputedBox[] = [];
  let currentY = 0;

  for (const block of blocks) {
    const style = resolveStyles(block);
    const box = layoutElement(block, style, 0, currentY, containerWidth);
    boxes.push(box);
    if (style.positionY === undefined) {
      currentY += style.marginTop + box.height;
    }
  }

  return boxes;
}
