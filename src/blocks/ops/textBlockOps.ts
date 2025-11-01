import { TextBlock, TextBlockStyle } from '../models/TextBlock';

export interface CreateTextBlockOptions {
  text: string;
  id?: string;
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
    style: json.style,
    overflow: json.overflow ?? 'expand',
  };
}
