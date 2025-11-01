# pdflibjs

A TypeScript library for generating PDF documents using a block-based schema with flexbox layout support.

## Features

- **Block-based API**: Compose documents with a small, HTML-like block set (`TextBlock`, `ImageBlock`, `TableBlock`).
- **Immutable PDFTree**: A predictable tree structure with pure helper functions ideal for Redux, Zustand, and hooks.
- **Style utilities**: Helpers for resolving lengths, spacing, and borders in familiar CSS-like syntax.
- **Automatic pagination**: Split long content across pages with configurable page dimensions.
- **Rich tables**: Column sizing, zebra stripes, headers, and footers without extra dependencies.
- **Type-safe everywhere**: Written in TypeScript with exported types for blocks, layout, and tree helpers.

## Architecture

### Blocks (`src/blocks/`)

Blocks are the concrete building units that mirror a simplified DOM:

- `Block` – base class with shared style metadata (`width`, `margin`, `border`, etc.)
- `TextBlock` – styled text with font, alignment, and overflow options
- `ImageBlock` – bitmap images with `objectFit` (`contain`, `cover`, `fill`)
- `TableBlock` – tabular data with column sizing, headers, footers, and zebra styling

Each block exposes `toJSON()` / `fromJSON()` helpers so you can persist or hydrate document structures easily.

### Tree Operations (`src/tree/`)

The tree module wraps blocks in an immutable `PDFTree` and provides pure helper functions:

- `createPDFTree`, `toJSON`, `fromJSON`
- Element helpers: `addElement`, `removeElement`, `updateElement`, `moveElement`
- Page helpers: `addPage`, `updatePage`, `setPages`
- Metadata helpers: `setMetadata`, `setTitle`, `setAuthor`, `setKeywords`
- Query helpers: `findElementById`, `getElementAt`, `getElementCount`, `hasElements`

All helpers return new trees, making them ideal for Redux reducers, React state hooks, or any immutable workflow. See [Tree Module Documentation](src/tree/README.md) and [docs/tree-operations.md](docs/tree-operations.md) for more details.

## Installation

```bash
npm install
```

## Quick Start

```typescript
import { Tree, TextBlock, generatePDFFile } from 'pdflibjs';

let tree = Tree.createPDFTree({
  pages: [{ size: 'A4', margins: '36pt' }],
  metadata: {
    title: 'My Document',
    author: 'Your Name',
  },
});

tree = Tree.addElement(
  tree,
  new TextBlock({
    text: 'Hello, World!',
    style: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  })
);

await generatePDFFile(tree, 'output.pdf');
```

### Quick Start (Immutable/Redux)

For Redux or immutable state management, use the Tree operations:

```typescript
import { Tree, TextBlock, generatePDF } from 'pdflibjs';

let tree = Tree.createPDFTree({
  metadata: { title: 'My Document' }
});

tree = Tree.addElement(tree, new TextBlock({
  text: 'Hello, World!',
  style: { fontSize: 24, fontWeight: 'bold' }
}));

tree = Tree.setMetadata(tree, { author: 'John Doe' });

const pdfBytes = await generatePDF({ tree });
```

**All operations are immutable** - perfect for Redux, Zustand, and React state!

Run the sample generators:
```bash
npm run test:invoice
npm run test:analytics
npm run test:portfolio
```
## Using Blocks

### TextBlock

```typescript
const text = new TextBlock({
  text: 'Sample text',
  style: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  },
});
```

### ImageBlock

```typescript
const image = new ImageBlock({
  src: 'assets/logo.png',
  objectFit: 'contain',
  style: {
    width: '120pt',
    height: '60pt',
    margin: '12pt auto',
  },
});
```

### TableBlock

```typescript
const table = new TableBlock({
  columns: [
    { key: 'name', width: '2fr', align: 'left' },
    { key: 'amount', width: '1fr', align: 'right' },
  ],
  header: {
    name: 'Name',
    amount: 'Amount',
  },
  rows: [
    { name: 'Item 1', amount: '$100.00' },
    { name: 'Item 2', amount: '$200.00' },
  ],
  footer: {
    name: 'Total',
    amount: '$300.00',
  },
  tableStyle: {
    cellPadding: '6pt 8pt',
    borders: {
      inner: '0.5pt solid #ddd',
      outer: '1pt solid #000',
    },
    zebra: true,
  },
});
```

