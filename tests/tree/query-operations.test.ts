/**
 * Query Operations Tests
 * Tests all query functions on PDFTree
 */

import * as Tree from '../../src/tree';
import { createTextBlock } from '../../src/blocks/ops/textBlockOps';
import { TextBlock } from '../../src/blocks/models/TextBlock';

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
console.log('TEST: Query Operations');
console.log('='.repeat(60));

// Setup test tree
let tree = Tree.createPDFTree();

const elem1 = createTextBlock({ id: 'text-1', text: 'First text' });
const elem2 = createTextBlock({ id: 'text-alt', text: 'Alternative text' });
const elem3 = createTextBlock({ id: 'text-2', text: 'Second text' });
const elem4 = createTextBlock({ text: 'No ID text' });

tree = Tree.addElements(tree, [elem1, elem2, elem3, elem4]);

// Test 1: findElementById
console.log('\n[Test 1] findElementById');
const found = Tree.findElementById(tree, 'text-2');
assert(found !== undefined, 'Should find element with id text-2');
assertEqual((found as TextBlock).text, 'Second text', 'Should find correct element');

const notFound = Tree.findElementById(tree, 'non-existent');
assertEqual(notFound, undefined, 'Should return undefined for non-existent ID');

console.log('✓ findElementById works correctly');

// Test 2: findElementIndexById
console.log('\n[Test 2] findElementIndexById');
const index = Tree.findElementIndexById(tree, 'text-alt');
assertEqual(index, 1, 'Text element should be at index 1');

const notFoundIndex = Tree.findElementIndexById(tree, 'non-existent');
assertEqual(notFoundIndex, -1, 'Should return -1 for non-existent ID');

console.log('✓ findElementIndexById works correctly');

// Test 3: findElementIndex
console.log('\n[Test 3] findElementIndex');
const elementIndex = Tree.findElementIndex(tree, elem3);
assertEqual(elementIndex, 2, 'elem3 should be at index 2');

console.log('✓ findElementIndex works correctly');

// Test 4: findElementsByType
console.log('\n[Test 4] findElementsByType');
const textBlocks = Tree.findElementsByType(tree, 'text');
assertEqual(textBlocks.length, 4, 'Should find 4 text blocks');

console.log('✓ findElementsByType works correctly');

// Test 5: findElements with predicate
console.log('\n[Test 5] findElements with predicate');
const elementsWithId = Tree.findElements(tree, (el) => el.id !== undefined);
assertEqual(elementsWithId.length, 3, 'Should find 3 elements with ID');

const longTexts = Tree.findElements(tree, (el) => {
  return el.type === 'text' && (el as TextBlock).text.length > 10;
});
assertEqual(longTexts.length, 2, 'Should find 2 text elements with length > 10');

console.log('✓ findElements works correctly');

// Test 6: getElementAt
console.log('\n[Test 6] getElementAt');
const element = Tree.getElementAt(tree, 0);
assertEqual((element as TextBlock).text, 'First text', 'Should get element at index 0');

const outOfBounds = Tree.getElementAt(tree, 999);
assertEqual(outOfBounds, undefined, 'Should return undefined for out of bounds index');

console.log('✓ getElementAt works correctly');

// Test 7: getElementCount
console.log('\n[Test 7] getElementCount');
assertEqual(Tree.getElementCount(tree), 4, 'Should have 4 elements');

console.log('✓ getElementCount works correctly');

// Test 8: hasElements
console.log('\n[Test 8] hasElements');
assert(Tree.hasElements(tree), 'Tree should have elements');

const emptyTree = Tree.createPDFTree();
assert(!Tree.hasElements(emptyTree), 'Empty tree should not have elements');

console.log('✓ hasElements works correctly');

// Test 9: hasElementById
console.log('\n[Test 9] hasElementById');
assert(Tree.hasElementById(tree, 'text-1'), 'Should have element with id text-1');
assert(!Tree.hasElementById(tree, 'non-existent'), 'Should not have element with non-existent id');

console.log('✓ hasElementById works correctly');

console.log('\n' + '='.repeat(60));
console.log('✓ All query operation tests passed!');
console.log('='.repeat(60));
