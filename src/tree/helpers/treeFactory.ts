/**
 * PDFTree Factory Functions
 * Helper functions for creating and initializing PDFTree instances
 */

import { PDFTree } from '../models/PDFTree';

/**
 * Create a new PDFTree with default values
 * @param props - Optional partial PDFTree properties
 * @returns New PDFTree instance
 */
export function createPDFTree(props?: Partial<PDFTree>): PDFTree {
  return {
    pages: props?.pages || [{ size: 'A4', margins: '36pt' }],
    elements: props?.elements || [],
    metadata: props?.metadata || {},
  };
}

/**
 * Create an empty PDFTree with no default pages
 * @returns Empty PDFTree instance
 */
export function createEmptyPDFTree(): PDFTree {
  return {
    pages: [],
    elements: [],
    metadata: {},
  };
}
