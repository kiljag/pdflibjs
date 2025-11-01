/**
 * PDF Renderer - Paints blocks to PDF using pdf-lib
 */

import {
  PDFDocument,
  PDFPage,
  StandardFonts,
  rgb,
  PDFFont,
} from 'pdf-lib';
import { Block } from '../blocks/models/Block';
import { TextBlock } from '../blocks/models/TextBlock';
import type { ComputedBox } from './types';
import {
  parseColor,
  resolveStyles,
} from './styleResolver';

/**
 * Renderer context - caches fonts
 */
export class RendererContext {
  doc: PDFDocument;
  fonts: Map<string, PDFFont>;

  constructor(doc: PDFDocument) {
    this.doc = doc;
    this.fonts = new Map();
  }

  async getFont(fontFamily: string = 'Helvetica', isBold: boolean = false): Promise<PDFFont> {
    const key = `${fontFamily}-${isBold ? 'bold' : 'regular'}`;

    if (this.fonts.has(key)) {
      return this.fonts.get(key)!;
    }

    let standardFont = StandardFonts.Helvetica;

    if (fontFamily?.toLowerCase().includes('times')) {
      standardFont = isBold ? StandardFonts.TimesRomanBold : StandardFonts.TimesRoman;
    } else if (fontFamily?.toLowerCase().includes('courier')) {
      standardFont = isBold ? StandardFonts.CourierBold : StandardFonts.Courier;
    } else {
      standardFont = isBold ? StandardFonts.HelveticaBold : StandardFonts.Helvetica;
    }

    const font = await this.doc.embedFont(standardFont);
    this.fonts.set(key, font);
    return font;
  }
}

/**
 * Converts hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = parseColor(hex);
  const r = parseInt(normalized.slice(1, 3), 16) / 255;
  const g = parseInt(normalized.slice(3, 5), 16) / 255;
  const b = parseInt(normalized.slice(5, 7), 16) / 255;
  return { r, g, b };
}

/**
 * Render text blocks to the page
 * Note: box.x and box.y are in top-left coordinate system (0,0 = top-left)
 * PDF uses bottom-left coordinate system, so we convert y coordinates using page.getHeight()
 */
async function renderTextBlock(
  page: PDFPage,
  box: ComputedBox,
  block: TextBlock,
  ctx: RendererContext
): Promise<void> {
  const style = block.style || {};
  const fontSize = style.fontSize || 12;
  const color = style.color || '#000000';
  const fontWeight = style.fontWeight;
  const isBold = fontWeight === 'bold' || (typeof fontWeight === 'number' && fontWeight >= 700);

  const font = await ctx.getFont(style.fontFamily, isBold);
  const { r, g, b } = hexToRgb(color);

  const blockStyle = resolveStyles(block);
  const textX = box.x + blockStyle.paddingLeft;
  // Convert top-left Y to bottom-left Y for PDF rendering
  let textY = page.getHeight() - (box.y + blockStyle.paddingTop + fontSize);

  const lines = (block.text || '').split('\n');
  const lineHeight = fontSize * (style.lineHeight || 1.2);

  for (const line of lines) {
    let alignedX = textX;
    if (style.textAlign === 'center') {
      const textWidth = font.widthOfTextAtSize(line, fontSize);
      alignedX = box.x + (box.width - textWidth) / 2;
    } else if (style.textAlign === 'right') {
      const textWidth = font.widthOfTextAtSize(line, fontSize);
      alignedX = box.x + box.width - textWidth - blockStyle.paddingRight;
    }

    page.drawText(line, {
      x: alignedX,
      y: textY,
      size: fontSize,
      font,
      color: rgb(r, g, b),
    });

    textY -= lineHeight;
  }

  renderBorders(page, box, block);
}

/**
 * Renders borders for a block
 * Note: box coordinates are in top-left system, converted to PDF's bottom-left system
 */
function renderBorders(page: PDFPage, box: ComputedBox, block: Block): void {
  const style = resolveStyles(block);

  if (style.borderTop) {
    const { r, g, b } = hexToRgb(style.borderTop.color);
    // Convert top-left Y to bottom-left Y
    const y = page.getHeight() - box.y;

    page.drawLine({
      start: { x: box.x, y },
      end: { x: box.x + box.width, y },
      thickness: style.borderTop.width,
      color: rgb(r, g, b),
    });
  }

  if (style.borderRight) {
    const { r, g, b } = hexToRgb(style.borderRight.color);
    const x = box.x + box.width;

    page.drawLine({
      start: { x, y: page.getHeight() - box.y },
      end: { x, y: page.getHeight() - (box.y + box.height) },
      thickness: style.borderRight.width,
      color: rgb(r, g, b),
    });
  }

  if (style.borderBottom) {
    const { r, g, b } = hexToRgb(style.borderBottom.color);
    const y = page.getHeight() - (box.y + box.height);

    page.drawLine({
      start: { x: box.x, y },
      end: { x: box.x + box.width, y },
      thickness: style.borderBottom.width,
      color: rgb(r, g, b),
    });
  }

  if (style.borderLeft) {
    const { r, g, b } = hexToRgb(style.borderLeft.color);
    const x = box.x;

    page.drawLine({
      start: { x, y: page.getHeight() - box.y },
      end: { x, y: page.getHeight() - (box.y + box.height) },
      thickness: style.borderLeft.width,
      color: rgb(r, g, b),
    });
  }
}

/**
 * Renders a computed box
 */
async function renderBox(
  page: PDFPage,
  box: ComputedBox,
  ctx: RendererContext
): Promise<void> {
  const block = box.block;

  if (block.type === 'text') {
    await renderTextBlock(page, box, block as TextBlock, ctx);
  }
}

/**
 * Renders boxes to a PDF page
 */
export async function renderPage(page: PDFPage, boxes: ComputedBox[], ctx: RendererContext): Promise<void> {
  for (const box of boxes) {
    await renderBox(page, box, ctx);
  }
}
