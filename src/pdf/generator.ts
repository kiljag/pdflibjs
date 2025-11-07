/**
 * PDF Generator
 * Main PDF generation logic
 */

import { PDFDocument } from 'pdf-lib';
import { PDFTree, PageConfig, DEFAULT_PAGE_CONFIG, PageUnit } from '../tree/models/PDFTree';
import { pdfTreeFromString, deserializePDFTree } from '../tree/helpers/treeSerializer';
import { computeLayout } from './layoutEngine';
import { renderPage, RendererContext } from './renderer';

function convertToPoints(value: number, unit: PageUnit = 'pt'): number {
  switch (unit) {
    case 'pt':
      return value;
    case 'in':
      return value * 72;
    case 'mm':
      return value * 72 / 25.4;
    case 'cm':
      return value * 72 / 2.54;
    default:
      return value;
  }
}

function resolvePageDimensions(page: PageConfig | undefined): [number, number] {
  const config = page ?? DEFAULT_PAGE_CONFIG;
  const unit = config.unit ?? DEFAULT_PAGE_CONFIG.unit ?? 'pt';
  return [
    convertToPoints(config.width ?? DEFAULT_PAGE_CONFIG.width, unit),
    convertToPoints(config.height ?? DEFAULT_PAGE_CONFIG.height, unit),
  ];
}

/**
 * Options for PDF generation
 */
export interface GenerateOptions {
  /**
   * PDF tree containing the document structure
   */
  tree: PDFTree;
}

/**
 * Generates a PDF document from a PDFTree
 * @param options - Generation options containing the tree
 * @returns Promise resolving to PDF bytes (Uint8Array)
 *
 * @example
 * ```typescript
 * import { generatePDF, Tree, TextBlock } from 'pdflibjs';
 *
 * const tree = Tree.createPDFTree();
 * tree = Tree.addElement(tree, new TextBlock({ text: 'Hello PDF!' }));
 * const pdfBytes = await generatePDF({ tree });
 * ```
 */
export async function generatePDF(options: GenerateOptions): Promise<Uint8Array> {
  const { tree } = options;
  console.log('[Generator] Starting PDF generation...');

  // Create PDF document
  console.log('[Generator] Creating PDFDocument...');
  const pdfDoc = await PDFDocument.create();
  console.log('[Generator] PDFDocument created');
  const ctx = new RendererContext(pdfDoc);

  // Set metadata if provided
  if (tree.metadata) {
    console.log('[Generator] Setting metadata...');
    if (tree.metadata.title) pdfDoc.setTitle(tree.metadata.title);
    if (tree.metadata.author) pdfDoc.setAuthor(tree.metadata.author);
    if (tree.metadata.subject) pdfDoc.setSubject(tree.metadata.subject);
    if (tree.metadata.keywords) pdfDoc.setKeywords(tree.metadata.keywords);
    if (tree.metadata.creator) pdfDoc.setCreator(tree.metadata.creator);
  }

  // Get page configuration
  const pageConfig = tree.pages[0] || { ...DEFAULT_PAGE_CONFIG };
  const [pageWidth, pageHeight] = resolvePageDimensions(pageConfig);
  const contentWidth = pageWidth;

  const blocks = tree.elements;
  console.log(`[Generator] Processing ${blocks.length} blocks...`);

  // Step 1: Layout pass - compute element positions and dimensions
  console.log('[Generator] Computing layout...');
  const boxes = computeLayout(blocks, contentWidth);
  console.log(`[Generator] Layout computed for ${boxes.length} boxes`);

  // Step 2: Create single page and render
  console.log('[Generator] Creating single page PDF...');
  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  // Render boxes to page
  console.log(`[Generator] Rendering ${boxes.length} boxes...`);
  await renderPage(page, boxes, ctx);
  console.log('[Generator] Page rendered');

  // Save and return PDF bytes
  console.log('[Generator] Saving PDF...');
  const pdfBytes = await pdfDoc.save();
  console.log(`[Generator] PDF saved (${pdfBytes.length} bytes)`);
  return pdfBytes;
}

/**
 * Generates a PDF and saves it to a file
 * @param tree - PDFTree to render
 * @param filePath - Output file path
 *
 * @example
 * ```typescript
 * import { generatePDFFile, Tree, TextBlock } from 'pdflibjs';
 *
 * let tree = Tree.createPDFTree();
 * tree = Tree.addElement(tree, new TextBlock({ text: 'Hello!' }));
 * await generatePDFFile(tree, './output.pdf');
 * ```
 */
export async function generatePDFFile(tree: PDFTree, filePath: string): Promise<void> {
  const fs = await import('fs/promises');
  const pdfBytes = await generatePDF({ tree });
  await fs.writeFile(filePath, pdfBytes);
}

/**
 * Generates a PDF from a JSON string representation of PDFTree
 * @param jsonString - JSON string containing the tree structure
 * @returns Promise resolving to PDF bytes
 *
 * @example
 * ```typescript
 * import { generatePDFFromJSON } from 'pdflibjs';
 *
 * const jsonString = '{"pages":[...],"elements":[...],"metadata":{}}';
 * const pdfBytes = await generatePDFFromJSON(jsonString);
 * ```
 */
export async function generatePDFFromJSON(jsonString: string): Promise<Uint8Array> {
  const tree = pdfTreeFromString(jsonString);
  return generatePDF({ tree });
}

/**
 * Generates a PDF from a JSON object representation of PDFTree
 * @param json - JSON object containing the tree structure
 * @returns Promise resolving to PDF bytes
 *
 * @example
 * ```typescript
 * import { generatePDFFromObject } from 'pdflibjs';
 *
 * const json = { pages: [...], elements: [...], metadata: {} };
 * const pdfBytes = await generatePDFFromObject(json);
 * ```
 */
export async function generatePDFFromObject(json: any): Promise<Uint8Array> {
  const tree = deserializePDFTree(json);
  return generatePDF({ tree });
}
