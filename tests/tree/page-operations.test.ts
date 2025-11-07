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

const letterPage = (): PageConfig => ({ width: 612, height: 792, unit: 'pt' });
const legalPage = (): PageConfig => ({ width: 612, height: 1008, unit: 'pt' });
const customPage = (width: number, height: number): PageConfig => ({ width, height, unit: 'pt' });

// Test 1: addPage
console.log('\n[Test 1] addPage');
let tree = Tree.createPDFTree();

const page1: PageConfig = letterPage();
tree = Tree.addPage(tree, page1);
assertEqual(tree.pages.length, 2, 'Should have 2 pages after addPage');
assertEqual(tree.pages[1].width, 612, 'Second page should have Letter width');
assertEqual(tree.pages[1].height, 792, 'Second page should have Letter height');

console.log('✓ addPage works correctly');

// Test 2: addPageAt
console.log('\n[Test 2] addPageAt');
const page0: PageConfig = legalPage();
tree = Tree.addPageAt(tree, page0, 0);
assertEqual(tree.pages.length, 3, 'Should have 3 pages after addPageAt');
assertEqual(tree.pages[0].height, 1008, 'First page should have Legal height');

console.log('✓ addPageAt works correctly');

// Test 3: removePageAt
console.log('\n[Test 3] removePageAt');
tree = Tree.removePageAt(tree, 0);
assertEqual(tree.pages.length, 2, 'Should have 2 pages after removePageAt');
assertEqual(tree.pages[0].width, 595.28, 'First page should be back to default width');

console.log('✓ removePageAt works correctly');

// Test 4: updatePageAt
console.log('\n[Test 4] updatePageAt');
const updatedPage: PageConfig = customPage(600, 800);
tree = Tree.updatePageAt(tree, 0, updatedPage);
assertEqual(tree.pages[0].width, 600, 'Page width should be 600');
assertEqual(tree.pages[0].height, 800, 'Page height should be 800');

console.log('✓ updatePageAt works correctly');

// Test 5: updatePageAtWith
console.log('\n[Test 5] updatePageAtWith');
tree = Tree.updatePageAtWith(tree, 0, (page) => ({
  ...page,
  width: page.width + 10,
}));
assertEqual(tree.pages[0].width, 610, 'Page width should be updated by function');

console.log('✓ updatePageAtWith works correctly');

// Test 6: setPages
console.log('\n[Test 6] setPages');
const newPages: PageConfig[] = [
  { width: 595.28, height: 841.89, unit: 'pt' },
  letterPage(),
  legalPage(),
];
tree = Tree.setPages(tree, newPages);
assertEqual(tree.pages.length, 3, 'Should have 3 pages after setPages');
assertEqual(tree.pages[2].height, 1008, 'Third page should have Legal height');

console.log('✓ setPages works correctly');

// Test 7: Query operations
console.log('\n[Test 7] getPageCount and getPageAt');
assertEqual(Tree.getPageCount(tree), 3, 'getPageCount should return 3');

const firstPage = Tree.getPageAt(tree, 0);
assertEqual(firstPage?.width, 595.28, 'First page should use default width');

const secondPage = Tree.getPageAt(tree, 1);
assertEqual(secondPage?.width, 612, 'Second page should match Letter width');

console.log('✓ getPageCount and getPageAt work correctly');

console.log('\n' + '='.repeat(60));
console.log('✓ All page operation tests passed!');
console.log('='.repeat(60));
