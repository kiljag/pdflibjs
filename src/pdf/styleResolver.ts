/**
 * Style Resolver - Converts CSS-like properties to computed values
 * All values are converted to PDF points (pt)
 */

import type { Block, BlockStyle, Color, Length } from '../blocks/models/Block';
import type { ComputedStyle, BorderStyle } from './types';

/**
 * Conversion constants
 */
const PX_TO_PT = 0.75; // 1px ≈ 0.75pt

/**
 * Parses a length value and converts it to points
 * @param value - Length string like "12pt", "4px", "auto"
 * @param defaultValue - Default value if parsing fails
 * @returns Value in points or defaultValue
 */
export function parseLength(value: Length | undefined, defaultValue: number = 0): number {
  if (!value) return defaultValue;
  if (value === 'auto') return defaultValue;

  const match = value.match(/^([\d.]+)(pt|px)$/);
  if (!match) return defaultValue;

  const [, num, unit] = match;
  const numValue = parseFloat(num);

  switch (unit) {
    case 'pt':
      return numValue;
    case 'px':
      return numValue * PX_TO_PT;
    default:
      return defaultValue;
  }
}

/**
 * Parses a spacing value (margin/padding) and returns [top, right, bottom, left]
 * @param value - Spacing string like "4pt", "4pt 8pt", "4pt 8pt 4pt 8pt"
 * @returns Array of [top, right, bottom, left] in points
 */
export function parseSpacing(value: string | undefined): [number, number, number, number] {
  if (!value) return [0, 0, 0, 0];

  const parts = value.trim().split(/\s+/);
  const parsed = parts.map(p => parseLength(p, 0));

  switch (parsed.length) {
    case 1:
      // All sides
      return [parsed[0], parsed[0], parsed[0], parsed[0]];
    case 2:
      // top/bottom, left/right
      return [parsed[0], parsed[1], parsed[0], parsed[1]];
    case 3:
      // top, left/right, bottom
      return [parsed[0], parsed[1], parsed[2], parsed[1]];
    case 4:
      // top, right, bottom, left
      return [parsed[0], parsed[1], parsed[2], parsed[3]];
    default:
      return [0, 0, 0, 0];
  }
}

/**
 * Parses a border value and returns BorderStyle
 * @param value - Border string like "1pt solid #000"
 * @returns BorderStyle object or undefined
 */
export function parseBorder(value: string | undefined): BorderStyle | undefined {
  if (!value) return undefined;

  // Simple parser: "1pt solid #000"
  const parts = value.trim().split(/\s+/);
  if (parts.length < 3) return undefined;

  const width = parseLength(parts[0], 1);
  const style = parts[1] as "solid" | "dashed" | "dotted";
  const color = parts[2];

  return { width, style, color };
}

/**
 * Normalizes a color value
 * @param value - Color string
 * @returns Normalized color string
 */
export function parseColor(value: Color | undefined, defaultValue: string = '#000000'): string {
  if (!value) return defaultValue;

  // Named colors
  const namedColors: Record<string, string> = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF',
    gray: '#808080',
    grey: '#808080',
  };

  if (namedColors[value.toLowerCase()]) {
    return namedColors[value.toLowerCase()];
  }

  // Already in hex format
  if (value.startsWith('#')) {
    return value;
  }

  // rgb(r, g, b) format
  const rgbMatch = value.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
    const g = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
    const b = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  return defaultValue;
}

/**
 * Resolves a block's styles to computed values
 * @param block - Block to resolve styles for
 * @returns ComputedStyle with all values in points
 */
export function resolveStyles(block: Block): ComputedStyle {
  const style: BlockStyle = block.style ?? {};
  const [marginTop, marginRight, marginBottom, marginLeft] = parseSpacing(style.margin);
  const [paddingTop, paddingRight, paddingBottom, paddingLeft] = parseSpacing(style.padding);

  // Parse border (simplified - same border for all sides)
  const border = parseBorder(style.border);

  return {
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    borderTop: border,
    borderRight: border,
    borderBottom: border,
    borderLeft: border,
  };
}
