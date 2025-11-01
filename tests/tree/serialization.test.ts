/**
 * Serialization Tests
 * Tests PDFTree serialization and deserialization
 */

import * as Tree from '../../src/tree';
import { createTextBlock } from '../../src/blocks/ops/textBlockOps';

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

console.log('='.repeat(60));
console.log('TEST: PDFTree Serialization');
console.log('='.repeat(60));

// Test 1: serializePDFTree and deserializePDFTree
console.log('\n[Test 1] serializePDFTree and deserializePDFTree');
let tree = Tree.createPDFTree();

tree = Tree.setTitle(tree, 'Test Document');
tree = Tree.setAuthor(tree, 'Test Author');

tree = Tree.addElements(tree, [
  createTextBlock({ id: 'text-1', text: 'Hello World' }),
  createTextBlock({ id: 'text-2', text: 'Second text' }),
  createTextBlock({ id: 'text-3', text: 'Third text' })
]);

const json = Tree.serializePDFTree(tree);
assert(typeof json === 'object', 'Serialized tree should be an object');
assertEqual(json.metadata.title, 'Test Document', 'Title should be preserved');
assertEqual(json.elements.length, 3, 'Should have 3 text elements');

const restored = Tree.deserializePDFTree(json);
assertEqual(restored.metadata.title, 'Test Document', 'Title should be restored');
assertEqual(restored.metadata.author, 'Test Author', 'Author should be restored');
assertEqual(restored.elements.length, 3, 'Should have 3 text elements');
assertEqual(restored.elements[0].id, 'text-1', 'Element IDs should be preserved');

console.log('✓ serializePDFTree and deserializePDFTree work correctly');

// Test 2: pdfTreeToString and pdfTreeFromString
console.log('\n[Test 2] pdfTreeToString and pdfTreeFromString');
const jsonString = Tree.pdfTreeToString(tree);
assert(typeof jsonString === 'string', 'Should produce a string');
assert(jsonString.includes('Test Document'), 'String should contain metadata');

const restoredFromString = Tree.pdfTreeFromString(jsonString);
assertEqual(restoredFromString.metadata.title, 'Test Document', 'Title should be restored from string');
assertEqual(restoredFromString.elements.length, 3, 'Should have 3 elements');

console.log('✓ pdfTreeToString and pdfTreeFromString work correctly');

// Test 3: clonePDFTree
console.log('\n[Test 3] clonePDFTree');
const cloned = Tree.clonePDFTree(tree);

assert(cloned !== tree, 'Cloned tree should be a different object');
assertEqual(cloned.metadata.title, tree.metadata.title, 'Metadata should be cloned');
assertEqual(cloned.elements.length, tree.elements.length, 'Elements should be cloned');

// Modify clone and ensure original is unaffected
const modifiedClone = Tree.setTitle(cloned, 'Modified Title');
assertEqual(modifiedClone.metadata.title, 'Modified Title', 'Clone should be modified');
assertEqual(tree.metadata.title, 'Test Document', 'Original should be unchanged');

console.log('✓ clonePDFTree works correctly');

// Test 4: Round-trip with complex structure
console.log('\n[Test 4] Round-trip with complex structure');
let complexTree = Tree.createPDFTree();

complexTree = Tree.setMetadata(complexTree, {
  title: 'Complex Document',
  author: 'Jane Doe',
  subject: 'Testing',
  keywords: ['test', 'pdf', 'complex'],
  creator: 'PDFLibJS'
});

complexTree = Tree.addPage(complexTree, { size: 'Letter', margins: '24pt' });

complexTree = Tree.addElements(complexTree, [
  createTextBlock({
    id: 'title',
    text: 'Title Text',
    style: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' }
  }),
  createTextBlock({
    id: 'subtitle',
    text: 'Subtitle Text',
    style: { fontSize: 16 }
  }),
  createTextBlock({
    id: 'body',
    text: 'Body text content',
    style: { fontSize: 12 }
  })
]);

const complexJson = Tree.serializePDFTree(complexTree);
const restoredComplex = Tree.deserializePDFTree(complexJson);

assertEqual(restoredComplex.pages.length, 2, 'Should have 2 pages');
assertEqual(restoredComplex.pages[1].size, 'Letter', 'Second page should be Letter');
assertEqual(restoredComplex.elements.length, 3, 'Should have 3 elements');
assertEqual(restoredComplex.metadata.keywords?.length, 3, 'Should have 3 keywords');

console.log('✓ Round-trip with complex structure works correctly');

console.log('\n' + '='.repeat(60));
console.log('✓ All serialization tests passed!');
console.log('='.repeat(60));
