/**
 * Tree Module - Immutable PDFTree operations
 *
 * This module provides:
 * - PDFTree interface (simple immutable data structure)
 * - Helper functions for creating and serializing trees
 * - Operations (ops) for manipulating trees in Redux-compatible way
 *
 * Usage with Redux:
 * ```typescript
 * import { PDFTree, createPDFTree, addElement } from 'pdflibjs/tree';
 *
 * // In reducer
 * const initialState: PDFTree = createPDFTree();
 *
 * function pdfReducer(state = initialState, action) {
 *   switch (action.type) {
 *     case 'ADD_ELEMENT':
 *       return addElement(state, action.element);
 *     default:
 *       return state;
 *   }
 * }
 * ```
 */

// Export model types
export * from './models/PDFTree';

// Export helper functions (factory, serialization)
export * from './helpers';

// Export all operations
export * from './ops';
