# Tree Operations Tests

Unit tests for PDFTree and all tree helper functions.

## Running Tests

```bash
npm run test:tree
```

Or run individual test files with ts-node:

```bash
npx ts-node tests/tree/element-operations.test.ts
npx ts-node tests/tree/metadata-operations.test.ts
npx ts-node tests/tree/page-operations.test.ts
npx ts-node tests/tree/query-operations.test.ts
npx ts-node tests/tree/serialization.test.ts
```

## Test Coverage

### Element Operations (`element-operations.test.ts`)
- ✓ addElement and addElements
- ✓ addElementAt
- ✓ removeElement, removeElementAt, removeElementById
- ✓ clearElements
- ✓ updateElementAt and updateElementById
- ✓ updateElementAtWith and updateElementByIdWith
- ✓ moveElement

### Metadata Operations (`metadata-operations.test.ts`)
- ✓ setMetadata (merge)
- ✓ replaceMetadata
- ✓ setTitle, setAuthor, setSubject, setCreator
- ✓ setKeywords, addKeyword, removeKeyword
- ✓ clearMetadata
- ✓ Full metadata workflow

### Page Operations (`page-operations.test.ts`)
- ✓ addPage
- ✓ addPageAt
- ✓ removePageAt
- ✓ updatePageAt
- ✓ updatePageAtWith
- ✓ setPages
- ✓ getPageCount and getPageAt

### Query Operations (`query-operations.test.ts`)
- ✓ findElementById
- ✓ findElementIndexById
- ✓ findElementIndex
- ✓ findElementsByType
- ✓ findElements with predicate
- ✓ getElementAt
- ✓ getElementCount
- ✓ hasElements
- ✓ hasElementById

### Serialization (`serialization.test.ts`)
- ✓ serializePDFTree and deserializePDFTree
- ✓ pdfTreeToString and pdfTreeFromString
- ✓ clonePDFTree
- ✓ Round-trip with complex structure

## Test Structure

Each test file follows this pattern:

1. Import necessary tree helpers and block creators
2. Define assertion helper functions
3. Run sequential tests with clear test numbers and descriptions
4. Assert expected behavior
5. Print success messages

All tests use plain TypeScript with no testing framework dependencies, making them simple and easy to understand.
