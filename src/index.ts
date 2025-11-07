/**
 * PDFLibJS - PDF Document Generation Library
 *
 * A TypeScript library for generating PDF documents using a block-based schema
 * with flexbox layout support and immutable tree operations for Redux/state management.
 *
 * @packageDocumentation
 */

// ============================================================================
// PDF Generation Functions
// ============================================================================

export {
  generatePDF,
  generatePDFFile,
  generatePDFFromJSON,
  generatePDFFromObject,
  GenerateOptions,
} from './pdf/generator';

// ============================================================================
// Blocks (Document Building Components)
// ============================================================================

export {
  // Base block
  Block,
  BlockStyle,
  Length,
  Color,
  BlockLayout,
  normalizeBlockLayout,
} from './blocks/models/Block';

export {
  TextBlock,
  TextBlockStyle,
} from './blocks/models/TextBlock';

// Helper functions for creating and manipulating blocks
export {
  createTextBlock,
  CreateTextBlockOptions,
  serializeTextBlock,
  deserializeTextBlock,
} from './blocks/ops/textBlockOps';


// ============================================================================
// Tree Operations (Immutable State Management for Redux)
// ============================================================================

export * as Tree from './tree';

// ============================================================================
// Style Utilities
// ============================================================================

export {
  parseLength,
  parseColor,
  parseSpacing,
} from './pdf/styleResolver';

// ============================================================================
// Type Exports (For Advanced Usage)
// ============================================================================

export type {
  ComputedBox,
  ComputedStyle,
  BorderStyle,
  FontMetrics,
  LayoutNode,
  DocumentDefinition,
  Document,
} from './pdf/types';

export type {
  PDFTree,
  PageConfig,
  DocumentMetadata,
} from './tree/models/PDFTree';
