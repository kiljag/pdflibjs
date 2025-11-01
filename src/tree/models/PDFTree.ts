/**
 * PDFTree Model - Immutable data structure for PDF documents
 * This is a plain data structure without methods
 * Use tree helper functions for all operations
 */

import { Block, TextBlock } from "../../blocks/models";


export type AnyBlock = Block | TextBlock;

/**
 * Page configuration for PDF pages
 */
export interface PageConfig {
  size: "A4" | "Letter" | "Legal" | [number, number];
  margins: string;
  orientation?: "portrait" | "landscape";
}

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
