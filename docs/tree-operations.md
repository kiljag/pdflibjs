# Tree Operations Guide

The `tree` module gives you immutable helpers for building and updating PDF documents without mutating state. Every operation returns a brand-new tree, which plays nicely with Redux, React hooks, and any architecture that relies on predictable data flow.

---

## Why Immutable Trees?

- **Predictable state** – a new tree for every change makes debugging and undo/redo trivial.
- **Pure functions** – every helper is stateless and easy to test in isolation.
- **Time-travel ready** – works out of the box with Redux DevTools and similar tooling.
- **Type-safe** – the helpers are fully typed and pair with the block classes in `src/blocks`.

---

## Module Map

```
src/tree/
├── models/
│   └── PDFTree.ts          # Core interfaces & factory helpers
└── ops/
    ├── addElement.ts       # Element creation helpers
    ├── removeElement.ts    # Element removal helpers
    ├── updateElement.ts    # Element mutation helpers
    ├── moveElement.ts      # Element reordering helpers
    ├── pageOps.ts          # Page-level operations
    ├── metadataOps.ts      # Document metadata helpers
    ├── queryOps.ts         # Read-only selectors
    └── index.ts            # Barrel file exposing all ops
```

Import everything via the namespace export:

```typescript
import * as Tree from 'pdflibjs/tree';
```

---

## Quick Start

```typescript
import { Tree, TextBlock } from 'pdflibjs';

let tree = Tree.createPDFTree(); // pages + metadata defaults

tree = Tree.addElement(
  tree,
  new TextBlock({ text: 'Hello PDF!', style: { fontSize: 16 } })
);

tree = Tree.setMetadata(tree, { title: 'Invoice #42' });

tree = Tree.updateElementAtWith(tree, 0, el => ({
  ...el,
  text: 'Updated text',
}));
```

Each helper accepts a `PDFTree` as the first argument and returns the next `PDFTree`.

---

## Core Operation Categories

### Element Helpers

| Helper | Purpose |
|--------|---------|
| `addElement`, `addElementAt`, `addElements` | Append or insert elements |
| `removeElement`, `removeElementAt`, `removeElementById`, `clearElements` | Remove elements |
| `updateElementAt`, `updateElementById`, `updateElementAtWith`, `updateElementByIdWith` | Replace or transform elements |

### Reordering Helpers

| Helper | Purpose |
|--------|---------|
| `moveElement`, `moveElementUp`, `moveElementDown` | Shift elements within the list |
| `moveElementToStart`, `moveElementToEnd` | Jump an element to either edge |

### Page Helpers

| Helper | Purpose |
|--------|---------|
| `addPage`, `addPageAt` | Append or insert pages |
| `removePageAt` | Remove a page by index |
| `updatePageAt`, `updatePageAtWith`, `setPages` | Replace or bulk update pages |

### Metadata Helpers

| Helper | Purpose |
|--------|---------|
| `setMetadata`, `replaceMetadata`, `clearMetadata` | Merge, replace, or clear document metadata |
| `setTitle`, `setAuthor`, `setSubject`, `setCreator` | Convenience setters |
| `setKeywords`, `addKeyword`, `removeKeyword` | Keyword management |

### Query Helpers (Pure Selectors)

| Helper | Purpose |
|--------|---------|
| `findElementById`, `findElementsByType`, `findElements` | Look up elements |
| `findElementIndex`, `findElementIndexById` | Resolve positions |
| `getElementAt`, `getElementCount`, `hasElements` | Inspect the element list |
| `getPageAt`, `getPageCount` | Inspect pages |

### JSON Helpers

| Helper | Purpose |
|--------|---------|
| `toJSON`, `toString` | Serialize a tree |
| `fromJSON`, `fromString` | Deserialize into a tree |

---

## Usage Patterns

### Redux Reducer

```typescript
import { Tree, PDFTree, Block } from 'pdflibjs';

type Action =
  | { type: 'pdf/add'; element: Block }
  | { type: 'pdf/removeAt'; index: number }
  | { type: 'pdf/title'; title: string };

export function pdfReducer(
  state: PDFTree = Tree.createPDFTree(),
  action: Action
): PDFTree {
  switch (action.type) {
    case 'pdf/add':
      return Tree.addElement(state, action.element);
    case 'pdf/removeAt':
      return Tree.removeElementAt(state, action.index);
    case 'pdf/title':
      return Tree.setTitle(state, action.title);
    default:
      return state;
  }
}
```

### React State Hook

```typescript
import { useState } from 'react';
import { Tree, TextBlock } from 'pdflibjs';

export function usePdfTree() {
  const [tree, setTree] = useState(() => Tree.createPDFTree());

  const addText = (text: string) =>
    setTree(current =>
      Tree.addElement(
        current,
        new TextBlock({ text, style: { fontSize: 12 } })
      )
    );

  const removeAt = (index: number) =>
    setTree(current => Tree.removeElementAt(current, index));

  return { tree, addText, removeAt };
}
```

---

## Chaining Helpers

Immutability makes it simple to compose changes:

```typescript
import { Tree, TextBlock } from 'pdflibjs';

const tree = [
  Tree.createPDFTree,
  (t: any) => Tree.setMetadata(t, { title: 'Proposal' }),
  (t: any) => Tree.addElement(t, new TextBlock({ text: 'Heading' })),
  (t: any) => Tree.addElement(t, new TextBlock({ text: 'Body copy' })),
].reduce((state, fn) => fn(state), {} as any);
```

---

## Running the Demo

```bash
npm run example:tree
```

This command walks through the main operations and prints each intermediate tree, giving you a quick feel for the API.

---

## More Resources

- `src/tree/models/PDFTree.ts` – full type definitions
- `examples/invoice.ts`, `examples/analytics-report.ts`, `examples/creative-portfolio.ts` – practical end-to-end generators
- `tests/test-element-operations.ts` – practical test coverage
