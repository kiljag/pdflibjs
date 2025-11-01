/**
 * Block Serialization Functions
 * Serializes and deserializes blocks to/from JSON
 */

import { Block } from '../models/Block';
import { TextBlock } from '../models/TextBlock';
import { serializeTextBlock, deserializeTextBlock } from './textBlockOps';

/**
 * Serializes a block to JSON
 */
export function serializeBlock(block: Block): any {
  if (block.type === 'text') {
    return serializeTextBlock(block as TextBlock);
  }

  throw new Error(`Unsupported block type: ${block.type}`);
}

/**
 * Deserializes JSON to a block
 */
export function deserializeBlock(json: any): Block {
  if (json.type === 'text') {
    return deserializeTextBlock(json);
  }

  throw new Error(`Unsupported block type: ${json.type}`);
}
