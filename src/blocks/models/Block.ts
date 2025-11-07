/**
 * Core Block primitives used to model the PDF structure.
 * Blocks mirror a simplified DOM-like tree where every node is a block.
 */

export type Length = string; // "12pt" | "24px" | "auto"
export type Color = string;  // "#RRGGBB" | "rgb(...)" | "black"
export type BlockType = 'text';

export interface BlockLayout {
  /** Left coordinate in points from the page content area's origin (top-left). */
  x: number;
  /** Top coordinate in points from the page content area's origin (top-left). */
  y: number;
  /** Block width in points. */
  width: number;
  /** Block height in points. */
  height: number;
}

export function normalizeBlockLayout(layout: BlockLayout): BlockLayout {
  return {
    x: Number(layout.x.toFixed(2)),
    y: Number(layout.y.toFixed(2)),
    width: Number(layout.width.toFixed(2)),
    height: Number(layout.height.toFixed(2)),
  };
}

export interface BlockStyle {
  margin?: string;
  padding?: string;
  border?: string;
  rotate?: number;
  opacity?: number;
  backgroundColor?: Color;
}

export interface Block<TStyle extends BlockStyle = BlockStyle> {
  id?: string;
  type: BlockType;
  layout: BlockLayout;
  style?: TStyle;
}
