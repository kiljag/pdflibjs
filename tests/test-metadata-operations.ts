/**
 * Test Case 2: Metadata and Page Operations
 * Tests metadata operations and page management on PDFTree
 */

import * as Tree from '../src/tree';
import { TextBlock } from '../src';
import { PageConfig } from '../src/tree/models/PDFTree';

// Helper function for assertions
function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`Assertion failed: ${message}\nExpected: ${expected}\nActual: ${actual}`);
  }
}

function assertArrayEqual<T>(actual: T[], expected: T[], message: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Assertion failed: ${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
}

console.log('='.repeat(60));
console.log('TEST CASE 2: Metadata and Page Operations');
console.log('='.repeat(60));

// Test 1: setMetadata
console.log('\n[Test 2.1] setMetadata');
let tree = Tree.createPDFTree();

tree = Tree.setMetadata(tree, { title: 'Test Document', author: 'John Doe' });
assertEqual(tree.metadata.title, 'Test Document', 'Title should be set');
assertEqual(tree.metadata.author, 'John Doe', 'Author should be set');

tree = Tree.setMetadata(tree, { subject: 'Testing' });
assertEqual(tree.metadata.title, 'Test Document', 'Title should still exist');
assertEqual(tree.metadata.subject, 'Testing', 'Subject should be set');

console.log('✓ setMetadata works correctly');

// Test 2: replaceMetadata
console.log('\n[Test 2.2] replaceMetadata');
tree = Tree.replaceMetadata(tree, { title: 'New Document' });
assertEqual(tree.metadata.title, 'New Document', 'Title should be replaced');
assert(tree.metadata.author === undefined, 'Author should be cleared');
assert(tree.metadata.subject === undefined, 'Subject should be cleared');

console.log('✓ replaceMetadata works correctly');

// Test 3: setTitle, setAuthor, setSubject, setCreator
console.log('\n[Test 2.3] setTitle, setAuthor, setSubject, setCreator');
tree = Tree.setTitle(tree, 'My Title');
assertEqual(tree.metadata.title, 'My Title', 'Title should be set');

tree = Tree.setAuthor(tree, 'Jane Smith');
assertEqual(tree.metadata.author, 'Jane Smith', 'Author should be set');

tree = Tree.setSubject(tree, 'PDF Generation');
assertEqual(tree.metadata.subject, 'PDF Generation', 'Subject should be set');

tree = Tree.setCreator(tree, 'pdflibjs');
assertEqual(tree.metadata.creator, 'pdflibjs', 'Creator should be set');

console.log('✓ setTitle, setAuthor, setSubject, setCreator work correctly');

// Test 4: setKeywords, addKeyword, removeKeyword
console.log('\n[Test 2.4] setKeywords, addKeyword, removeKeyword');
tree = Tree.setKeywords(tree, ['pdf', 'typescript', 'library']);
assertArrayEqual(tree.metadata.keywords || [], ['pdf', 'typescript', 'library'], 'Keywords should be set');

tree = Tree.addKeyword(tree, 'immutable');
assertArrayEqual(tree.metadata.keywords || [], ['pdf', 'typescript', 'library', 'immutable'], 'Keyword should be added');

tree = Tree.removeKeyword(tree, 'typescript');
assertArrayEqual(tree.metadata.keywords || [], ['pdf', 'library', 'immutable'], 'Keyword should be removed');

console.log('✓ setKeywords, addKeyword, removeKeyword work correctly');

// Test 5: clearMetadata
console.log('\n[Test 2.5] clearMetadata');
tree = Tree.clearMetadata(tree);
assert(tree.metadata.title === undefined, 'Title should be cleared');
assert(tree.metadata.author === undefined, 'Author should be cleared');
assert(tree.metadata.keywords === undefined, 'Keywords should be cleared');
assertEqual(Object.keys(tree.metadata).length, 0, 'Metadata should be empty');

console.log('✓ clearMetadata works correctly');

// Test 6: Page operations - addPage, addPageAt
console.log('\n[Test 2.6] addPage, addPageAt');
tree = Tree.createPDFTree(); // Reset
assertEqual(tree.pages.length, 1, 'Should have 1 default page');

tree = Tree.addPage(tree, { width: 612, height: 792, unit: 'pt' });
assertEqual(tree.pages.length, 2, 'Should have 2 pages after addPage');
assertEqual(tree.pages[1].width, 612, 'Second page should have Letter width');

tree = Tree.addPageAt(tree, { width: 612, height: 1008, unit: 'pt' }, 1);
assertEqual(tree.pages.length, 3, 'Should have 3 pages after addPageAt');
assertEqual(tree.pages[1].height, 1008, 'Page at index 1 should be Legal height');
assertEqual(tree.pages[2].width, 612, 'Page at index 2 should match Letter width');

console.log('✓ addPage, addPageAt work correctly');

// Test 7: removePageAt
console.log('\n[Test 2.7] removePageAt');
tree = Tree.removePageAt(tree, 1);
assertEqual(tree.pages.length, 2, 'Should have 2 pages after removePageAt');
assertEqual(tree.pages[1].width, 612, 'Second page should retain Letter width');

console.log('✓ removePageAt works correctly');

// Test 8: updatePageAt, updatePageAtWith
console.log('\n[Test 2.8] updatePageAt, updatePageAtWith');
tree = Tree.updatePageAt(tree, 0, { width: 612, height: 1008, unit: 'pt' });
assertEqual(tree.pages[0].height, 1008, 'First page should be updated to Legal height');

tree = Tree.updatePageAtWith(tree, 1, (page: PageConfig) => ({
  ...page,
  width: page.width + 20,
}));
assertEqual(tree.pages[1].width, 632, 'Second page width should be updated');

console.log('✓ updatePageAt, updatePageAtWith work correctly');

// Test 9: setPages, getPageCount, getPageAt
console.log('\n[Test 2.9] setPages, getPageCount, getPageAt');
tree = Tree.setPages(tree, [
  { width: 595.28, height: 841.89, unit: 'pt' },
  { width: 595.28, height: 841.89, unit: 'pt' },
  { width: 595.28, height: 841.89, unit: 'pt' },
]);
assertEqual(Tree.getPageCount(tree), 3, 'Should have 3 pages');

const page = Tree.getPageAt(tree, 1);
assertEqual(page?.width, 595.28, 'Page at index 1 should use default width');

console.log('✓ setPages, getPageCount, getPageAt work correctly');

// Test 10: JSON operations with metadata
console.log('\n[Test 2.10] JSON operations with metadata');
tree = Tree.createPDFTree({
  metadata: {
    title: 'JSON Test',
    author: 'Test Author',
    keywords: ['json', 'test'],
  },
});

tree = Tree.addElement(tree, new TextBlock({ text: 'Test content', style: { fontSize: 12 } }));

const json = Tree.toJSON(tree);
assert(json.metadata !== undefined, 'JSON should have metadata');
assertEqual(json.metadata.title, 'JSON Test', 'JSON metadata should have title');

const jsonString = Tree.toString(tree);
assert(jsonString.includes('JSON Test'), 'JSON string should contain title');

const restoredTree = Tree.fromJSON(json);
assertEqual(restoredTree.metadata.title, 'JSON Test', 'Restored tree should have metadata');
assertEqual(restoredTree.metadata.author, 'Test Author', 'Restored tree should have author');
assertArrayEqual(restoredTree.metadata.keywords || [], ['json', 'test'], 'Restored tree should have keywords');

const restoredFromString = Tree.fromString(jsonString);
assertEqual(restoredFromString.metadata.title, 'JSON Test', 'Tree from string should have metadata');

console.log('✓ JSON operations with metadata work correctly');

console.log('\n' + '='.repeat(60));
console.log('✓ ALL METADATA AND PAGE OPERATION TESTS PASSED!');
console.log('='.repeat(60));
