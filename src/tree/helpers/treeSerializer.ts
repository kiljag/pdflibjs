/**
 * PDFTree Serialization Functions
 * Helper functions for serializing and deserializing PDFTree to/from JSON
 */

import { PDFTree } from '../models/PDFTree';
import { serializeBlock, deserializeBlock } from '../../blocks/ops/blockSerializer';

/**
 * Convert PDFTree to JSON object
 * @param tree - PDFTree to serialize
 * @returns JSON object representation
 */
export function serializePDFTree(tree: PDFTree): any {
  return {
    pages: tree.pages,
    elements: tree.elements.map(el => serializeBlock(el)),
    metadata: tree.metadata,
  };
}

/**
 * Convert PDFTree to JSON string
 * @param tree - PDFTree to serialize
 * @param pretty - Whether to pretty-print the JSON (default: true)
 * @returns JSON string representation
 */
export function pdfTreeToString(tree: PDFTree, pretty: boolean = true): string {
  return JSON.stringify(serializePDFTree(tree), null, pretty ? 2 : 0);
}

/**
 * Create PDFTree from JSON object
 * @param json - JSON object to deserialize
 * @returns PDFTree instance
 */
export function deserializePDFTree(json: any): PDFTree {
  return {
    pages: json.pages || [{ size: 'A4', margins: '36pt' }],
    elements: json.elements?.map((el: any) => deserializeBlock(el)) || [],
    metadata: json.metadata || {},
  };
}

/**
 * Create PDFTree from JSON string
 * @param jsonString - JSON string to parse
 * @returns PDFTree instance
 */
export function pdfTreeFromString(jsonString: string): PDFTree {
  const json = JSON.parse(jsonString);
  return deserializePDFTree(json);
}

/**
 * Clone a PDFTree (deep copy)
 * @param tree - PDFTree to clone
 * @returns Cloned PDFTree instance
 */
export function clonePDFTree(tree: PDFTree): PDFTree {
  return deserializePDFTree(serializePDFTree(tree));
}
