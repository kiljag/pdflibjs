/**
 * Page Operations Tests
 * Tests all page manipulation functions on PDFTree
 */

import * as Tree from '../../src/tree';
import { PageConfig } from '../../src/tree/models/PDFTree';

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
console.log('TEST: Page Operations');
console.log('='.repeat(60));

// Test 1: addPage
console.log('\n[Test 1] addPage');
let tree = Tree.createPDFTree();

const page1: PageConfig = { size: 'Letter', margins: '24pt' };
tree = Tree.addPage(tree, page1);
assertEqual(tree.pages.length, 2, 'Should have 2 pages after addPage');
assertEqual(tree.pages[1].size, 'Letter', 'Second page should have Letter size');

console.log('✓ addPage works correctly');

// Test 2: addPageAt
console.log('\n[Test 2] addPageAt');
const page0: PageConfig = { size: 'Legal', margins: '36pt' };
tree = Tree.addPageAt(tree, page0, 0);
assertEqual(tree.pages.length, 3, 'Should have 3 pages after addPageAt');
assertEqual(tree.pages[0].size, 'Legal', 'First page should have Legal size');

console.log('✓ addPageAt works correctly');

// Test 3: removePageAt
console.log('\n[Test 3] removePageAt');
tree = Tree.removePageAt(tree, 0);
assertEqual(tree.pages.length, 2, 'Should have 2 pages after removePageAt');
assertEqual(tree.pages[0].size, 'A4', 'First page should be back to A4');

console.log('✓ removePageAt works correctly');

// Test 4: updatePageAt
console.log('\n[Test 4] updatePageAt');
const updatedPage: PageConfig = { size: [600, 800], margins: '50pt' };
tree = Tree.updatePageAt(tree, 0, updatedPage);
assert(Array.isArray(tree.pages[0].size), 'Page size should be custom array');
assertEqual((tree.pages[0].size as [number, number])[0], 600, 'Page width should be 600');

console.log('✓ updatePageAt works correctly');

// Test 5: updatePageAtWith
console.log('\n[Test 5] updatePageAtWith');
tree = Tree.updatePageAtWith(tree, 0, (page) => ({
  ...page,
  margins: '72pt'
}));
assertEqual(tree.pages[0].margins, '72pt', 'Page margins should be updated');

console.log('✓ updatePageAtWith works correctly');

// Test 6: setPages
console.log('\n[Test 6] setPages');
const newPages: PageConfig[] = [
  { size: 'A4', margins: '36pt' },
  { size: 'Letter', margins: '24pt' },
  { size: 'Legal', margins: '48pt' },
];
tree = Tree.setPages(tree, newPages);
assertEqual(tree.pages.length, 3, 'Should have 3 pages after setPages');
assertEqual(tree.pages[2].size, 'Legal', 'Third page should have Legal size');

console.log('✓ setPages works correctly');

// Test 7: Query operations
console.log('\n[Test 7] getPageCount and getPageAt');
assertEqual(Tree.getPageCount(tree), 3, 'getPageCount should return 3');

const firstPage = Tree.getPageAt(tree, 0);
assertEqual(firstPage?.size, 'A4', 'First page should be A4');

const secondPage = Tree.getPageAt(tree, 1);
assertEqual(secondPage?.size, 'Letter', 'Second page should be Letter');

console.log('✓ getPageCount and getPageAt work correctly');

console.log('\n' + '='.repeat(60));
console.log('✓ All page operation tests passed!');
console.log('='.repeat(60));
