/**
 * Core Block primitives used to model the PDF structure.
 * Blocks mirror a simplified DOM-like tree where every node is a block.
 */

export type Length = string; // "12pt" | "24px" | "auto"
export type Color = string;  // "#RRGGBB" | "rgb(...)" | "black"
export type BlockType = 'text';

export interface BlockStyle {
  x?: Length | number;
  y?: Length | number;
  width?: Length;
  height?: Length;
  margin?: string;
  padding?: string;
  border?: string;
  rotate?: number;
  opacity?: number;
  backgroundColor?: Color;
}

export interface Block<TStyle extends BlockStyle = BlockStyle> {
  type: BlockType;
  id?: string;
  style?: TStyle;
}
