import { normalizeBlockLayout } from '../models/Block';
import { TextBlock, TextBlockStyle } from '../models/TextBlock';
import type { BlockLayout } from '../models/Block';

export interface CreateTextBlockOptions {
  text: string;
  id?: string;
  layout: BlockLayout;
  style?: TextBlockStyle;
  overflow?: 'clip' | 'ellipsis' | 'shrinkToFit' | 'expand';
}

/**
 * Creates a TextBlock with the given options
 */
export function createTextBlock(options: CreateTextBlockOptions): TextBlock {
  return {
    type: 'text',
    text: options.text,
    id: options.id,
    layout: normalizeBlockLayout(options.layout),
    style: options.style,
    overflow: options.overflow ?? 'expand',
  };
}

/**
 * Serializes a TextBlock to JSON
 */
export function serializeTextBlock(block: TextBlock): any {
  return {
    type: 'text',
    text: block.text,
    layout: block.layout,
    overflow: block.overflow,
    style: block.style,
    ...(block.id && { id: block.id }),
  };
}

/**
 * Deserializes JSON to a TextBlock
 */
export function deserializeTextBlock(json: any): TextBlock {
  return {
    type: 'text',
    text: json.text,
    id: json.id,
    layout: normalizeBlockLayout(json.layout),
    style: json.style,
    overflow: json.overflow ?? 'expand',
  };
}
