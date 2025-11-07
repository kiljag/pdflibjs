/**
 * PDFTree Model - Immutable data structure for PDF documents
 * This is a plain data structure without methods
 * Use tree helper functions for all operations
 */

import { Block, TextBlock } from "../../blocks/models";

export type PageUnit = 'pt' | 'mm' | 'cm' | 'in';
export interface PageConfig {
  width: number;
  height: number;
  unit?: PageUnit;
  orientation?: "portrait" | "landscape";
}

export type AnyBlock = Block | TextBlock;

export const DEFAULT_PAGE_UNIT: PageUnit = 'pt';
export const DEFAULT_PAGE_WIDTH = 595.28;  // A4 width in points
export const DEFAULT_PAGE_HEIGHT = 841.89; // A4 height in points
export const DEFAULT_PAGE_CONFIG: PageConfig = {
  width: DEFAULT_PAGE_WIDTH,
  height: DEFAULT_PAGE_HEIGHT,
  unit: DEFAULT_PAGE_UNIT,
};

/**
 * Document metadata
 */
export interface DocumentMetadata {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string[];
  creator?: string;
}

/**
 * PDFTree - Immutable root structure for PDF documents
 * Use tree helper functions to modify instead of mutating directly
 */
export interface PDFTree {
  pages: PageConfig[];
  elements: AnyBlock[];
  metadata: DocumentMetadata;
}
