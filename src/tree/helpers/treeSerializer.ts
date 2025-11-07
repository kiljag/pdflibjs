/**
 * PDFTree Serialization Functions
 * Helper functions for serializing and deserializing PDFTree to/from JSON
 */

import { PDFTree, PageConfig, DEFAULT_PAGE_CONFIG, PageUnit } from '../models/PDFTree';
import { serializeBlock, deserializeBlock } from '../../blocks/ops/blockSerializer';

const LEGACY_SIZES: Record<string, [number, number]> = {
  A4: [595.28, 841.89],
  Letter: [612, 792],
  Legal: [612, 1008],
};

function convertLegacySize(size: any): [number, number] {
  if (Array.isArray(size) && size.length === 2) {
    const [width, height] = size;
    return [Number(width) || DEFAULT_PAGE_CONFIG.width, Number(height) || DEFAULT_PAGE_CONFIG.height];
  }

  if (typeof size === 'string' && LEGACY_SIZES[size]) {
    return LEGACY_SIZES[size];
  }

  return [DEFAULT_PAGE_CONFIG.width, DEFAULT_PAGE_CONFIG.height];
}

function normalizePageConfig(page: any): PageConfig {
  if (page && typeof page.width === 'number' && typeof page.height === 'number') {
    const unit: PageUnit = page.unit ?? DEFAULT_PAGE_CONFIG.unit ?? 'pt';
    return {
      width: page.width,
      height: page.height,
      unit,
      ...(page.orientation ? { orientation: page.orientation } : {}),
    };
  }

  if (page?.size) {
    const [width, height] = convertLegacySize(page.size);
    return {
      width,
      height,
      unit: DEFAULT_PAGE_CONFIG.unit ?? 'pt',
      ...(page.orientation ? { orientation: page.orientation } : {}),
    };
  }

  return { ...DEFAULT_PAGE_CONFIG };
}

/**
 * Convert PDFTree to JSON object
 * @param tree - PDFTree to serialize
 * @returns JSON object representation
 */
export function serializePDFTree(tree: PDFTree): any {
  return {
    pages: (tree.pages.length > 0 ? tree.pages : [{ ...DEFAULT_PAGE_CONFIG }]).map(page => ({
      width: page.width,
      height: page.height,
      unit: page.unit ?? DEFAULT_PAGE_CONFIG.unit ?? 'pt',
      ...(page.orientation ? { orientation: page.orientation } : {}),
    })),
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
  const pagesInput = Array.isArray(json.pages) && json.pages.length > 0
    ? json.pages
    : [{ ...DEFAULT_PAGE_CONFIG }];

  return {
    pages: pagesInput.map(normalizePageConfig),
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
