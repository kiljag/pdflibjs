/**
 * PDF Layout and Document Type Definitions
 */

import type { Block, Color } from '../blocks/models/Block';
import type { PageConfig, DocumentMetadata } from '../tree/models/PDFTree';

/**
 * Computed layout box after the layout pass.
 */
export interface ComputedBox {
  x: number;
  y: number;
  width: number;
  height: number;
  block: Block;
  children?: ComputedBox[];
}

/**
 * Border style description used after resolving styles.
 */
export interface BorderStyle {
  width: number;
  style: 'solid' | 'dashed' | 'dotted';
  color: Color;
}

/**
 * Computed styles with every value resolved to points.
 */
export interface ComputedStyle {
  width: number;
  height: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  borderTop?: BorderStyle;
  borderRight?: BorderStyle;
  borderBottom?: BorderStyle;
  borderLeft?: BorderStyle;
  positionX?: number;
  positionY?: number;
}

/**
 * Font metrics captured during layout/rendering.
 */
export interface FontMetrics {
  family: string;
  size: number;
  weight: number;
  lineHeight: number;
  letterSpacing: number;
}

/**
 * Layout node produced by the layout engine.
 */
export interface LayoutNode {
  block: Block;
  style: ComputedStyle;
  box: ComputedBox;
  children: LayoutNode[];
}

/**
 * Document definition consumed by the PDF generator.
 */
export interface DocumentDefinition {
  pages: PageConfig[];
  elements: Block[];
  metadata?: DocumentMetadata;
}

/**
 * Backwards-compatible alias used by earlier versions.
 */
export type Document = DocumentDefinition;
