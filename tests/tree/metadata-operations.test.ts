/**
 * Metadata Operations Tests
 * Tests all metadata manipulation functions on PDFTree
 */

import * as Tree from '../../src/tree';

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
console.log('TEST: Metadata Operations');
console.log('='.repeat(60));

// Test 1: setMetadata (merge)
console.log('\n[Test 1] setMetadata (merge)');
let tree = Tree.createPDFTree();

tree = Tree.setMetadata(tree, { title: 'Test Document' });
assertEqual(tree.metadata.title, 'Test Document', 'Title should be set');

tree = Tree.setMetadata(tree, { author: 'Test Author' });
assertEqual(tree.metadata.title, 'Test Document', 'Title should still be present');
assertEqual(tree.metadata.author, 'Test Author', 'Author should be set');

console.log('✓ setMetadata (merge) works correctly');

// Test 2: replaceMetadata
console.log('\n[Test 2] replaceMetadata');
tree = Tree.replaceMetadata(tree, { subject: 'Test Subject' });
assertEqual(tree.metadata.subject, 'Test Subject', 'Subject should be set');
assertEqual(tree.metadata.title, undefined, 'Title should be cleared');
assertEqual(tree.metadata.author, undefined, 'Author should be cleared');

console.log('✓ replaceMetadata works correctly');

// Test 3: setTitle
console.log('\n[Test 3] setTitle');
tree = Tree.setTitle(tree, 'My PDF Document');
assertEqual(tree.metadata.title, 'My PDF Document', 'Title should be set');

console.log('✓ setTitle works correctly');

// Test 4: setAuthor
console.log('\n[Test 4] setAuthor');
tree = Tree.setAuthor(tree, 'John Doe');
assertEqual(tree.metadata.author, 'John Doe', 'Author should be set');

console.log('✓ setAuthor works correctly');

// Test 5: setSubject
console.log('\n[Test 5] setSubject');
tree = Tree.setSubject(tree, 'Invoice Document');
assertEqual(tree.metadata.subject, 'Invoice Document', 'Subject should be set');

console.log('✓ setSubject works correctly');

// Test 6: setCreator
console.log('\n[Test 6] setCreator');
tree = Tree.setCreator(tree, 'PDFLibJS v1.0');
assertEqual(tree.metadata.creator, 'PDFLibJS v1.0', 'Creator should be set');

console.log('✓ setCreator works correctly');

// Test 7: setKeywords
console.log('\n[Test 7] setKeywords');
tree = Tree.setKeywords(tree, ['pdf', 'invoice', 'document']);
assertArrayEqual(tree.metadata.keywords || [], ['pdf', 'invoice', 'document'], 'Keywords should be set');

console.log('✓ setKeywords works correctly');

// Test 8: addKeyword
console.log('\n[Test 8] addKeyword');
tree = Tree.addKeyword(tree, 'report');
assertArrayEqual(tree.metadata.keywords || [], ['pdf', 'invoice', 'document', 'report'], 'Keyword should be added');

console.log('✓ addKeyword works correctly');

// Test 9: removeKeyword
console.log('\n[Test 9] removeKeyword');
tree = Tree.removeKeyword(tree, 'invoice');
assertArrayEqual(tree.metadata.keywords || [], ['pdf', 'document', 'report'], 'Keyword should be removed');

console.log('✓ removeKeyword works correctly');

// Test 10: clearMetadata
console.log('\n[Test 10] clearMetadata');
tree = Tree.clearMetadata(tree);
assertEqual(Object.keys(tree.metadata).length, 0, 'Metadata should be empty');

console.log('✓ clearMetadata works correctly');

// Test 11: Full metadata workflow
console.log('\n[Test 11] Full metadata workflow');
tree = Tree.createPDFTree();
tree = Tree.setTitle(tree, 'Sales Report 2024');
tree = Tree.setAuthor(tree, 'Jane Smith');
tree = Tree.setSubject(tree, 'Q4 Sales Analysis');
tree = Tree.setCreator(tree, 'PDFLibJS');
tree = Tree.setKeywords(tree, ['sales', 'report', '2024', 'Q4']);

assertEqual(tree.metadata.title, 'Sales Report 2024', 'Title should be set');
assertEqual(tree.metadata.author, 'Jane Smith', 'Author should be set');
assertEqual(tree.metadata.subject, 'Q4 Sales Analysis', 'Subject should be set');
assertEqual(tree.metadata.creator, 'PDFLibJS', 'Creator should be set');
assertArrayEqual(tree.metadata.keywords || [], ['sales', 'report', '2024', 'Q4'], 'Keywords should be set');

console.log('✓ Full metadata workflow works correctly');

console.log('\n' + '='.repeat(60));
console.log('✓ All metadata operation tests passed!');
console.log('='.repeat(60));
