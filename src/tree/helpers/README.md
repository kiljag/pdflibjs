# Tree Helper Functions

Utility functions for creating and serializing PDFTree instances.

## Purpose

The `helpers` directory contains **utility functions** that are not operations (ops), but rather:
- **Factory functions** - Create new PDFTree instances
- **Serialization functions** - Convert trees to/from JSON

For tree **operations** (add, remove, update, etc.), see [../ops/](../ops/).

## Helper Functions

### Factory Functions (`treeFactory.ts`)

Create and initialize PDFTree instances:

```typescript
import { createPDFTree, createEmptyPDFTree } from 'pdflibjs/tree';

// Create with defaults (includes one A4 page)
const tree = createPDFTree();

// Create with custom properties
const customTree = createPDFTree({
  pages: [{ size: 'Letter', margins: '24pt' }],
  elements: [],
  metadata: { title: 'My Document' }
});

// Create completely empty tree (no default page)
const emptyTree = createEmptyPDFTree();
```

### Serialization Functions (`treeSerializer.ts`)

Convert PDFTree to/from JSON:

```typescript
import {
  serializePDFTree,
  deserializePDFTree,
  pdfTreeToString,
  pdfTreeFromString,
  clonePDFTree
} from 'pdflibjs/tree';

// Serialize to JSON object
const json = serializePDFTree(tree);

// Deserialize from JSON object
const restored = deserializePDFTree(json);

// Serialize to JSON string
const jsonString = pdfTreeToString(tree, true); // true = pretty print

// Deserialize from JSON string
const fromString = pdfTreeFromString(jsonString);

// Clone a tree (deep copy)
const cloned = clonePDFTree(tree);
```

## Operations (ops)

For tree operations like adding/removing/updating elements, see [../ops/](../ops/):
- `addElement`, `removeElement`, `updateElement` - Element operations
- `setMetadata`, `setTitle`, `setAuthor` - Metadata operations
- `addPage`, `removePage`, `updatePage` - Page operations
- `findElementById`, `findElementsByType` - Query operations

## Structure

```
tree/
├── models/
│   └── PDFTree.ts         # PDFTree interface (data only)
├── helpers/               # THIS DIRECTORY - utility functions
│   ├── treeFactory.ts     # Create trees
│   ├── treeSerializer.ts  # Serialize/deserialize
│   └── index.ts
├── ops/                   # Operations (Redux-compatible)
│   ├── addElement.ts
│   ├── removeElement.ts
│   ├── updateElement.ts
│   ├── moveElement.ts
│   ├── metadataOps.ts
│   ├── pageOps.ts
│   ├── queryOps.ts
│   └── index.ts
└── index.ts               # Main export
```

## Design Principles

1. **Helpers vs Ops**:
   - **Helpers** = Utilities (create, serialize)
   - **Ops** = State transformations (add, remove, update)

2. **Immutability**: All functions return new data structures

3. **Purity**: No side effects

4. **Type Safety**: Full TypeScript support

## Examples

### Creating a Tree

```typescript
import { createPDFTree } from 'pdflibjs/tree';

const tree = createPDFTree({
  metadata: {
    title: 'My Document',
    author: 'John Doe'
  }
});
```

### Serializing for Storage

```typescript
import { pdfTreeToString, pdfTreeFromString } from 'pdflibjs/tree';

// Save to file
const jsonString = pdfTreeToString(tree);
await fs.writeFile('document.json', jsonString);

// Load from file
const jsonString = await fs.readFile('document.json', 'utf-8');
const tree = pdfTreeFromString(jsonString);
```

### Cloning

```typescript
import { clonePDFTree } from 'pdflibjs/tree';

const backup = clonePDFTree(originalTree);
```