## PDFTree - Document Structure

`PDFTree` is a plain data object managed through the `Tree` helpers:

```typescript
import { Tree, TextBlock, generatePDFFromJSON, generatePDFFromObject } from 'pdflibjs';

let tree = Tree.createPDFTree({
  pages: [{ size: 'A4', margins: '36pt' }],
  metadata: {
    title: 'My Document',
    author: 'Your Name',
  },
});

tree = Tree.addElement(tree, new TextBlock({ text: 'Hello JSON!' }));

// Serialize / deserialize
const json = Tree.toJSON(tree);
const jsonString = Tree.toString(tree);

const hydratedTree = Tree.fromJSON(json);
const hydratedTree2 = Tree.fromString(jsonString);

// Generate PDFs directly from JSON
const pdfBytes = await generatePDFFromJSON(jsonString);
const pdfBytes2 = await generatePDFFromObject(json);
```

## Styling

### Box Model

All elements support standard box model properties:

```typescript
style: {
  width: '200pt',
  height: '100pt',
  margin: '10pt 20pt',
  padding: '8pt',
  border: '1pt solid #000',
}
```

### Units

- `pt` - Points (PDF native unit)
- `px` - Pixels (converted to points at 0.75pt per pixel)
- `auto` - Automatic sizing

### Colors

- Hex: `#RRGGBB`
- Named: `black`, `white`, `red`, `green`, `blue`, `gray`
- RGB: `rgb(255, 0, 0)`

## Examples and Tests

### Invoice Example

See `examples/invoice.ts` for a complete invoice example using PDFTree and elements.

Run the example:

```bash
npm run example
```

This will:
1. Build the document using elements
2. Print the PDFTree JSON to console
3. Generate `examples/invoice.pdf`

### Test Cases

The library includes comprehensive test cases that demonstrate the complete workflow:

**Test 1: Simple Document** - Basic text, dates, and styling
```bash
npm run test:1
```

**Test 2: Complex Layout** - Flexbox containers and nested structures
```bash
npm run test:2
```

**Test 3: Data Elements** - Tables and bank info elements
```bash
npm run test:3
```

**Run All Tests**
```bash
npm test
```

Each test:
1. Creates elements programmatically
2. Builds a PDFTree
3. Exports to JSON
4. Reconstructs from JSON
5. Generates a PDF
6. Saves both JSON and PDF to `/files` directory

See the scripts in `examples/` (`invoice.ts`, `analytics-report.ts`, `creative-portfolio.ts`) for full end-to-end samples.

## API Reference

### Core Functions

#### `generatePDF(options: GenerateOptions): Promise<Uint8Array>`
Generates a PDF from a PDFTree.

#### `generatePDFFile(tree: PDFTree, filePath: string): Promise<void>`
Generates a PDF and saves it to a file.

#### `generatePDFFromJSON(jsonString: string): Promise<Uint8Array>`
Generates a PDF from a JSON string representation of PDFTree.

#### `generatePDFFromObject(json: any): Promise<Uint8Array>`
Generates a PDF from a JSON object representation of PDFTree.

### Block Classes

- `Block` – Base class with shared style metadata
- `TextBlock` – Styled text
- `ImageBlock` – Bitmap images
- `TableBlock` – Tabular data
- `PDFTree` – Immutable document root (managed via `Tree` helpers)

## Rendering Pipeline

The library uses a three-pass rendering pipeline:

1. **Layout pass** – Computes widths/heights using the block metadata
2. **Pagination pass** – Splits blocks across pages according to page size
3. **Painting pass** – Draws text, images, and tables via pdf-lib

## Building

```bash
npm run build
```

Compiled files will be in the `dist/` directory.

## Development

```bash
npm run dev
```

Runs TypeScript compiler in watch mode.

## For React UI Developers

## License

MIT
